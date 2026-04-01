function getBaseUrl() {
  return process.env.NEXTAUTH_URL ?? "http://localhost:3000";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function wrapEmail(title: string, body: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #202124;">
      <h1 style="font-size: 28px; margin-bottom: 16px;">${title}</h1>
      <div style="font-size: 16px; line-height: 1.6;">${body}</div>
      <p style="margin-top: 32px; color: #6b7280;">LUXTOR</p>
    </div>
  `;
}

export function buildVerificationEmail(email: string, token: string) {
  const verifyUrl = `${getBaseUrl()}/account/verify?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;

  return {
    subject: "Verify your LUXTOR account",
    text: `Welcome to LUXTOR. Verify your account by visiting ${verifyUrl}`,
    html: wrapEmail(
      "Verify your account",
      `<p>Welcome to LUXTOR.</p>
       <p>Please verify your email address to activate your account and track your requests.</p>
       <p><a href="${verifyUrl}" style="display:inline-block;padding:12px 20px;background:#aa9371;color:#fff;text-decoration:none;border-radius:4px;">Verify your account</a></p>
       <p>If you did not create an account, you can safely ignore this email.</p>`
    ),
  };
}

export function buildPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${getBaseUrl()}/account/reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;

  return {
    subject: "Reset your LUXTOR password",
    text: `Reset your password by visiting ${resetUrl}`,
    html: wrapEmail(
      "Reset your password",
      `<p>We received a request to reset your password.</p>
       <p><a href="${resetUrl}" style="display:inline-block;padding:12px 20px;background:#aa9371;color:#fff;text-decoration:none;border-radius:4px;">Reset password</a></p>
       <p>If you did not request this change, you can ignore this email.</p>`
    ),
  };
}

export function buildSubmissionConfirmationEmail(input: {
  fullName: string;
  type: "quote" | "contact";
}) {
  const title = input.type === "quote" ? "Your quote request was received" : "Your message was received";
  const safeFullName = escapeHtml(input.fullName);

  return {
    subject: `LUXTOR: ${title}`,
    text: `Hi ${input.fullName}, we received your ${input.type} request and will be in touch soon.`,
    html: wrapEmail(
      title,
      `<p>Hi ${safeFullName},</p>
       <p>We received your ${input.type} request and our team will review it shortly.</p>
       <p>Thank you for reaching out to LUXTOR.</p>`
    ),
  };
}

export function buildAdminSubmissionNotificationEmail(input: {
  type: "quote" | "contact";
  fullName: string;
  email: string;
  serviceInterest?: string | null;
  message?: string | null;
}) {
  const title = input.type === "quote" ? "New quote request" : "New contact message";
  const safeFullName = escapeHtml(input.fullName);
  const safeEmail = escapeHtml(input.email);
  const safeServiceInterest = input.serviceInterest ? escapeHtml(input.serviceInterest) : null;
  const safeMessage = input.message ? escapeHtml(input.message).replaceAll("\n", "<br/>") : null;

  return {
    subject: `LUXTOR Admin: ${title} from ${input.fullName}`,
    text: `${title} from ${input.fullName} (${input.email}).`,
    html: wrapEmail(
      title,
      `<p><strong>Name:</strong> ${safeFullName}</p>
       <p><strong>Email:</strong> ${safeEmail}</p>
       ${safeServiceInterest ? `<p><strong>Service:</strong> ${safeServiceInterest}</p>` : ""}
       ${safeMessage ? `<p><strong>Message:</strong><br/>${safeMessage}</p>` : ""}`
    ),
  };
}
