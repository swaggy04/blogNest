import { AllArticlesPage } from "@/components/article/all-blogpage";
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
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const rawSearch = searchParams?.search;
  const rawPage = searchParams?.page ?? "";

  const searchText =
    typeof rawSearch === "string" ? rawSearch.trim().toLowerCase() : "";

  const currentPage = Math.max(
    1,
    typeof rawPage === "string" && !isNaN(Number(rawPage))
      ? Number(rawPage)
      : 1
  );

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
          <Link href={`?search=${searchText}&page=${currentPage - 1}`}>
            <Button variant="ghost" size="sm" disabled={currentPage === 1}>
              ← Prev
            </Button>
          </Link>

          {Array.from({ length: totalPages }).map((_, index) => (
            <Link key={index} href={`?search=${searchText}&page=${index + 1}`}>
              <Button
                variant={currentPage === index + 1 ? "destructive" : "ghost"}
                size="sm"
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </Button>
            </Link>
          ))}

          <Link href={`?search=${searchText}&page=${currentPage + 1}`}>
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
