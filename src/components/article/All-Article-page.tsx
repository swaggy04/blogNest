"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

import fetchAllArticles from "@/lib/query/fetch-article"; // 👈 we'll update this too

const AllArticlesPage = async () => {
  const articles = await fetchAllArticles(); // 👈 no search text

  if (!articles.length) {
    return (
      <div className="text-center text-muted-foreground py-12">
        No articles found.
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Link
          href={`/articles/${article.id}`}
          key={article.id}
          className="group relative block"
        >
          <Card className="overflow-hidden transition-all hover:shadow-lg">
            <div className="p-6">
              {/* Image */}
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Title & Category */}
              <h3 className="text-xl font-semibold text-foreground">
                {article.title}
              </h3>
              <p className="mt-2 text-muted-foreground">{article.category}</p>

              {/* Author Info */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={article.author.imageUrl || ""} />
                    <AvatarFallback>
                      {article.author.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    {article.author.name}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(article.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default AllArticlesPage;
