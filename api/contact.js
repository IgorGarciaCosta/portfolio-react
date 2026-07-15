// api/contact.js
import nodemailer from 'nodemailer';

// ── In-memory rate limiting (per IP, 15-min window) ──────────────
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;
const MAX_TRACKED_IPS = 10_000;
const hits = new Map(); // Map<ip, { count, resetAt }>

export function isRateLimited(ip, now = Date.now()) {
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    // ponytail: process-local limiting is best-effort on serverless; move to a
    // shared store if abuse requires enforcement across instances.
    if (!entry && hits.size >= MAX_TRACKED_IPS) {
      hits.delete(hits.keys().next().value);
    }
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

// ── Validation ────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function sanitizeHeader(value) {
  // Remove \r and \n to prevent header injection
  return String(value).replace(/[\r\n]/g, '').trim();
}

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Rate-limit ───────────────────────────────────────────────────
  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Try again later.' });
  }

  // ── Required fields ──────────────────────────────────────────
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  // ── Format and length validation ───────────────────────────────
  if (typeof name !== 'string' || name.length > 100) {
    return res.status(400).json({ error: 'Invalid name' });
  }
  if (typeof email !== 'string' || !EMAIL_RE.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  if (typeof message !== 'string' || message.length > 5000) {
    return res.status(400).json({ error: 'Message too long' });
  }

  // ── Sanitization ──────────────────────────────────────────────────
  const safeName = sanitizeHeader(name);
  const safeEmail = sanitizeHeader(email);

  try {
    await transport.sendMail({
      from: `"Portfolio" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: safeEmail,
      subject: `Portfolio | message from ${safeName}`,
      text: message,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Mail failed' });
  }
}
