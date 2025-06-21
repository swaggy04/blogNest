// src/components/article/all-articles-skeleton.tsx

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AllArticlesPageSkeleton() {
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
