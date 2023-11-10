import NextAuth, { NextAuthConfig } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

const validMailDomains = ["@hunger.ai", "@hotcakeapp.com", "@method.im"];

const authOptions: NextAuthConfig = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GCP_CLIENT_ID,
      clientSecret: process.env.GCP_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user }) {
      return validMailDomains.some((domain) => user.email?.endsWith(domain));
    },
  },
};
const { handlers } = NextAuth(authOptions);
// eslint-disable-next-line import/no-anonymous-default-export
export const GET = handlers.GET;
export const POST = handlers.POST;
