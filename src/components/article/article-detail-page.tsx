"use client";


import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"


import { Prisma } from "@prisma/client";

type Articledetailpageprops={
    article: Prisma.ArticlesGetPayload<{
        include: {
            author:{
                select:{
                    name: true,
                    email: true,
                    imageUrl: true
                }
            }
        }
    }>
}

const ArticleDetailPage :React.FC<Articledetailpageprops> = ({article}) => {
  return (
      <div className="min-h-screen bg-background">
      {/* Reuse your existing Navbar */}

      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          {/* Article Header */}
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                {article.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-muted-foreground">
              <Avatar className="h-10 w-10 ">
                <AvatarImage className="rounded-full" src={article.author.imageUrl as string} />
                <AvatarFallback>{article.id}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">
                  {article.author.name}
                </p>
                <p className="text-sm">
                  {article.createdAt.toDateString()} · {12} min read
                </p>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <section
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Article Actions */}
          {/* <LikeButton articleId={article.id} likes={likes} isLiked = {isLiked}/> */}

          {/* Comments Section */}
          {/* <Card className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">
                {comments.length} Comments
              </h2>
            </div> */}

            {/* Comment Form */}
            {/* <CommentForm articleId={article.id} /> */}

            {/* Comments List */}
            {/* <CommentList comments={comments} />
          </Card> */}
        </article>
      </main>
    </div>
    )
}

export default ArticleDetailPage