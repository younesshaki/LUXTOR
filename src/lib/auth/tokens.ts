import { randomBytes, createHash } from "node:crypto";

import { prisma } from "@/lib/db";

type TokenKind = "verify-email" | "reset-password";

const TOKEN_TTL_MS: Record<TokenKind, number> = {
  "verify-email": 1000 * 60 * 60 * 24,
  "reset-password": 1000 * 60 * 60,
};

function hashToken(rawToken: string) {
  return createHash("sha256").update(rawToken).digest("hex");
}

function buildIdentifier(kind: TokenKind, email: string) {
  return `${kind}:${email.toLowerCase()}`;
}

export async function createUserToken(kind: TokenKind, email: string) {
  const identifier = buildIdentifier(kind, email);
  const rawToken = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + TOKEN_TTL_MS[kind]);

  await prisma.verificationToken.deleteMany({
    where: { identifier },
  });

  await prisma.verificationToken.create({
    data: {
      identifier,
      token: hashToken(rawToken),
      expires,
    },
  });

  return {
    rawToken,
    expires,
  };
}

export async function consumeUserToken(kind: TokenKind, email: string, rawToken: string) {
  const identifier = buildIdentifier(kind, email);
  const token = hashToken(rawToken);

  const record = await prisma.verificationToken.findFirst({
    where: {
      identifier,
      token,
    },
  });

  if (!record) {
    return null;
  }

  if (record.expires < new Date()) {
    await prisma.verificationToken.deleteMany({
      where: {
        identifier,
        token,
      },
    });
    return null;
  }

  await prisma.verificationToken.deleteMany({
    where: {
      identifier,
      token,
    },
  });

  return record;
}
