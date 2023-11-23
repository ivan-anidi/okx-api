import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions as NextAuthConfig } from "next-auth";
import { getServerSession } from "next-auth";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "pg";

import Facebook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import Email from "next-auth/providers/email";

const pool = new Pool({
  host: "89.19.216.32",
  user: "cleopatra",
  password: "cleopatra",
  database: "main",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation
declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
    userRole?: "admin";
  }
}

export const config = {
  adapter: PostgresAdapter(pool),
  providers: [
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
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
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token, user }) {
      session = {
        ...session,
        user: {
          ...session.user,
        },
      };
      return session;
    },
  },
  events: {
    createUser: async (message) => {
      console.log(message);
    },
  },
} satisfies NextAuthConfig;

// Helper function to get session without passing config every time
// https://next-auth.js.org/configuration/nextjs#getserversession
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}

// We recommend doing your own environment variable validation
declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NEXTAUTH_SECRET: string;
      AUTH_FACEBOOK_ID: string;
      AUTH_FACEBOOK_SECRET: string;
      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
    }
  }
}
