import {
    array,
    boolean,
    InferInput,
    literal,
    nullable,
    number,
    object,
    optional,
    string,
    union,
} from "valibot";

export type Answer = InferInput<typeof answerSchema>;

const Tagschema = object({
    id: string(),
    name: string(),
});
export type ForumResponse = InferInput<typeof forumResponseSchema>;

export const postOverviewSchema = object({
    id: string(),
    title: string(),
    description: string(),
    author: object({
        full_name: string(),
        username: string(),
        avatar: string(),
    }),
    created_at: string(),
    tags: array(Tagschema),
    num_comments: number(),
    num_likes: number(),
    num_dislikes: number(),
    userVote: optional(
        nullable(union([literal("upvote"), literal("downvote")])),
    ),
    bookmark: boolean(),
});

export const answerSchema = object({
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
    userVote: optional(
        nullable(union([literal("upvote"), literal("downvote")])),
    ),
});
export const postDetailsSchema = object({
    post: postOverviewSchema,
    answers: array(answerSchema),
});
export const forumResponseSchema = object({
    posts: array(postOverviewSchema),
});
export type PostOverview = InferInput<typeof postOverviewSchema>;
export type PostDetails = InferInput<typeof postDetailsSchema>;
export type Tag = InferInput<typeof Tagschema>;
