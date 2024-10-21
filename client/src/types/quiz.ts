import {
    array,
    boolean,
    InferInput,
    literal,
    number,
    object,
    optional,
    string,
    union,
} from "valibot";

// const quizSchema = object({
//     id: string(),
//     title: string(),
//     description: string(),
//     author: object({
//         full_name: string(),
//         username: string(),
//         avatar: string(),
//     }),
//     created_at: string(),
//     tags: array(
//         object({
//             id: string(),
//             name: string(),
//         }),
//     ),
//     type: number(),
//     num_taken: number(),
//     is_taken: boolean(),
//     question_count: number(),
//     difficulty: string(),
//     rating: object({
//         score: number(),
//         count: number(),
//     }),
// });

export const quizAuthorSchema = object({
    full_name: string(),
    username: string(),
    avatar: string(),
});

const quizTagSchema = object({
    id: string(),
    name: string(),
    description: optional(string()),
});

const difficultySchema = union([
    literal("easy"),
    literal("medium"),
    literal("hard"),
]);

const ratingSchema = object({
    score: number(),
    count: number(),
});

export const quizOverviewSchema = object({
    id: string(),
    type: union([literal(1), literal(2), literal(3)]),
    title: string(),
    description: string(),
    author: quizAuthorSchema,
    created_at: string(),
    tags: array(quizTagSchema),
    num_taken: number(),
    is_taken: boolean(),
    question_count: number(),
    difficulty: difficultySchema,
    rating: ratingSchema,
});

export type QuizOverview = InferInput<typeof quizOverviewSchema>;
