import NextAuth, { NextAuthConfig } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

export const validAuthMailDomains = [
  "@hunger.ai",
  "@hotcakeapp.com",
  "@method.im",
];

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
    async signIn({ user, profile }) {
      return validAuthMailDomains.some(
        (domain) => (user?.email ?? profile?.email)?.endsWith(domain),
      );
    },
  },
};
export const NextAuthInstance = NextAuth(authOptions);
