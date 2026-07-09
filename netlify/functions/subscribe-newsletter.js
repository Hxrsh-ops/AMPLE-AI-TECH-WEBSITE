exports.handler = async (event, context) => {
  // CORS Origin check
  const origin = event.headers.origin || event.headers.Origin || '';
  const allowedOrigins = [
    /^http:\/\/localhost(:\d+)?$/,
    /^https:\/\/([a-zA-Z0-9-]+\.)?netlify\.app$/,
    /^https:\/\/ampletechai\.com$/,
    /^https:\/\/www\.ampletechai\.com$/
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

  // Handle preflight CORS request
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
    const data = JSON.parse(event.body || '{}');

    // Anti-spam Honeypot Check
    const honeypots = [
      'website', 'company', 'message', 'subject', 'title', 
      'description', 'feedback', 'notes', 'details', 'remarks', 'comments'
    ];
    for (const hp of honeypots) {
      if (data[hp] && String(data[hp]).trim() !== '') {
        console.warn(`[Anti-Spam] Honeypot field "${hp}" triggered in newsletter. Dropping.`);
        return {
          statusCode: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ success: true, message: 'Subscribed successfully' })
        };
      }
    }

    const email = sanitizeInput(data.email);

    if (!email) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Email address is required.' })
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Please provide a valid email address.' })
      };
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;
    const senderEmail = process.env.SENDER_EMAIL;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    if (!supabaseUrl || !supabaseServiceKey || !resendApiKey || !senderEmail || !notificationEmail) {
      console.error('[Error] Serverless subscribe-newsletter endpoint missing database/email configurations.');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'A server error occurred. Please try again later.' })
      };
    }

    // Fetch Client IP for rate-limiting
    const ip = event.headers['x-nf-client-connection-ip'] || 
               event.headers['client-ip'] || 
               event.headers['x-forwarded-for'] || 
               'unknown-ip';

    // Enforce Rate Limiting (max 5 submissions per minute)
    const withinRateLimit = await checkRateLimit(supabaseUrl, supabaseServiceKey, ip, 'subscribe-newsletter');
    if (!withinRateLimit) {
      console.warn(`[Rate Limit Exceeded] IP ${ip} blocked on subscribe-newsletter.`);
      return {
        statusCode: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Too many submissions. Please wait a minute and try again.' })
      };
    }

    // Record subscription in Supabase
    const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/newsletter_subscribers`, {
      method: 'POST',
      headers: {
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    if (!supabaseResponse.ok) {
      const errorText = await supabaseResponse.text();
      if (supabaseResponse.status === 409 || errorText.includes('23505') || errorText.includes('already exists')) {
        return {
          statusCode: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ success: true, message: 'You are already subscribed to our newsletter!' })
        };
      }
      console.error('[Supabase Error]', errorText);
      throw new Error('Database insert failed.');
    }

    // Send Welcome Email via Resend
    const welcomeHtml = `
      <div style="font-family: 'Geist', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e8e8e8; border-radius: 12px; color: #1a1a1a; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #0D0D0D; font-size: 24px; font-weight: 700; margin: 0;">AmpletechAI</h1>
        </div>
        <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
        <p>Thank you for subscribing to the <strong>AmpletechAI Newsletter</strong>!</p>
        <p>You will now receive updates on AI workflow automation and productivity tips.</p>
      </div>
    `;

    const welcomeResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `AmpletechAI <${senderEmail}>`,
        to: email,
        subject: 'Welcome to the AmpletechAI Newsletter!',
        html: welcomeHtml
      })
    });

    if (!welcomeResponse.ok) {
      const errorText = await welcomeResponse.text();
      console.error('[Resend Welcome Error]', welcomeResponse.status, errorText);
    }

    // Send Signup Notification to Owner
    const notificationHtml = `
      <div style="font-family: 'Geist', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; color: #1a1a1a;">
        <h2 style="color: #0D0D0D; border-bottom: 2px solid #0D0D0D; padding-bottom: 10px; margin-top: 0;">New Newsletter Subscriber!</h2>
        <p style="font-size: 16px;">The following email address has subscribed to the newsletter:</p>
        <p style="font-size: 18px; font-weight: bold; color: #0D0D0D;">
          <a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${escapeHtml(email)}</a>
        </p>
      </div>
    `;

    const notificationResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `AmpletechAI Portal <${senderEmail}>`,
        to: notificationEmail,
        subject: `[Newsletter Signup] ${email}`,
        html: notificationHtml
      })
    });

    if (!notificationResponse.ok) {
      const errorText = await notificationResponse.text();
      console.error('[Resend Notification Error]', notificationResponse.status, errorText);
    }

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Thank you for subscribing!' })
    };

  } catch (error) {
    console.error('[API Error]', error.message);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'A server error occurred. Please try again later.' })
    };
  }
};

function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .trim();
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function checkRateLimit(supabaseUrl, supabaseServiceKey, ip, endpoint) {
  const key = `${ip}:${endpoint}`;
  const now = new Date();
  
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/rate_limits?key=eq.${encodeURIComponent(key)}`, {
      headers: {
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`
      }
    });
    
    if (!res.ok) return true; // Fail open
    
    const records = await res.json();
    if (records && records.length > 0) {
      const record = records[0];
      const lastRequest = new Date(record.last_request);
      
      if (now - lastRequest < 60 * 1000) {
        if (record.hits >= 5) {
          return false;
        }
        
        await fetch(`${supabaseUrl}/rest/v1/rate_limits?key=eq.${encodeURIComponent(key)}`, {
          method: 'PATCH',
          headers: {
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ hits: record.hits + 1 })
        });
      } else {
        await fetch(`${supabaseUrl}/rest/v1/rate_limits?key=eq.${encodeURIComponent(key)}`, {
          method: 'PATCH',
          headers: {
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ hits: 1, last_request: now.toISOString() })
        });
      }
    } else {
      await fetch(`${supabaseUrl}/rest/v1/rate_limits`, {
        method: 'POST',
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key, hits: 1, last_request: now.toISOString() })
      });
    }
  } catch (err) {
    console.error('[Rate Limit Exception]', err.message);
  }
  
  return true;
}
