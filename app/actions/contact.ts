"use server";

import { contactSchema, fieldErrorsFrom, type ContactState } from "@/lib/contact";

/**
 * Sends the contact form through EmailJS's REST API from the server —
 * the same EmailJS service + template used by the intalk.ai site, but the
 * keys never reach the browser and input is validated here first.
 *
 * Required env (server-only, see .env.example):
 *   EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY
 * Optional:
 *   EMAILJS_PRIVATE_KEY  — needed if "Use Private Key" is enabled in EmailJS.
 *
 * EmailJS blocks server-side calls by default: enable
 * Account → Security → "Allow EmailJS API for non-browser applications".
 */
const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

/** Submissions faster than this after the form rendered are treated as bots. */
const MIN_FILL_MS = 2500;

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // --- Spam protection -------------------------------------------------
  // 1) Honeypot: a visually hidden field real users never fill.
  // 2) Time trap: bots usually submit instantly.
  // Bots get a quiet success so they don't learn to adapt; nothing is sent.
  const honeypot = formData.get("website");
  const startedAt = Number(formData.get("startedAt"));
  if ((typeof honeypot === "string" && honeypot.length > 0) || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    return { status: "success" };
  }

  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: fieldErrorsFrom(parsed.error),
      values: raw,
    };
  }

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.error("[contact] EmailJS is not configured — set EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY.");
    return {
      status: "error",
      message: "The contact form isn't connected yet, so your message wasn't sent. Please try again later.",
      values: raw,
    };
  }

  const { name, email, message } = parsed.data;

  try {
    const res = await fetch(EMAILJS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        ...(privateKey ? { accessToken: privateKey } : {}),
        // Same parameter names as the intalk.ai template, so it can be reused as-is.
        template_params: {
          from_name: name,
          from_email: email,
          reply_to: email,
          message,
          from_phone: "",
          preferredMethod: "email",
        },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.error(`[contact] EmailJS responded ${res.status}: ${await res.text().catch(() => "")}`);
      return {
        status: "error",
        message: "Something went wrong sending your message. Please try again in a moment.",
        values: raw,
      };
    }
  } catch (err) {
    console.error("[contact] EmailJS request failed", err);
    return {
      status: "error",
      message: "We couldn't reach the mail service. Please check your connection and try again.",
      values: raw,
    };
  }

  return { status: "success" };
}
