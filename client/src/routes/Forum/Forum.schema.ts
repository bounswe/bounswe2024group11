import {
    array,
    boolean,
    InferInput,
    nullable,
    number,
    object,
    string,
} from "valibot";

export type Answer = InferInput<typeof answerSchema>;

const Tagschema = object({
    name: string(),
    linked_data_id: string(),
    description: string(),
});
export type ForumResponse = InferInput<typeof forumSchema>;

export const authorSchema = object({
    id: number(),
    full_name: string(),
    username: string(),
    avatar: nullable(string()),
    email: string(),
});

export const answerSchema = object({
    id: string(),
    answer: string(),
    author: authorSchema,
    created_at: string(),
    is_upvoted: nullable(boolean()),
    is_downvoted: nullable(number()),
    upvotes_count: nullable(number()),
    downvotes_count: nullable(number()),
});

export const forumQuestionSchema = object({
    id: number(),
    title: string(),
    question: string(),
    tags: array(Tagschema),
    author: authorSchema,
    created_at: string(),
    answers_count: number(),
    is_bookmarked: boolean(),
    is_upvoted: boolean(),
    is_downvoted: boolean(),
    upvotes_count: number(),
    downvotes_count: number(),
    answers: array(answerSchema),
});

export const forumSchema = object({
    count: number(),
    next: nullable(string()),
    previous: nullable(string()),
    results: array(forumQuestionSchema),
});

export type Tag = InferInput<typeof Tagschema>;
export type ForumQuestion = InferInput<typeof forumQuestionSchema>;
