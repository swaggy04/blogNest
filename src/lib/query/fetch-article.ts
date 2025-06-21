// import { prisma } from "../prisma"


// const fetchArticleByQuery = (searchText: string) => {
//   return prisma.articles.findMany({
//     where:{
//         OR:[
//             {title:{contains: "searchText", mode: "insensitive"}},
//             {category:{contains: "searchText", mode: "insensitive"}},
//         ]
//     },
//     include: {
//         author: {
//             select: {
//                 name: true,
//                 email: true,
//                 imageUrl: true
//             }
//         }
//     }

//   })
   
 
// }

// export default fetchArticleByQuery
//  above can also be used but below one is updated with tweeks 

import { prisma } from "@/lib/prisma";

export const fetchArticleByQuery = async (searchText: string, skip: number, take: number) => {
  const [articles, total] = await prisma.$transaction([  //////1) i have to learn transaction once again 
    prisma.articles.findMany({
      where: {
        OR: [
          { title: { contains: searchText, mode: 'insensitive' } },
          { category: { contains: searchText, mode: 'insensitive' } },
        ],
      },
      include: {
        author: {
          select: { name: true, imageUrl: true, email: true },
        },
      },
       orderBy: {
    createdAt: "desc", //  newest articles first
  },
      skip: skip,
      take: take,
    }),
    prisma.articles.count({
      where: {
        OR: [
          { title: { contains: searchText, mode: 'insensitive' } },
          { category: { contains: searchText, mode: 'insensitive' } },
        ],
      },
    }),
  ]);

  return { articles, total };
};