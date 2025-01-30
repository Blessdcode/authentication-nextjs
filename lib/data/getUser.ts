import { prisma } from "../prisma";

export const getUserEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch {
    console.log("error in getting users email");
    return;
  }
};

export const getUserID = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch {
    console.log("error in getting user id");
    return;
  }
};
