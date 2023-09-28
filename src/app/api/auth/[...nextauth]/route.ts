import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../../../../prisma/clients";
import Email from "next-auth/providers/email";
import { CustomsendVerificationRequest } from "../signinemail/route";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),

        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      sendVerificationRequest({ identifier, url, provider }) {
        CustomsendVerificationRequest({
          identifier,
          url,
          provider,
        });
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: ({ session, token }) => {
      return { ...session, user: { ...session.user, id: token.id } };
    },
    jwt: ({ token, user }) => {
      if (user) {
        return { ...token, id: user.id };
      }
      return token;
    },
  },

  pages: {
    verifyRequest: "/auth/verify-request",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
