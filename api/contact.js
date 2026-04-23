// api/contact.js
import nodemailer from 'nodemailer';

// ── Rate-limiting em memória (por IP, janela de 15 min) ──────────────
const WINDOW_MS = 15 * 60 * 1000; // 15 minutos
const MAX_REQUESTS = 5;
const hits = new Map(); // Map<ip, { count, resetAt }>

function isRateLimited(ip) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

// ── Validação ────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeHeader(value) {
  // Remove \r e \n para impedir header injection
  return String(value).replace(/[\r\n]/g, '').trim();
}

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

  // ── Campos obrigatórios ──────────────────────────────────────────
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  // ── Validação de formato e tamanho ───────────────────────────────
  if (typeof name !== 'string' || name.length > 100) {
    return res.status(400).json({ error: 'Invalid name' });
  }
  if (typeof email !== 'string' || !EMAIL_RE.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  if (typeof message !== 'string' || message.length > 5000) {
    return res.status(400).json({ error: 'Message too long' });
  }

  // ── Sanitização ──────────────────────────────────────────────────
  const safeName = sanitizeHeader(name);
  const safeEmail = sanitizeHeader(email);

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

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
