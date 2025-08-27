// api/contact.ts – Vercel Serverless Function
import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";


console.log('SMTP_HOST ->', process.env.SMTP_HOST);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    /* ----- transporter ----- */
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // 465 = SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    /* ----- e-mail ----- */
await transporter.sendMail({
  from: `"${name}" <${email}>`,
  to: process.env.TO_EMAIL,
  subject: `Portfolio contact – ${name}`,
  text: message,                      // fallback para clientes que só leem texto
  html: `
    <h3>New message from ${name}</h3>
    <p><strong>Email:</strong> ${email}</p>
    <p>${message.replace(/\n/g, "<br/>")}</p>
  `,
});

    return res.status(200).json({ ok: true });
  } catch (err: unknown) {
  if (err instanceof Error) {
    console.error("Mail error:", err.message);
  } else {
    console.error("Mail error:", err);
  }
    return res.status(500).json({ error: "Internal error" });
  }
}
