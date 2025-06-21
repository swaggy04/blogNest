import Editarticle from '@/components/article/Edit-article'
import { prisma } from '@/lib/prisma';



type Editarticleparams ={
    params: { id: string }
 }


const page = async ({ params }: Editarticleparams) => {  
    const { id } = params;
    const article = await prisma.articles.findUnique({
        where: {
            id: id,
        },
    });


    if (!article){
        return <div>Article not found{id}</div>
    }
  return (
    <div><Editarticle article={article}/></div>
  )
}

export default page