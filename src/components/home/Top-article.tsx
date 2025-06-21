import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import ViewAllArticlesButton from '@/components/ViewAllArticlesButton'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'


// // 1. Define the type for the articles with included relations
// type ArticleWithAuthorAndComments = Prisma.ArticlesGetPayload<{
//   include: {
//     author: true
//     comments: true
//   }
// }>

const Toparticle = async () => {
  // 2. Fetch data from Prisma
  const articles = await prisma.articles.findMany({
    orderBy: { createdAt: 'desc' },
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
  })

  return (
    <section className="py-20 min-h-max bg-blue-50 dark:bg-gray-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-14">
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white capitalize">
            Featured articles
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            Discover insights, stories, and ideas that spark curiosity and inspire change...
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 rounded-t-lg">
          {articles.slice(0, 3).map((article) => (
            <a
              key={article.id}
              href={`/articles/${article.id}`}
              className="flex p-px flex-col bg-slate-50 dark:bg-neutral-900 group border border-gray-200 dark:border-gray-800 rounded-lg transition-all hover:scale-[1.05]"
            >
              <div className="relative w-full aspect-[4/2.8] rounded-[7px] overflow-hidden bg-gray-300 dark:bg-gray-700">
                <Image
                  src={article.featuredImage}
                  alt="article image"
                  fill
                  className="object-cover rounded-[7px]"
                />
              </div>
              <div className="flex flex-col p-5 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={article.author.imageUrl || ''} />
                    <AvatarFallback>
                      {article.author.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{article.author.name}</span>
                </div>

                <h2 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  {article.title}
                </h2>

                <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                  {article.category}
                </p>

                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <span>{new Date(article.createdAt).toDateString()}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Button for navigating to full blog list (Client Component) */}
      <ViewAllArticlesButton />
    </section>
  )
}

export default Toparticle
