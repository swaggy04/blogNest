import { AllArticlesPage } from "@/components/article/all-blogpage";
import ArticleSearchInput from "@/components/article/article-search-input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchArticleByQuery } from "@/lib/query/fetch-article";
import Link from "next/link";
import { Suspense } from "react";

type SearchPageProps = {
  searchParams: {
    search?: string;
    page?: string;
  };
};

const ITEMS_PER_PAGE = 3;

export default async function ArticlesPage({ searchParams }: SearchPageProps) {
  const searchText = searchParams.search || "";
  const currentPage = Number(searchParams.page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;

  const { articles, total } = await fetchArticleByQuery(searchText, skip, take);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-950 overflow-hidden">
      <main className="container mx-auto px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            All Articles
          </h1>
          <Suspense>
            <ArticleSearchInput />
          </Suspense>
        </div>

        {/* Article List */}
        <Suspense fallback={<AllArticlesPageSkeleton />}>
          <AllArticlesPage articles={articles} />
        </Suspense>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {/* Prev */}
            <Link href={`?search=${searchText}&page=${currentPage - 1}`}>
              <Button variant="ghost" size="sm" disabled={currentPage === 1}>
                ← Prev
              </Button>
            </Link>

            {/* Page Numbers */}
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

            {/* Next */}
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
        )}

        {/* Optional: Back to Home */}
        <div className="pt-6 text-center">
          <Link href="/">
            <Button variant="outline">← Back to Home</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export function AllArticlesPageSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden transition-all hover:shadow-md rounded-xl p-4"
        >
          <div>
            <Skeleton className="mb-3 h-36 w-full rounded-md bg-gradient-to-br from-purple-100/40 to-blue-100/40 dark:from-purple-900/10 dark:to-blue-900/10" />
            <Skeleton className="h-5 w-3/4 rounded-md" />
            <Skeleton className="mt-1 h-3 w-1/2 rounded-md" />

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-7 rounded-full" />
                <Skeleton className="h-3 w-16 rounded-md" />
              </div>
              <Skeleton className="h-3 w-20 rounded-md" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
