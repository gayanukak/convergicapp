import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; // <-- use the singleton

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database", // you have Session model in schema.prisma, so this is fine
  },
  secret: process.env.NEXTAUTH_SECRET,
  // IMPORTANT: remove `pages` overrides so built-in pages are used
  // pages: { ... }  <-- delete this block entirely
  callbacks: {
    async session({ session }) {
      // you can enrich the session here if needed
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };