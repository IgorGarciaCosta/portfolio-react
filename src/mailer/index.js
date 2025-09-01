// mailer/index.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());          // libera CORS p/ seu front
app.use(express.json());  // lê JSON do body


//send email
app.post("contact", async (req, res) => {
  const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const transport = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    try {
        await transport.sendMail({
        from:  `"Portfolio" <${process.env.MAIL_USER}>`,
        to: process.env.MAIL_TO,              // para onde vai chegar
        replyTo: email,                       // responde ao visitante
        subject: `Portfolio: message from ${name}`,
        text: message,
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Mail failed" });
  }
});

// Render lê PORT da env (ou usa 3000 localmente)
app.listen(process.env.PORT || 3000, () =>
  console.log("Mailer running")
);