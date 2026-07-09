# Deployment and Backend Integration Guide

This guide details how to configure, test, and deploy the **AmpletechAI** website to Netlify, configure the Supabase database, set up transactional emails via Resend, and use the built-in Admin Dashboard.

---

## Architecture Overview

- **Frontend**: Plain HTML/CSS/JS bundled by Vite (outputs static files to the `dist` directory).
- **Backend API**: Netlify Serverless Functions (`netlify/functions`) acting as server-side API routes.
- **Database**: Supabase PostgreSQL database storing contact submissions, newsletter subscribers, and tracking admin login attempts.
- **Email**: Resend REST API sending instant email notifications to the owner and welcome emails to subscribers.
- **Booking**: Cal.com integrated via `https://cal.com/ampletech`.

---

## Required Accounts

Ensure you have signed up for free accounts on the following platforms:
1. **GitHub**: Repository hosting.
2. **Netlify**: Deployment and hosting.
3. **Supabase**: Database.
4. **Resend**: Transactional emails.
5. **Cal.com**: Booking.

---

## Database Configuration (Supabase)

1. Log in to your **Supabase Dashboard** and create a **NEW** project named `AMPLE-AI-TECH-WEBSITE`.
2. Go to the **SQL Editor** in the left sidebar and click **New Query**.
3. Copy the contents of the `supabase-setup.sql` file from this repository and paste them into the editor.
4. Click **Run** to execute. This will create:
   - The `contact_submissions` table.
   - The `newsletter_subscribers` table.
   - The `admin_login_attempts` table (for IP lockout brute-force protection).
   - Custom Row Level Security (RLS) policies to prevent public access.
   - Performance indices for dashboard speed.

---

## Required Environment Variables

You must configure the following environment variables in your Netlify dashboard (or local `.env` file):

| Variable Name | Description | Where to Get It |
|---|---|---|
| `SUPABASE_URL` | The REST API URL of your Supabase project. | Supabase Project Settings -> API |
| `SUPABASE_SERVICE_ROLE_KEY` | The secret service role key (super admin) used to bypass RLS and write data. | Supabase Settings -> API (`service_role` key - DO NOT expose publicly!) |
| `RESEND_API_KEY` | Resend API Authorization token. | Resend Dashboard -> API Keys |
| `NOTIFICATION_EMAIL` | The recipient address to receive email notifications when a lead is captured. | Your own email (e.g. your personal Gmail). |
| `SENDER_EMAIL` | The verified email sender identity. | Resend -> Domains. If not configured, use `onboarding@resend.dev`. |
| `ADMIN_USERNAME` | The dashboard username used to log in to the admin panel. | Choose a custom value (e.g., `admin`). |
| `ADMIN_PASSWORD_HASH` | The SHA-256 hex hash of your admin password (do not store plaintext password in env!). | See instructions below to generate this hash. |
| `JWT_SECRET` | Secret key used to sign and verify HMAC login tokens. | Enter a long, random, secure string. |

---

## How to Generate the Password Hash

For security, your plain password is never stored or compared in plaintext. Generate a SHA-256 hash using one of these terminal commands:

### Using Node.js
```bash
node -e "console.log(require('crypto').createHash('sha256').update('your_password_here').digest('hex'))"
```

### Using PowerShell (Windows)
```powershell
[System.BitConverter]::ToString((New-Object System.Security.Cryptography.SHA256Managed).ComputeHash([System.Text.Encoding]::UTF8.GetBytes("your_password_here"))).Replace("-","").ToLower()
```

Set the generated 64-character hex string as the value for the `ADMIN_PASSWORD_HASH` environment variable.

---

## Local Development & Testing

1. Install the Netlify CLI globally if you haven't already:
   ```bash
   npm install -g netlify-cli
   ```
2. Create a `.env` file in the root of the project containing all variables above (matching the names in the table).
3. Run the development environment:
   ```bash
   npx netlify dev
   ```
   This will start a local server at `http://localhost:8888` that serves the static pages and proxies calls to your serverless functions under `http://localhost:8888/api/...`.
4. Submit the contact form or subscribe to the newsletter to verify that data is written to Supabase and emails are received.

---

## Deployment to Netlify

1. Link your Git repository on the **Netlify Dashboard**.
2. Set the following build configurations:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`
3. Go to **Site Configuration -> Environment Variables** and add all the environment variables from the table above.
4. Deploy the site. Netlify will build the Vite bundle, generate static pages, host the serverless functions, and secure the site with HTTPS automatically.

---

## Accessing the Admin Dashboard

- Once deployed, your dashboard is accessible at:
  `https://your-domain.netlify.app/admin/`
- Enter the `ADMIN_USERNAME` and the plaintext password (the one you hashed earlier) to sign in.
- The portal allows you to:
  - View all contact submissions ordered by date.
  - Review newsletter subscribers.
  - Update lead status (`unread`, `in_progress`, `resolved`).
- The dashboard features auto-logout after 15 minutes of inactivity, and the session is cleared automatically when the tab is closed.
- If a user enters an incorrect password 5 times in a row, their IP address will be temporarily locked out for 15 minutes to prevent brute-force attacks.
