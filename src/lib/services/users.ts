import { UserRole } from "@prisma/client";

import { prisma } from "@/lib/db";
import { createUserToken, consumeUserToken } from "@/lib/auth/tokens";
import { hashPassword } from "@/lib/auth/password";
import { isEmailTransportConfigured, sendEmail } from "@/lib/email/service";
import { ServiceError } from "@/lib/errors";
import {
  buildPasswordResetEmail,
  buildVerificationEmail,
} from "@/lib/email/templates";
import {
  forgotPasswordSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/lib/validations/auth";

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email: normalizeEmail(email) },
  });
}

export async function registerUser(input: unknown) {
  const parsed = registerSchema.parse(input);
  const email = normalizeEmail(parsed.email);
  const existing = await getUserByEmail(email);
  const shouldRequireEmailVerification = isEmailTransportConfigured();

  if (existing?.emailVerified) {
    return {
      user: null,
      verificationRequired: shouldRequireEmailVerification,
    };
  }

  const passwordHash = await hashPassword(parsed.password);

  let user =
    existing ??
    (await prisma.user.create({
      data: {
        email,
        fullName: parsed.fullName,
        passwordHash,
        phone: parsed.phone || null,
        suburb: parsed.suburb || null,
        role: UserRole.customer,
        emailVerified: shouldRequireEmailVerification ? null : new Date(),
      },
    }));

  if (existing) {
    user = await prisma.user.update({
      where: { id: existing.id },
      data: {
        fullName: parsed.fullName,
        phone: parsed.phone || null,
        suburb: parsed.suburb || null,
        passwordHash,
        emailVerified:
          existing.emailVerified ?? (shouldRequireEmailVerification ? null : new Date()),
      },
    });
  }

  if (!shouldRequireEmailVerification) {
    return {
      user,
      verificationRequired: false,
    };
  }

  const { rawToken } = await createUserToken("verify-email", email);
  const emailPayload = buildVerificationEmail(email, rawToken);

  await sendEmail({
    to: email,
    ...emailPayload,
  });

  return {
    user,
    verificationRequired: true,
  };
}

export async function requestPasswordReset(input: unknown) {
  const parsed = forgotPasswordSchema.parse(input);
  const user = await getUserByEmail(parsed.email);

  if (!user || (!user.emailVerified && isEmailTransportConfigured())) {
    return;
  }

  const { rawToken } = await createUserToken("reset-password", user.email);
  const emailPayload = buildPasswordResetEmail(user.email, rawToken);

  await sendEmail({
    to: user.email,
    ...emailPayload,
  });
}

export async function resetPassword(input: unknown) {
  const parsed = resetPasswordSchema.parse(input);
  const user = await getUserByEmail(parsed.email);

  if (!user) {
    throw new ServiceError("This password reset link is invalid or expired.");
  }

  const token = await consumeUserToken("reset-password", user.email, parsed.token);

  if (!token) {
    throw new ServiceError("This password reset link is invalid or expired.");
  }

  const passwordHash = await hashPassword(parsed.password);

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash },
  });

  await prisma.session.deleteMany({
    where: { userId: user.id },
  });
}

export async function verifyUserEmail(input: { email: string; token: string }) {
  const email = normalizeEmail(input.email);
  const user = await getUserByEmail(email);

  if (!user) {
    throw new ServiceError("This verification link is invalid or has already been used.");
  }

  if (user.emailVerified) {
    return user;
  }

  const token = await consumeUserToken("verify-email", email, input.token);

  if (!token) {
    throw new ServiceError("This verification link is invalid or has already been used.");
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
    },
  });

  await prisma.leadSubmission.updateMany({
    where: {
      userId: null,
      email,
    },
    data: {
      userId: user.id,
    },
  });

  return updated;
}
