"use server";

import { SignUpSchema } from "@/schema";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import * as z from "zod";
import { getUserEmail } from "@/lib/data/getUser";
import { generateVerification } from "@/utils/getToken";
import { sendVerificationEmail } from "@/lib/mail";

export const signup = async (fields: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.parse(fields);
  if (!validatedFields) throw new Error("Invalid fields");

  const { fullName, userName, password, email } = validatedFields;

  const existingEmail = await getUserEmail(email);
  const hashPassword = await bcrypt.hash(password, 10);
  if (existingEmail) {
    throw new Error("Email already in use!");
  }
  const createUser = await prisma.user.create({
    data: {
      fullName,
      userName,
      email,
      password: hashPassword,
    },
  });
  console.log(createUser, "user created successfully");

  const { token } = await generateVerification(email); 
  await sendVerificationEmail(email, token)
  console.log(token, "token")
};
