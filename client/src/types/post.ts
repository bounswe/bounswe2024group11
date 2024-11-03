import { array, InferInput, number, object, string } from "valibot";

export type Answer = InferInput<typeof answerSchema>;

const postOverviewSchema = object({
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

const answerSchema = object({
    id: string(),
    text: string(),
    author: object({
        full_name: string(),
        username: string(),
        avatar: string(),
    }),
    created_at: string(),
    num_likes: number(),
    num_dislikes: number(),
});
export const postDetailsSchema = object({
    post: postOverviewSchema,
    answers: array(answerSchema),
});

export type PostOverview = InferInput<typeof postOverviewSchema>;
export type PostDetails = InferInput<typeof postDetailsSchema>;
