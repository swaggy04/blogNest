import ArticleDetailPage from '@/components/article/article-detail-page';
import { prisma } from '@/lib/prisma';
import React from 'react'



type articlepageProps = {
    params: Promise<{ id: string }>
}

const page = async ({ params }: articlepageProps) => {
    const { id } = await params;
    const article = await prisma.articles.findUnique({
        where: {
            id: id,
        },
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true
                }
            }
        }
    })
if(!article) {
    return  <h1>article not found</h1>
}


    return (
        <div>
            <ArticleDetailPage article={article}/>
        </div>
    )
}

export default page