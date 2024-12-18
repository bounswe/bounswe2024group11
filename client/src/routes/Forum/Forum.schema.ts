import {
    array,
    boolean,
    InferInput,
    nullable,
    number,
    object,
    string,
    undefinedable,
} from "valibot";
import { authorSchema } from "../../schemas";
import { quizQuestionSchema } from "../Quiz/Quiz.schema";

export type Answer = InferInput<typeof answerSchema>;

export const tagSchema = object({
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
const innerForumQuestionSchema = object({
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
    quiz_question: nullable(quizQuestionSchema),
    quiz_question_type: nullable(number()),
    image_url: nullable(string()),
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
    quiz_question: nullable(quizQuestionSchema),
    quiz_question_type: nullable(number()),
    image_url: nullable(string()),
    related_forum_questions: nullable(array(innerForumQuestionSchema)),
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

const wordSchema = object({
    id: string(),
    description: string(),
});

export type Word = InferInput<typeof wordSchema>;

export const dictionarySchema = object({
    NOUN: undefinedable(array(wordSchema)),
    VERB: undefinedable(array(wordSchema)),
    ADJ: undefinedable(array(wordSchema)),
    ADV: undefinedable(array(wordSchema)),
});
