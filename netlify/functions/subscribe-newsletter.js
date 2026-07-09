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

  // 1. Handle preflight CORS request
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

    // 2. Anti-spam Honeypot Check
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

    // 3. Validation
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

    // 4. Strict environment check
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;
    const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[Error] Supabase credentials not set.');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Database configuration missing.' })
      };
    }

    // 5. Record subscription in Supabase
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

    // 6. Send Welcome Email via Resend
    if (resendApiKey) {
      const welcomeHtml = `
        <div style="font-family: 'Geist', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e8e8e8; border-radius: 12px; color: #1a1a1a; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #0D0D0D; font-size: 24px; font-weight: 700; margin: 0;">AmpletechAI</h1>
            <p style="color: #777; font-size: 14px; margin-top: 5px;">Process Automation & AI Solutions</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
          <p style="font-size: 16px; line-height: 1.6; color: #333333;">Hello,</p>
          <p style="font-size: 16px; line-height: 1.6; color: #333333;">
            Thank you for subscribing to the <strong>AmpletechAI Newsletter</strong>!
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #333333;">
            You will now be the first to receive updates on high-impact AI implementations, productivity tips, workflow automation strategies, and case highlights.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #333333;">
            No fluff. Just practical engineering and business automation guides delivered straight to your inbox.
          </p>
          <div style="margin-top: 30px; padding: 15px; background-color: #f9f9f9; border-radius: 8px; border-left: 4px solid #0D0D0D; font-size: 14px; color: #555;">
            <strong>Need immediate help?</strong> You can also book a call directly with our engineering team at <a href="https://cal.com/ampletech" style="color: #0066cc; text-decoration: underline;">cal.com/ampletech</a> to discuss your custom automation needs.
          </div>
          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 30px 0;" />
          <div style="text-align: center; font-size: 12px; color: #999999;">
            You are receiving this because you signed up on our website.<br />
            AmpletechAI Agency © 2026. All rights reserved.
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
          from: `AmpletechAI <${senderEmail}>`,
          to: email,
          subject: 'Welcome to the AmpletechAI Newsletter!',
          html: welcomeHtml
        })
      });
    }

    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
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
