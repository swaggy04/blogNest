"use server"
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const CreateArticleSchema = z.object({
    title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
    category: z.string().min(3, { message: 'Category must be at least 3 characters' }),
    content: z.string()
        .min(1, { message: 'Content is required' })
        .refine(val => val.replace(/<(.|\n)*?>/g, '').trim().length > 0, {
            message: 'Content cannot be empty',
        }),
})

type CreateArticleFormState = {
    errors: {
        title?: string[];
        category?: string[];
        featuredImage?: string[];
        content?: string[];
        formErrors?: string[];
    };
};

const editArticle = async (articleId: string, prevState: CreateArticleFormState, formdata: FormData): Promise<CreateArticleFormState> => {

    const result = CreateArticleSchema.safeParse({
        title: formdata.get('title'),
        content: formdata.get('content'),
        category: formdata.get('category')
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }

    }
    const { userId } = await auth()

    if (!userId) {
        return {
            errors: {
                formErrors: ['You must be logged in to create an article.']
            }
        }
    }


    const existingArticle = await prisma.articles.findUnique({
        where: { id: articleId },
    })

    if (!existingArticle) {
        return {
            errors: {
                formErrors: ["Article not found. Please try again."],
            },
        };
    }

    const existingUser = await prisma.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!existingUser) {
        return {
            errors: {
                formErrors: ["User not found. Please register before creating an article."],
            },
        };
    }
    ////image validation

    let imageUrl = existingArticle.featuredImage; // Default to the existing image


    const imageFile = formdata.get("featuredImage") as File | null;
    if (imageFile && imageFile.name !== "undefined") {
        try {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadResult: UploadApiResponse | undefined = await new Promise(
                (resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        { resource_type: "image" },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                    uploadStream.end(buffer);
                }
            );

            if (uploadResult?.secure_url) {
                imageUrl = uploadResult.secure_url;
            } else {
                return {
                    errors: { featuredImage: ["Failed to upload image. Please try again."] },
                };
            }
        } catch (error) {
            if (error instanceof Error) {
                return {
                    errors: {
                        formErrors: [error.message]
                    }
                }
            } else {
                return {
                    errors: { formErrors: ["Error uploading image. Please try again."] },
                };
            }
        }
    }

    try {
        // Update the article with the new data     
        await prisma.articles.update({
            where: { id: articleId },
            data: {
                title: result.data.title,
                category: result.data.category,
                content: result.data.content,
                featuredImage: imageUrl,
            },
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    formErrors: [error.message],
                },
            };
        } else {
            return {
                errors: {
                    formErrors: ["Some internal server error occurred."],
                },
            };
        }
    }

    revalidatePath("/dashboard");
    redirect('/dashboard');
    // Add a return statement after redirect to satisfy the return type
    return { errors: {} };
}

export default editArticle


