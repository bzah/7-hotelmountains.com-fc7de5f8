// Edge Function: send-contact-email
// Sends contact form submissions via Gmail SMTP using nodemailer
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SENDER_EMAIL = "soaf.baz@gmail.com";
const RECIPIENT_EMAIL = "contact@HotelMountains.com";

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const appPassword = Deno.env.get("GMAIL_APP_PASSWORD");
  if (!appPassword) {
    console.error("GMAIL_APP_PASSWORD is not set");
    return new Response(
      JSON.stringify({ error: "Email service not configured" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  let payload: ContactPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const name = (payload.name || "").trim();
  const email = (payload.email || "").trim();
  const subject = (payload.subject || "").trim();
  const message = (payload.message || "").trim();

  if (!name || name.length > 200) {
    return new Response(JSON.stringify({ error: "Invalid name" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  if (!isEmail(email) || email.length > 320) {
    return new Response(JSON.stringify({ error: "Invalid email" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  if (!message || message.length > 5000) {
    return new Response(JSON.stringify({ error: "Invalid message" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  if (subject.length > 300) {
    return new Response(JSON.stringify({ error: "Invalid subject" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const finalSubject = subject
    ? `[HotelMountains Contact] ${subject}`
    : `[HotelMountains Contact] New message from ${name}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a1a;">New Contact Form Submission</h2>
      <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding:8px; border:1px solid #eee;"><strong>Name</strong></td><td style="padding:8px; border:1px solid #eee;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:8px; border:1px solid #eee;"><strong>Email</strong></td><td style="padding:8px; border:1px solid #eee;">${escapeHtml(email)}</td></tr>
        ${subject ? `<tr><td style="padding:8px; border:1px solid #eee;"><strong>Subject</strong></td><td style="padding:8px; border:1px solid #eee;">${escapeHtml(subject)}</td></tr>` : ""}
      </table>
      <h3 style="color:#1a1a1a; margin-top:24px;">Message</h3>
      <div style="background:#f7f7f7; padding:16px; border-radius:8px; white-space:pre-wrap;">${escapeHtml(message)}</div>
      <p style="color:#666; font-size:12px; margin-top:24px;">Sent from hotelmountains.com contact form</p>
    </div>
  `;

  const text = `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\n${subject ? `Subject: ${subject}\n` : ""}\nMessage:\n${message}\n`;

  const client = new SMTPClient({
    connection: {
      hostname: "smtp.gmail.com",
      port: 465,
      tls: true,
      auth: {
        username: SENDER_EMAIL,
        password: appPassword,
      },
    },
  });

  try {
    await client.send({
      from: `HotelMountains Contact <${SENDER_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      replyTo: `${name} <${email}>`,
      subject: finalSubject,
      content: text,
      html: html,
    });
    await client.close();

    console.log(`Contact email sent successfully from ${email}`);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    try {
      await client.close();
    } catch (_) {
      // ignore
    }
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
