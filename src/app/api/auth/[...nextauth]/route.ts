import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth/src";

const validMailDomains = ["@hunger.ai", "@hotcakeapp.com", "@method.im"];

export const authOptions: AuthOptions = {
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
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
