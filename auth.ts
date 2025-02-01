import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import authConfig from "./auth.config";
import { getUserID } from "./lib/data/getUser";
import { UserRole } from "@prisma/client";



export const { handlers, auth, signIn, signOut } = NextAuth({
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      const existingUser = await getUserID(user.id);
      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }
      return true;
    },
    // async session({ token, session }) {
    //   if (token.sub && session.user) {
    //     session.user.id = token.sub;
    //     console.log({ sessionToken: token });
    //   }
    //   if (token.role && session.user) {
    //     session.user.role = token.role as UserRole;
    //   }

    //   if (session.user) {
    //     session.user.name = token.name;
    //     session.user.email = token.email as string;
    //   }
    //   return session;
    // },
    },
    pages: {
      signIn:"/auth/login"
  },
  adapter: PrismaAdapter(prisma),
  ...authConfig,
});
