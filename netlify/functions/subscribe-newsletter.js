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
      if (data[hp] && data[hp].trim() !== '') {
        console.warn(`[Anti-Spam] Honeypot field "${hp}" triggered in newsletter. Dropping.`);
        return {
          statusCode: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ success: true, message: 'Subscribed successfully' })
        };
      }
    }

    const email = (data.email || '').trim();
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
    const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[Error] Supabase credentials not set.');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Database configuration missing.' })
      };
    }

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

    if (!supabaseResponse.ok) {
      const errorText = await supabaseResponse.text();
      // Handle unique constraint violation (duplicate email) gracefully
      if (supabaseResponse.status === 409 || errorText.includes('23505') || errorText.includes('already exists')) {
        return {
          statusCode: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ success: true, message: 'You are already subscribed to our newsletter!' })
        };
      }
      console.error('[Supabase Error]', errorText);
      throw new Error('Failed to save email to newsletter_subscribers.');
    }

    // A. Send Welcome Email to Subscriber
    if (resendApiKey) {
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

      await fetch('https://api.resend.com/emails', {
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
    }

    // B. Send Signup Notification to Owner
    if (resendApiKey && notificationEmail) {
      const notificationHtml = `
        <div style="font-family: 'Geist', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; color: #1a1a1a;">
          <h2 style="color: #0D0D0D; border-bottom: 2px solid #0D0D0D; padding-bottom: 10px; margin-top: 0;">New Newsletter Subscriber!</h2>
          <p style="font-size: 16px;">The following email address has subscribed to the newsletter:</p>
          <p style="font-size: 18px; font-weight: bold; color: #0D0D0D;">
            <a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${escapeHtml(email)}</a>
          </p>
          <div style="font-size: 0.8em; color: #777; margin-top: 25px; text-align: center;">
            Sent from AmpletechAI Website Integration.
          </div>
        </div>
      `;

      await fetch('https://api.resend.com/emails', {
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
    }

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Thank you for subscribing!' })
    };

  } catch (error) {
    console.error('[API Error]', error);
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
