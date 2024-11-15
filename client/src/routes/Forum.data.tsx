import { LoaderFunction } from "react-router";
import { redirect } from "react-router-typesafe";
import { array, InferInput, number, object, safeParse, string } from "valibot";
import { postDetailsSchema } from "../types/post";
import { BASE_URL, logger } from "../utils";

export type Post = InferInput<typeof postSchema>;

const postSchema = object({
    id: string(),
    title: string(),
    description: string(),
    author: object({
        full_name: string(),
        username: string(),
        avatar: string(),
    }),
    created_at: string(),
    tags: array(
        object({
            id: string(),
            name: string(),
        }),
    ),
    num_comments: number(),
    num_likes: number(),
    num_dislikes: number(),
});

const forumResponseSchema = object({
    posts: array(postSchema),
});

export const forumLoader = (async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const per_page = Number(url.searchParams.get("per_page")) || 10;
    const res = await fetch(
        `${BASE_URL}/forum/?page=${page}&per_page=${per_page}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
    const data = await res.json();
    const { output, issues, success } = safeParse(forumResponseSchema, data);
    if (!success) {
        throw new Error(`Failed to parse quizzes response: ${issues}`);
    }
    return output;
}) satisfies LoaderFunction;

export const createPostAction = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const res = await fetch(`${BASE_URL}/forum`, {
        method: "POST",
        body: formData,
    });
    if (!res.ok) {
        throw new Error(`Failed to create post`);
    }

    const data = await res.json();
    const { output, issues, success } = safeParse(postDetailsSchema, data);
    if (!success) {
        logger.log(data);
        throw new Error(`Failed to create post: ${issues}`);
    }
    return redirect("/forum");
};
