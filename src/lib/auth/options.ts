import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { getUserByEmail } from "@/lib/services/users";
import { isEmailTransportConfigured } from "@/lib/email/service";
import { loginSchema } from "@/lib/validations/auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET ?? "luxtor-development-secret",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/account/login",
  },
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          throw new Error("Please enter a valid email and password.");
        }

        const user = await getUserByEmail(parsed.data.email);

        if (!user) {
          return null;
        }

        if (!user.emailVerified && isEmailTransportConfigured()) {
          throw new Error("Please verify your email before signing in.");
        }

        const isValid = await verifyPassword(parsed.data.password, user.passwordHash);

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.fullName ?? user.email,
          role: user.role,
          fullName: user.fullName,
          phone: user.phone,
          suburb: user.suburb,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.role = user.role;
        token.fullName = user.fullName;
        token.phone = user.phone;
        token.suburb = user.suburb;
        token.name = user.fullName ?? user.name ?? user.email ?? undefined;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? session.user.id;
        session.user.role = token.role ?? session.user.role;
        session.user.fullName = token.fullName;
        session.user.phone = token.phone;
        session.user.suburb = token.suburb;
        session.user.email = token.email ?? session.user.email ?? undefined;
        session.user.name = token.fullName ?? token.name ?? session.user.name ?? session.user.email ?? undefined;
      }

      return session;
    },
  },
};
