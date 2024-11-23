import {
    array,
    boolean,
    InferInput,
    nullable,
    number,
    object,
    string,
} from "valibot";
import { authorSchema } from "../../schemas";

export type Answer = InferInput<typeof answerSchema>;

const tagSchema = object({
    name: string(),
    linked_data_id: string(),
    description: string(),
});
export type ForumResponse = InferInput<typeof forumSchema>;

export const answerSchema = object({
    id: number(),
    answer: string(),
    author: authorSchema,
    created_at: string(),
    is_upvoted: nullable(number()),
    is_downvoted: nullable(number()),
    upvotes_count: nullable(number()),
    downvotes_count: nullable(number()),
    forum_question: nullable(number()),
});

export const forumQuestionSchema = object({
    id: number(),
    title: string(),
    question: string(),
    tags: array(tagSchema),
    author: authorSchema,
    created_at: string(),
    answers_count: number(),
    is_bookmarked: nullable(number()),
    is_upvoted: nullable(number()),
    is_downvoted: nullable(number()),
    upvotes_count: number(),
    downvotes_count: number(),
    answers: array(answerSchema),
    is_my_forum_question: boolean(),
});

export const forumSchema = object({
    count: number(),
    next: nullable(string()),
    previous: nullable(string()),
    results: array(forumQuestionSchema),
});

export const forumBookmarkSchema = object({
    id: number(),
    user: number(),
    forum_question: number(),
    created_at: string(), // ISO date string
});

export const forumUpvoteSchema = object({
    id: number(),
    user: number(),
    forum_question: number(),
    created_at: string(), // ISO date string
});

export const forumDownvoteSchema = object({
    id: number(),
    user: number(),
    forum_question: number(),
    created_at: string(), // ISO date string
});

export const forumAnswerSchema = object({
    answer: string(),
});

export const forumAnswerUpvoteSchema = object({
    id: number(),
    user: number(),
    forum_answer: number(),
    created_at: string(), // ISO date string
});

export const forumAnswerDownvoteSchema = object({
    id: number(),
    user: number(),
    forum_answer: number(),
    created_at: string(), // ISO date string
});

export type Tag = InferInput<typeof tagSchema>;
export type ForumQuestion = InferInput<typeof forumQuestionSchema>;
