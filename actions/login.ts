
"use server";

import { LoginSchema } from "@/schema";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { getUserEmail } from "@/lib/data/getUser";
import { generateVerification } from "@/utils/getToken";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedValues = LoginSchema.safeParse(values);
  if (!validatedValues.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password } = validatedValues.data;
  const existingUser = await getUserEmail(email);

  if (!existingUser || !existingUser.password) {
    return { error: "Email or password do not match" };
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch) {
    return { error: "Invalid Credentials" };
  }

  // Check email verification
  if (!existingUser.emailVerified) {
    if (!existingUser.email) {
      return { error: "Email is not valid" };
    }
    const verificationToken = await generateVerification(existingUser.email);
   const sendEmailVerification = await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    console.log(verificationToken, "verificationToken");
    console.log(sendEmailVerification, "verificationEmail");
    return { success: "Confirmation email sent" };
  }

  return { success: "Login successful, redirecting..." };
};
