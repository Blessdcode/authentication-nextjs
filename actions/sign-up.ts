"use server";

import { SignUpSchema } from "@/schema";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import * as z from "zod";
import { getUserEmail } from "@/lib/data/getUser";

export const signup = async (fields: z.infer<typeof SignUpSchema>) => {
  console.log(fields, "fields");
  const validatedFields = SignUpSchema.parse(fields);
  if (!validatedFields) throw new Error("Invalid fields");

  const { fullName, userName, password, email } =
    validatedFields;

    const existingEmail = await getUserEmail(email)
    const hashPassword = await bcrypt.hash(password, 10)
    if(existingEmail){
        throw new Error( "Email already in use!")
    }
    const createUser = await prisma.user.create({
        data: {
            fullName, userName, email, password:hashPassword
        }
    })
    console.log(createUser, "user created successfully")

};
