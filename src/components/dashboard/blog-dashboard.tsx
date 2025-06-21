"use server"
import Link from "next/link"
import { Button } from "../ui/button"
import { Clock,  FileText, MessageCircle, PlusCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import RecentArticle from "./recent-article"
import { prisma } from "@/lib/prisma"


const BlogDashboard = async () => {

const [articles, totalComments] = await Promise.all([
    prisma.articles.findMany({
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
    prisma.comment.count(),
  ]);

  return (
    <main className="flex-1 p-5 md:p-8 ">
      <div className="flex items-center justify-between mb:8">
        <div className="px-4">
          <h1 className="text-4xl font-extrabold">Blog Dashboard</h1>
          <p>Welcome to your blog dashboard! Here you can manage your articles, comments, and analytics.</p>
        </div>
        <Link href={"/dashboard/articles/create"}>
          <Button className="cursor-pointer font-medium ">
            <PlusCircle className="w-4 h-4 " />
            Create
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Articles
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articles.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +5 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Comments
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComments}</div>
            <p className="text-xs text-muted-foreground mt-1">
              12 awaiting moderation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Reading Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2m</div>
            <p className="text-xs text-muted-foreground mt-1">
              +0.8m from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <RecentArticle articles={articles}/>
      </div>
    </main>
  )
}

export default BlogDashboard