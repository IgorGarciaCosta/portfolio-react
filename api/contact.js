// api/contact.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  // SMTP (ex.: Gmail App Password)
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER, // seuGmail@gmail.com
      pass: process.env.MAIL_PASS, // senha de app
    },
  });

  try {
    await transport.sendMail({
      from: `"Portfolio" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,          // destinatário final
      replyTo: email,                   // para responder ao visitante
      subject: `Portfolio | message from ${name}`,
      text: message,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Mail failed" });
  }
}
