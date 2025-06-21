"use client"
import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Prisma } from "@/generated/prisma"

import React, { useTransition } from "react"
import { deleteArticle } from "@/actions/delete-article"




type RecentArticlesProps = {
    articles: Prisma.ArticlesGetPayload<{
        include: {
            comments: true;
            author: {
                select: {
                    name: true;
                    email: true;
                    imageUrl: true;
                };
            };
        };
    }>[];
};


const RecentArticle: React.FC<RecentArticlesProps> = ({ articles }) => {

    return (
        <Card className="mb-8">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold">
                        Recent Article
                    </CardTitle>
                    <Button size={`sm`} variant={`ghost`} className="text-muted-foreground dark:bg-white/10">
                        View All →
                    </Button>
                </div>
            </CardHeader>
            {
                !articles.length ? (<CardContent>no articles found</CardContent>) : (
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Comments</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    articles.map((article) => (
                                        <TableRow key={article.id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                            <TableCell className="font-medium">{article.title}</TableCell>
                                            <TableCell>
                                                <span className="px-2 py-1 rounded-full text-xs  text-green-500">
                                                    Published
                                                </span>
                                            </TableCell>
                                            <TableCell>{article.comments.length}</TableCell>
                                            <TableCell>{article.createdAt.toDateString()}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Link href={`/dashboard/articles/${article.id}/edit`}>
                                                        <Button variant={`ghost`} size="sm" className="border-2 hover:bg-blue-100">Edit</Button>
                                                    </Link>
                                                    <DeleteButton articleId={article.id} />
                                                </div>
                                            </TableCell>
                                        </TableRow>

                                    ))
                                }
                            </TableBody>
                        </Table>
                    </CardContent>

                )
            }

        </Card>
    )
}

export default RecentArticle

 
type DeleteButtonProps = {
    articleId: string;
}

const DeleteButton :React.FC<DeleteButtonProps> = ({articleId}) => {
   const [isPending, setTransition] = useTransition()
    return (
        <form   action={() =>
        setTransition(async () => {
          await deleteArticle(articleId);
        })
      } >
            <Button variant={`outline`} size="sm" disabled={isPending} type="submit" className="bg-red-500 dark:bg-red-600 text-white hover:bg-red-800 hover:text-white dark:hover:bg-red-800">
                {isPending ? "Deleting..." : "Delete"}
            </Button>
        </form>
    )
}