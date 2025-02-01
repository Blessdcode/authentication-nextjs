import Credentials from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { LoginSchema } from "./schema";
import { getUserEmail } from "./lib/data/getUser";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserEmail(email);
          if (!user || !user.password) {
            return null;
          }

          if (await bcrypt.compare(password, user.password)) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthOptions;
