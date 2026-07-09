const crypto = require('crypto');

exports.handler = async (event, context) => {
  // CORS Preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { username, password } = JSON.parse(event.body || '{}');

    const adminUser = process.env.ADMIN_USERNAME;
    const adminPass = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET || 'am-secret-key-2026-ampleai';

    if (!adminUser || !adminPass) {
      console.error('[Admin Auth Error] ADMIN_USERNAME or ADMIN_PASSWORD environment variable is not configured.');
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Admin credentials not configured on the server.' })
      };
    }

    // Check credentials (plain text environment variables comparison)
    if (username !== adminUser || password !== adminPass) {
      return {
        statusCode: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid username or password.' })
      };
    }

    // Generate lightweight signed token (HMAC-SHA256 signature)
    const exp = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    const payload = { username, exp };
    const serializedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
    
    const signature = crypto
      .createHmac('sha256', jwtSecret)
      .update(serializedPayload)
      .digest('base64url'); // base64url is URL-safe

    const token = `${serializedPayload}.${signature}`;

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Server authentication failure.' })
    };
  }
};
