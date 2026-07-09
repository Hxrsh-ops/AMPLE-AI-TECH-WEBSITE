const crypto = require('crypto');

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
      'website', 'company', 'message_honeypot', 'subject_honeypot', 
      'title', 'description', 'feedback', 'notes', 'details', 'remarks', 'comments'
    ];
    for (const hp of honeypots) {
      if (data[hp] && data[hp].trim() !== '') {
        console.warn(`[Anti-Spam] Honeypot field "${hp}" triggered. Dropping submission.`);
        return {
          statusCode: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ success: true, message: 'Submission received successfully' })
        };
      }
    }

    const name = (data.name || '').trim();
    const email = (data.email || '').trim();
    const message = (data.message || '').trim();
    const location = (data.location || '').trim();
    const subject = (data.subject || '').trim();
    const serviceType = (data.serviceType || '').trim();
    const plan = (data.plan || '').trim();

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Name, Email, and Message are required fields.' })
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
      console.error('[Error] Supabase credentials are not configured in environment.');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Internal Database Configuration Error.' })
      };
    }

    const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
      method: 'POST',
      headers: {
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        name,
        email,
        location,
        subject,
        service_type: serviceType,
        message,
        plan,
        status: 'unread'
      })
    });

    if (!supabaseResponse.ok) {
      const errorText = await supabaseResponse.text();
      console.error('[Supabase Error]', errorText);
      throw new Error('Failed to record submission in Supabase.');
    }

    if (resendApiKey && notificationEmail) {
      const emailHtml = `
        <div style="font-family: 'Geist', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; color: #1a1a1a;">
          <h2 style="color: #0D0D0D; border-bottom: 2px solid #0D0D0D; padding-bottom: 10px; margin-top: 0;">New Lead Received!</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td><td style="padding: 8px 0;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0066cc;">${escapeHtml(email)}</a></td></tr>
            ${location ? `<tr><td style="padding: 8px 0; font-weight: bold;">Location:</td><td style="padding: 8px 0;">${escapeHtml(location)}</td></tr>` : ''}
            ${subject ? `<tr><td style="padding: 8px 0; font-weight: bold;">Subject:</td><td style="padding: 8px 0;">${escapeHtml(subject)}</td></tr>` : ''}
            ${serviceType ? `<tr><td style="padding: 8px 0; font-weight: bold;">Interest:</td><td style="padding: 8px 0;">${escapeHtml(serviceType)}</td></tr>` : ''}
            ${plan ? `<tr><td style="padding: 8px 0; font-weight: bold;">Plan Target:</td><td style="padding: 8px 0;"><span style="background: #f0f0f0; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; font-weight: 600;">${escapeHtml(plan)}</span></td></tr>` : ''}
          </table>
          <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
          <h3 style="color: #0D0D0D; margin-bottom: 10px;">Message Detail:</h3>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; white-space: pre-wrap; line-height: 1.5; color: #444;">${escapeHtml(message)}</div>
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
          subject: `[New Lead] ${name} - ${serviceType || 'General Inquiry'}`,
          html: emailHtml
        })
      });
    }

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Inquiry submitted successfully!' })
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
