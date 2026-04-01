import "dotenv/config";

import { PrismaClient, UserRole } from "@prisma/client";
import { hashPassword } from "../src/lib/auth/password";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;
  const name = process.env.ADMIN_SEED_NAME ?? "LUXTOR Admin";

  if (!email || !password) {
    console.info("Skipping admin seed because ADMIN_SEED_EMAIL or ADMIN_SEED_PASSWORD is not set.");
    return;
  }

  const passwordHash = await hashPassword(password);

  await prisma.user.upsert({
    where: { email: email.toLowerCase() },
    update: {
      fullName: name,
      role: UserRole.admin,
      passwordHash,
      emailVerified: new Date(),
    },
    create: {
      email: email.toLowerCase(),
      fullName: name,
      role: UserRole.admin,
      passwordHash,
      emailVerified: new Date(),
    },
  });

  console.info(`Seeded admin account for ${email.toLowerCase()}.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
