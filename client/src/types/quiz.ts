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

export const authorSchema = object({
    id: number(),
    full_name: string(),
    username: string(),
    avatar: nullable(string()),
    email: string(),
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
    author: authorSchema,
    created_at: string(),
    tags: array(quizTagSchema),
    num_taken: number(),
    is_taken: boolean(),
    question_count: number(),
    difficulty: difficultySchema,
    rating: ratingSchema,
});

export const questionsSchema = array(
    object({
        id: string(),
        text: string(),
        options: array(
            object({
                id: string(),
                text: string(),
                is_correct: string(),
            }),
        ),
        selected_option_id: string(),
    }),
);

export const quizDetailsSchema = object({
    ...quizOverviewSchema.entries,
    questions: questionsSchema,
});

export type QuizOverview = InferInput<typeof quizOverviewSchema>;
export type QuizDetails = InferInput<typeof quizDetailsSchema>;
