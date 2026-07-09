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
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, PATCH, OPTIONS',
    'Access-Control-Allow-Credentials': 'true'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  // 1. Verify Authentication Token
  const authHeader = event.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Unauthorized: Missing token.' })
    };
  }

  const token = authHeader.substring(7);
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error('[Admin Data Error] Missing required JWT_SECRET server environment variable.');
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Server authentication configuration missing.' })
    };
  }

  try {
    const parts = token.split('.');
    if (parts.length !== 2) {
      throw new Error('Invalid token structure.');
    }

    const [serializedPayload, signature] = parts;
    
    // Verify HMAC-SHA256 signature
    const expectedSignature = crypto
      .createHmac('sha256', jwtSecret)
      .update(serializedPayload)
      .digest('base64url');

    if (signature !== expectedSignature) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Unauthorized: Invalid token signature.' })
      };
    }

    // Parse and check expiration
    const payload = JSON.parse(Buffer.from(serializedPayload, 'base64').toString('utf8'));
    if (payload.exp < Date.now()) {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Unauthorized: Token expired.' })
      };
    }

    // 2. Verified Admin Operations
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Server database configuration missing.' })
      };
    }

    // A. PATCH Request: Update lead status
    if (event.httpMethod === 'PATCH') {
      const { id, status } = JSON.parse(event.body || '{}');
      if (!id || !status) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'ID and Status are required.' })
        };
      }

      const patchResponse = await fetch(`${supabaseUrl}/rest/v1/contact_submissions?id=eq.${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      if (!patchResponse.ok) {
        const errorText = await patchResponse.text();
        console.error('[Supabase Status Update Error]', errorText);
        throw new Error('Failed to update submission status.');
      }

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ success: true, message: 'Status updated successfully' })
      };
    }

    // B. GET Request: Fetch all data
    if (event.httpMethod === 'GET') {
      // Fetch submissions
      const submissionsResponse = await fetch(`${supabaseUrl}/rest/v1/contact_submissions?select=*&order=created_at.desc`, {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`
        }
      });

      if (!submissionsResponse.ok) {
        const errorText = await submissionsResponse.text();
        console.error('[Supabase Submissions Fetch Error]', errorText);
        throw new Error('Failed to fetch contact submissions.');
      }
      const submissions = await submissionsResponse.json();

      // Fetch newsletter subscribers
      const subscribersResponse = await fetch(`${supabaseUrl}/rest/v1/newsletter_subscribers?select=*&order=created_at.desc`, {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`
        }
      });

      if (!subscribersResponse.ok) {
        const errorText = await subscribersResponse.text();
        console.error('[Supabase Subscribers Fetch Error]', errorText);
        throw new Error('Failed to fetch newsletter subscribers.');
      }
      const subscribers = await subscribersResponse.json();

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          submissions,
          subscribers
        })
      };
    }

    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };

  } catch (error) {
    console.error('[Admin Data API Error]', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};
