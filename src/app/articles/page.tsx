
import {
  AllArticlesPage,
} from "@/components/article/all-blogpage";
import ArticleSearchInput from "@/components/article/article-search-input";
import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import { fetchArticleByQuery } from "@/lib/query/fetch-article";
import Link from "next/link";
import AllArticlesPageSkeleton from "@/components/article/aLL-articles-page-skeleton";

const ITEMS_PER_PAGE = 3;

export default async function Page({
  searchParams,
}: {
  searchParams?: { search?: string; page?: string };
}) {
  const searchText = searchParams?.search?.trim().toLowerCase() || "";
  const currentPage = Number(searchParams?.page) || 1;

  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;

  const { articles, total } = await fetchArticleByQuery(searchText, skip, take);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            All Articles
          </h1>
          <Suspense>
            <ArticleSearchInput />
          </Suspense>
        </div>

        {/* Articles */}
        <Suspense fallback={<AllArticlesPageSkeleton />}>
          <AllArticlesPage articles={articles} />
        </Suspense>

        {/* Pagination */}
        <div className="mt-12 flex justify-center gap-2">
          {/* Prev */}
          <Link href={`?search=${searchText}&page=${currentPage - 1}`} passHref>
            <Button variant="ghost" size="sm" disabled={currentPage === 1}>
              ← Prev
            </Button>
          </Link>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, index) => (
            <Link
              key={index}
              href={`?search=${searchText}&page=${index + 1}`}
              passHref
            >
              <Button
                variant={currentPage === index + 1 ? "destructive" : "ghost"}
                size="sm"
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </Button>
            </Link>
          ))}

          {/* Next */}
          <Link href={`?search=${searchText}&page=${currentPage + 1}`} passHref>
            <Button
              variant="ghost"
              size="sm"
              disabled={currentPage === totalPages}
            >
              Next →
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
