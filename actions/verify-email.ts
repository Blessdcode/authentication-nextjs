"use server";

import { prisma } from "@/lib/prisma";

export const verifyEmail = async (token: string) => {
  if (!token) {
    return { error: "Invalid token" };
  }

  // Find the user associated with the token
  const verifiedToken: { email: string } | null = await prisma.verificationToken.findUnique({
    where: { email_token: { email: "", token } },
  });



  if (!verifiedToken) {
    return { error: "Invalid or expired token" };
  }

  // Update user to mark email as verified
  await prisma.user.update({
    where: { email: verifiedToken.email },
    data: { emailVerified: new Date() },
  });

  // Delete verification token after successful verification
  await prisma.verificationToken.delete({
    where: { email_token: { email: verifiedToken.email, token } },
  });

  return { success: "Email verified successfully!" };
};
