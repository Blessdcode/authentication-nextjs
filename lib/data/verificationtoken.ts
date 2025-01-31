import { prisma } from "../prisma";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verifiedToken = await prisma.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return verifiedToken;
  } catch {
    console.log("error in getting verification token");
    return;
  }
};
