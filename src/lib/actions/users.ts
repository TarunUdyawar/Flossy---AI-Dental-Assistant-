"use server"
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

export const syncUser = async () => {
  try {
    const user = await currentUser();
    if (!user) return;
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });
    if (existingUser) return existingUser;
    const dbUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0]?.emailAddress || "",
        phone: user.phoneNumbers[0]?.phoneNumber || "",
      },
      
      
    });
    console.log("✅ New user created:", dbUser);
    return dbUser;
  } catch (error) {
    console.log("Sync User Error", error);
  }
};
