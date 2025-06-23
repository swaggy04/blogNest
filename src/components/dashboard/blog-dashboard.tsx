"use server";

import Link from "next/link";
import { Button } from "../ui/button";
import { Clock, FileText, MessageCircle, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import RecentArticle from "./recent-article";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const BlogDashboard = async () => {
  const { userId: clerkUserId } = await auth();

  // Not logged in
  if (!clerkUserId) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">Not authorized</h2>
        <p className="text-muted-foreground">Please log in to view your dashboard.</p>
      </div>
    );
  }

  // Find internal user by Clerk ID
  const user = await prisma.user.findUnique({
    where: { clerkUserId },
  });

  if (!user) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">User not found</h2>
        <p className="text-muted-foreground">No user found in the database.</p>
      </div>
    );
  }

  // Fetch only user's articles and their comment count
  const [articles, totalComments] = await Promise.all([
    prisma.articles.findMany({
      where: { authorId: user.id },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        comments: true,
        author: {
          select: {
            name: true,
            email: true,
            imageUrl: true,
          },
        },
      },
    }),
    prisma.comment.count({
      where: { authorId: user.id },
    }),
  ]);

  return (
    <main className="flex-1 p-5 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="px-4">
          <h1 className="text-4xl font-extrabold">Blog Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your blog dashboard! Here you can manage your articles, comments, and analytics.
          </p>
        </div>
        <Link href={"/dashboard/articles/create"}>
          <Button className="cursor-pointer font-medium">
            <PlusCircle className="w-4 h-4 mr-2" />
            Create
          </Button>
        </Link>
      </div>

      {/* Show stats only if articles exist */}
      {articles.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-3 mt-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{articles.length}</div>
              <p className="text-xs text-muted-foreground mt-1">+5 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalComments}</div>
              <p className="text-xs text-muted-foreground mt-1">12 awaiting moderation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Reading Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2m</div>
              <p className="text-xs text-muted-foreground mt-1">+0.8m from last month</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="mt-8 text-center text-muted-foreground">
          <p className="text-sm">You have not created any articles yet.</p>
          <Link href="/dashboard/articles/create">
            <Button className="mt-4">Create Your First Article</Button>
          </Link>
        </div>
      )}

      <div className="mt-8">
        <RecentArticle articles={articles} />
      </div>
    </main>
  );
};

export default BlogDashboard;
