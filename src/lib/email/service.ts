import nodemailer from "nodemailer";

let transport: nodemailer.Transporter | null = null;

export function isEmailTransportConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransport() {
  if (transport) {
    return transport;
  }

  if (!isEmailTransportConfigured()) {
    return null;
  }

  transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transport;
}

export async function sendEmail(input: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  const from = process.env.EMAIL_FROM ?? "LUXTOR <no-reply@luxtor.com>";
  const transporter = getTransport();

  if (!transporter) {
    console.info("Email transport not configured. Logging email payload instead.", {
      from,
      to: input.to,
      subject: input.subject,
      text: input.text,
    });
    return;
  }

  await transporter.sendMail({
    from,
    to: input.to,
    subject: input.subject,
    text: input.text,
    html: input.html,
  });
}
