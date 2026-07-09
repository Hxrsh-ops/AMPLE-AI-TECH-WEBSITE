const crypto = require('crypto');

exports.handler = async (event, context) => {
  // CORS Origin check
  const origin = event.headers.origin || event.headers.Origin || '';
  const allowedOrigins = [
    /^http:\/\/localhost(:\d+)?$/,
    /^https:\/\/([a-zA-Z0-9-]+\.)?netlify\.app$/
  ];
  let corsOrigin = '';
  if (allowedOrigins.some(regex => regex.test(origin))) {
    corsOrigin = origin;
  }

  const corsHeaders = {
    'Access-Control-Allow-Origin': corsOrigin || 'null',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Credentials': 'true'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { username, password } = JSON.parse(event.body || '{}');

    // 1. Enforce strict configuration - fail closed on missing env vars
    const adminUser = process.env.ADMIN_USERNAME;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    const jwtSecret = process.env.JWT_SECRET;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!adminUser || !adminPasswordHash || !jwtSecret || !supabaseUrl || !supabaseServiceKey) {
      console.error('[Admin Auth Error] Missing required server environment configurations.');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Server authentication configuration error.' })
      };
    }

    // 2. Fetch Client IP for lockout throttling
    const ip = event.headers['x-nf-client-connection-ip'] || 
               event.headers['client-ip'] || 
               event.headers['x-forwarded-for'] || 
               'unknown-ip';

    // 3. Lockout check from Supabase table
    const ipQueryRes = await fetch(`${supabaseUrl}/rest/v1/admin_login_attempts?ip=eq.${encodeURIComponent(ip)}`, {
      headers: {
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`
      }
    });

    let attemptRecord = null;
    if (ipQueryRes.ok) {
      const records = await ipQueryRes.json();
      if (records && records.length > 0) {
        attemptRecord = records[0];
      }
    }

    const now = new Date();
    if (attemptRecord && attemptRecord.locked_until) {
      const lockTime = new Date(attemptRecord.locked_until);
      if (lockTime > now) {
        const waitMinutes = Math.ceil((lockTime - now) / 60000);
        return {
          statusCode: 429,
          headers: corsHeaders,
          body: JSON.stringify({ error: `Too many login attempts. Locked out. Try again in ${waitMinutes} minutes.` })
        };
      }
    }

    // 4. Verify Credentials
    const hashedPassword = crypto.createHash('sha256').update(password || '').digest('hex');
    const isMatched = (username === adminUser) && (hashedPassword === adminPasswordHash);

    if (!isMatched) {
      // Record failed attempt
      let attempts = 1;
      let lockedUntil = null;

      if (attemptRecord) {
        attempts = attemptRecord.attempts + 1;
        if (attempts >= 5) {
          // Lock out for 15 minutes
          lockedUntil = new Date(now.getTime() + 15 * 60 * 1000).toISOString();
        }
      }

      await fetch(`${supabaseUrl}/rest/v1/admin_login_attempts`, {
        method: 'POST',
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify({
          ip,
          attempts,
          locked_until: lockedUntil
        })
      });

      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid username or password.' })
      };
    }

    // 5. Successful login: Clear attempts
    if (attemptRecord) {
      await fetch(`${supabaseUrl}/rest/v1/admin_login_attempts?ip=eq.${encodeURIComponent(ip)}`, {
        method: 'DELETE',
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`
        }
      });
    }

    // 6. Generate lightweight JWT-like token (HMAC-SHA256 signed)
    const exp = Date.now() + 2 * 60 * 60 * 1000; // 2 hours expiry
    const payload = { username, exp };
    const serializedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signature = crypto
      .createHmac('sha256', jwtSecret)
      .update(serializedPayload)
      .digest('base64url');

    const token = `${serializedPayload}.${signature}`;

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        token,
        expiresAt: exp
      })
    };

  } catch (error) {
    console.error('[Admin Auth Error]', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Server authentication failure.' })
    };
  }
};
