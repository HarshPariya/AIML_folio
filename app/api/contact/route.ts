import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

interface Payload {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
}

function isValid(p: Payload) {
  return (
    typeof p.name === "string" &&
    p.name.trim().length >= 2 &&
    typeof p.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email) &&
    typeof p.message === "string" &&
    p.message.trim().length >= 10
  );
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json({ ok: false, error: "Validation failed" }, { status: 422 });
  }

  const { name, email, company, message } = body;

  // If a Resend API key is configured, deliver the email. Otherwise we still
  // return success so the form works out-of-the-box in local/dev/preview.
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
          to: [siteConfig.email],
          reply_to: email,
          subject: `New portfolio message from ${name}`,
          html: `
            <h2>New message from your portfolio</h2>
            <p><strong>Name:</strong> ${escapeHtml(name!)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email!)}</p>
            ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message!).replace(/\n/g, "<br/>")}</p>
          `,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
    } catch (err) {
      console.error("Contact email failed:", err);
      return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
    }
  } else {
    // No provider configured - log for local visibility.
    console.info("[contact] message received (no email provider configured):", {
      name,
      email,
      company,
    });
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
