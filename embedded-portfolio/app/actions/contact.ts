"use server";

import { Resend } from "resend";

type ContactState =
  | { ok: true; message: string }
  | { ok: false; message: string };

function getString(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function sendContactEmail(
  _prevState: ContactState | null,
  formData: FormData
): Promise<ContactState> {
  const name = getString(formData, "name");
  const email = getString(formData, "email");
  const subject = getString(formData, "subject");
  const message = getString(formData, "message");

  // Honeypot (bots fill hidden fields)
  const company = getString(formData, "company");
  if (company) return { ok: true, message: "Thanks! Message sent." };

  // Basic validation
  if (!name || !email || !message) {
    return { ok: false, message: "Please fill out name, email, and message." };
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }
  if (message.length < 10) {
    return { ok: false, message: "Message is a bit short — add a little more detail." };
  }

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!resendKey || !to || !from) {
    return { ok: false, message: "Server not configured (missing env vars)." };
  }

  const resend = new Resend(resendKey);

  const safeSubject = subject ? `Portfolio: ${subject}` : `Portfolio message from ${name}`;

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto;">
      <h2>New portfolio message</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject || "(none)")}</p>
      <hr />
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject: safeSubject,
    replyTo: email, // so you can hit "Reply" directly
    html,
  });

  if (error) {
    return { ok: false, message: "Something went wrong sending your message. Try again shortly." };
  }

  return { ok: true, message: "Sent! I’ll get back to you soon." };
}

// Tiny sanitizer for email HTML body
function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
