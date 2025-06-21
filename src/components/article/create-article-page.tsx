"use client"
import CreateArticle from '../../actions/create-article'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import dynamic from 'next/dynamic'
import { FormEvent, startTransition, useActionState, useState } from 'react'
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false
})

const CreateArticlePage = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [formState, action, isPending] = useActionState(CreateArticle, {
    errors: {}
  })


const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("content", content);

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <Card>
        <CardHeader>
          <CardTitle>Create new article</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* Title */}
            <div className='space-y-2'>
              <Label htmlFor="title">Title</Label>
              <Input
                type='text'
                id="title"
                name='title'
                placeholder='Title of the article'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {formState.errors.title && (
                <span className='text-red-600 text-sm'>{formState.errors.title}</span>
              )}
            </div>

            {/* Category */}
            <div className='space-y-2'>
              <Label htmlFor="category">Category</Label>
              <select id='category' name='category' className="flex h-10 w-full rounded-md">
                <option className="text-black" value="">Select a category</option>
                <option value="Technology" className="text-black">Technology</option>
                <option value="WebDevelopment" className="text-black">WebDevelopment</option>
                <option value="Lifestyles" className="text-black">Lifestyles</option>
                <option value="architecture" className="text-black">Architecture</option>
                <option value="Design" className="text-black">Design</option>
                <option value="Business" className="text-black">Business</option>
                <option value="Health" className="text-black">Health</option>
                <option value="Education" className="text-black">Education</option>
                <option value="Travel" className="text-black">Travel</option>
                <option value="Food" className="text-black">Food</option>
                <option value="Entertainment" className="text-black">Entertainment</option>
                <option value="Finance" className="text-black">Finance</option>
                <option value="Sports" className="text-black">Sports</option>
                <option value="Science" className="text-black">Science</option>
                <option value="Politics" className="text-black">Politics</option>
                <option value="Environment" className="text-black">Environment</option>
              </select>
              {formState.errors.category && (
                <span className='text-red-600 text-sm'>{formState.errors.category}</span>
              )}
            </div>

            {/* Featured Image */}
            <div className='space-y-2'>
              <Label htmlFor="featuredImage">Featured Image</Label>
              <Input
                type='file'
                id="featuredImage"
                name="featuredImage"
                accept="image/*"
                className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />
            </div>

            {/* Content */}
            <div className='space-y-2'>
              <Label>Content</Label>
              <ReactQuill className="border-0" theme='snow' value={content} onChange={setContent} />              
               {formState.errors.content && (
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.content[0]}
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className='flex justify-end gap-4'>
              <button
                disabled={isPending}
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
              >
                {isPending ? 'Loading...' : 'Publish'}
              </button>
              <button
                type='button'
                onClick={() => {
                  setTitle("")
                  setContent("")
                }}
                className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600'
              >
                Cancel
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateArticlePage


// "use client";
// import { FormEvent, startTransition, useActionState, useState } from "react";
// import "react-quill-new/dist/quill.snow.css";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import "react-quill-new/dist/quill.snow.css";
// import { createArticles } from "@/actions/create-article";
// import dynamic from "next/dynamic";
// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
 
// export function CreateArticlePage() {
//   const [content, setContent] = useState("");

//   const [formState, action, isPending] = useActionState(createArticles, {
//     errors: {},
//   });
 

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const formData = new FormData(event.currentTarget);
//     formData.append("content", content);

//     // Wrap the action call in startTransition
//     startTransition(() => {
//       action(formData);
//     });
//   };
 
//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-2xl">Create New Article</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="title">Article Title</Label>
//               <Input
//                 id="title"
//                 name="title"
//                 placeholder="Enter article title"
//               />
//               {formState.errors.title && (
//                 <span className="font-medium text-sm text-red-500">
//                   {formState.errors.title}
//                 </span>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="category">Category</Label>
//               <select
//                 id="category"
//                 name="category"
//                 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//               >
//                 <option value="">Select Category</option>
//                 <option value="technology">Technology</option>
//                 <option value="programming">Programming</option>
//                 <option value="web-development">Web Development</option>
//               </select>
//               {formState.errors.category && (
//                 <span className="font-medium text-sm text-red-500">
//                   {formState.errors.category}
//                 </span>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="featuredImage">Featured Image</Label>
//               <Input
//                 id="featuredImage"
//                 name="featuredImage"
//                 type="file"
//                 accept="image/*"
//               />
//               {formState.errors.featuredImage && (
//                 <span className="font-medium text-sm text-red-500">
//                   {formState.errors.featuredImage}
//                 </span>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label>Content</Label>
//               <ReactQuill
//                 theme="snow"
//                 value={content}
//                 onChange={setContent} 
//               />
//               {formState.errors.content && (
//                 <span className="font-medium text-sm text-red-500">
//                   {formState.errors.content[0]}
//                 </span>
//               )}
//             </div>
//             {formState.errors.formErrors && (
//               <div className="dark:bg-transparent bg-red-100 p-2 border border-red-600">
//                 <span className="font-medium text-sm text-red-500">
//                   {formState.errors.formErrors}
//                 </span>
//               </div>
//             )}
//             <div className="flex justify-end gap-4">
//               <Button type="button" variant="outline">
//                 Cancel
//               </Button>
//               <Button disabled={isPending} type="submit">
//                 {isPending ? "Loading..." : "Publish Article"}
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }