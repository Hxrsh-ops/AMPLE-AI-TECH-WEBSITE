const crypto = require('crypto');

exports.handler = async (event, context) => {
  console.log('[Debug] submit-contact function entered.');
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
    console.log('[Debug] Anti-spam checks passed.');

    const name = (data.name || '').trim();
    const email = (data.email || '').trim();
    const message = (data.message || '').trim();
    const location = (data.location || '').trim();
    const subject = (data.subject || '').trim();
    const serviceType = (data.serviceType || '').trim();
    const plan = (data.plan || '').trim();

    console.log('[Debug] Fields extracted:', { name: !!name, email: !!email, message: !!message, location, subject, serviceType, plan });

    if (!name || !email || !message) {
      console.log('[Debug] Validation failed: missing Name, Email, or Message.');
      return {
        statusCode: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Name, Email, and Message are required fields.' })
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

    // Enforce environment secrets checking
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
      console.error('[Error] Supabase credentials are not configured in environment.');
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Internal Database Configuration Error.' })
      };
    }

    // 5. Store Submission in Supabase
    console.log('[Debug] Sending POST request to Supabase rest api...');
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

    console.log('[Debug] Supabase response HTTP Status:', supabaseResponse.status);

    if (!supabaseResponse.ok) {
      const errorText = await supabaseResponse.text();
      console.error('[Error] Supabase returned non-OK status:', supabaseResponse.status, errorText);
      throw new Error(`Supabase error: ${supabaseResponse.status} - ${errorText}`);
    }
    console.log('[Debug] Supabase record inserted successfully.');

    // 6. Send Email Notification via Resend
    if (resendApiKey && notificationEmail) {
      console.log('[Debug] Preparing email notification via Resend...');
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

      console.log('[Debug] Sending POST request to Resend api...');
      const emailResponse = await fetch('https://api.resend.com/emails', {
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

      console.log('[Debug] Resend response HTTP Status:', emailResponse.status);
      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error('[Error] Resend returned non-OK status:', emailResponse.status, errorText);
      } else {
        console.log('[Debug] Email sent successfully.');
      }
    } else {
      console.log('[Debug] Skipping Resend notification: API key or target email not configured.');
    }

    console.log('[Debug] Function execution completed successfully.');
    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Inquiry submitted successfully!' })
    };

  } catch (error) {
    console.error('[Error] submit-contact catch block triggered. Details:');
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
