"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const deleteArticle = async (articleId: string) => {
  const { userId: clerkUserId } = await auth(); // this is Clerk user ID

  if (!clerkUserId) {
    return { success: false, message: "You must be logged in to delete articles." };
  }

  // Get the user's actual DB ID (based on clerkUserId)
  const user = await prisma.user.findUnique({
    where: { clerkUserId },
  });

  if (!user) {
    return { success: false, message: "User not found in database." };
  }

  const article = await prisma.articles.findUnique({
    where: { id: articleId },
    select: { authorId: true },
  });

  if (!article) {
    return { success: false, message: "Article not found." };
  }

  if (article.authorId !== user.id) {
    return { success: false, message: "You are not allowed to delete this article." };
  }

  await prisma.articles.delete({
    where: { id: articleId },
  });

  revalidatePath("/dashboard");

  return { success: true };
};
