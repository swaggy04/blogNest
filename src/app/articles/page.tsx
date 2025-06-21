import AllArticlesPageSkeleton from "@/components/article/aLL-articles-page-skeleton";
import { AllArticlesPage } from "@/components/article/all-blogpage";
import ArticleSearchInput from "@/components/article/article-search-input";
import { Button } from "@/components/ui/button";
import { fetchArticleByQuery } from "@/lib/query/fetch-article";
import Link from "next/link";
import { Suspense } from "react";

type PageProps = {
  searchParams?: {
    search?: string;
    page?: string;
  };
};

const ITEMS_PER_PAGE = 3;

export default async function ArticlesPage({ searchParams }: PageProps) {
  const searchText = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;
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
