exports.handler = async (event, context) => {
  console.log('[Debug] subscribe-newsletter function entered.');
  console.log('[Debug] HTTP Method:', event.httpMethod);
  console.log('[Debug] Native fetch availability:', typeof fetch);

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
  console.log('[Debug] Request Origin:', origin, '-> CORS allowed origin set to:', corsOrigin || 'null');

  const corsHeaders = {
    'Access-Control-Allow-Origin': corsOrigin || 'null',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Credentials': 'true'
  };

  // Handle preflight CORS request
  if (event.httpMethod === 'OPTIONS') {
    console.log('[Debug] OPTIONS preflight request completed.');
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    console.log('[Debug] Rejecting method:', event.httpMethod);
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    console.log('[Debug] Parsing request body...');
    const data = JSON.parse(event.body || '{}');
    console.log('[Debug] Parsed body keys:', Object.keys(data));

    // Anti-spam Honeypot Check
    const honeypots = [
      'website', 'company', 'message', 'subject', 'title', 
      'description', 'feedback', 'notes', 'details', 'remarks', 'comments'
    ];
    for (const hp of honeypots) {
      if (data[hp] && data[hp].trim() !== '') {
        console.warn(`[Anti-Spam] Honeypot field "${hp}" triggered in newsletter. Dropping.`);
        return {
          statusCode: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ success: true, message: 'Subscribed successfully' })
        };
      }
    }
    console.log('[Debug] Anti-spam checks passed.');

    const email = (data.email || '').trim();
    console.log('[Debug] Fields extracted:', { email: !!email });

    if (!email) {
      console.log('[Debug] Validation failed: missing Email.');
      return {
        statusCode: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Email address is required.' })
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('[Debug] Validation failed: invalid email format.');
      return {
        statusCode: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Please provide a valid email address.' })
      };
    }
    console.log('[Debug] Validation passed.');

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;
    const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    console.log('[Debug] Environment variables presence check:', {
      SUPABASE_URL: !!supabaseUrl,
      SUPABASE_SERVICE_ROLE_KEY: !!supabaseServiceKey,
      RESEND_API_KEY: !!resendApiKey,
      SENDER_EMAIL: !!process.env.SENDER_EMAIL,
      NOTIFICATION_EMAIL: !!notificationEmail
    });

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[Error] Supabase credentials not set.');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Database configuration missing.' })
      };
    }

    // 5. Record subscription in Supabase
    console.log('[Debug] Sending POST request to Supabase rest api...');
    const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/newsletter_subscribers`, {
      method: 'POST',
      headers: {
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=ignore-duplicates'
      },
      body: JSON.stringify({ email })
    });

    console.log('[Debug] Supabase response HTTP Status:', supabaseResponse.status);

    if (!supabaseResponse.ok) {
      const errorText = await supabaseResponse.text();
      // Handle unique constraint violation (duplicate email) gracefully
      if (supabaseResponse.status === 409 || errorText.includes('23505') || errorText.includes('already exists')) {
        console.log('[Debug] Duplicate subscription detected. Handling gracefully.');
        return {
          statusCode: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ success: true, message: 'You are already subscribed to our newsletter!' })
        };
      }
      console.error('[Error] Supabase returned non-OK status:', supabaseResponse.status, errorText);
      throw new Error(`Supabase error: ${supabaseResponse.status} - ${errorText}`);
    }
    console.log('[Debug] Supabase subscriber record inserted successfully.');

    // 6. Send Welcome Email via Resend
    if (resendApiKey) {
      console.log('[Debug] Preparing welcome email via Resend...');
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

      console.log('[Debug] Sending POST request to Resend api (welcome email)...');
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

      console.log('[Debug] Resend response HTTP Status (welcome email):', welcomeResponse.status);
      if (!welcomeResponse.ok) {
        const errorText = await welcomeResponse.text();
        console.error('[Error] Resend returned non-OK status (welcome email):', welcomeResponse.status, errorText);
      } else {
        console.log('[Debug] Welcome email sent successfully.');
      }
    }

    // 7. Send Signup Notification to Owner
    if (resendApiKey && notificationEmail) {
      console.log('[Debug] Preparing owner signup notification via Resend...');
      const notificationHtml = `
        <div style="font-family: 'Geist', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; color: #1a1a1a;">
          <h2 style="color: #0D0D0D; border-bottom: 2px solid #0D0D0D; padding-bottom: 10px; margin-top: 0;">New Newsletter Subscriber!</h2>
          <p style="font-size: 16px;">The following email address has subscribed to the newsletter:</p>
          <p style="font-size: 18px; font-weight: bold; color: #0D0D0D;">
            <a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${escapeHtml(email)}</a>
          </p>
        </div>
      `;

      console.log('[Debug] Sending POST request to Resend api (owner notification)...');
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

      console.log('[Debug] Resend response HTTP Status (owner notification):', notificationResponse.status);
      if (!notificationResponse.ok) {
        const errorText = await notificationResponse.text();
        console.error('[Error] Resend returned non-OK status (owner notification):', notificationResponse.status, errorText);
      } else {
        console.log('[Debug] Owner notification email sent successfully.');
      }
    }

    console.log('[Debug] Function execution completed successfully.');
    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Thank you for subscribing!' })
    };

  } catch (error) {
    console.error('[Error] subscribe-newsletter catch block triggered. Details:');
    console.error('  Message:', error.message);
    console.error('  Stack:', error.stack || 'No stack trace available.');
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'A server error occurred. Please try again later.' })
    };
  }
};

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
