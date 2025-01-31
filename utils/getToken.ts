import { getVerificationTokenByEmail } from "@/lib/data/verificationtoken";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export const generateVerification = async (email: string) => {
  const token = crypto.randomBytes(32).toString("hex");
    //   const expires = new Date(new Date().getTime() + 3600 * 1000);
    const expires = new Date(new Date().getTime() + 7 * 24 * 3600 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const verificationToken = await prisma.verificationToken.create({
    data: {
     
      email,
      token,
      expires,
    },
  });
  return verificationToken;
};
