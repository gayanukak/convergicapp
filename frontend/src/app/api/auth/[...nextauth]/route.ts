import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  
  session: {
    strategy: "jwt", // you have Session model in schema.prisma, so this is fine
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