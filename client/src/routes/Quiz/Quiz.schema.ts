import {
    array,
    boolean,
    InferInput,
    nullable,
    number,
    object,
    string,
} from "valibot";

const quizTagSchema = object({
    name: string(),
    linked_data_id: string(),
    description: string(),
});

export type QuizTag = InferInput<typeof quizTagSchema>;

// const difficultySchema = union([
//     literal("easy"),
//     literal("medium"),
//     literal("hard"),
// ]);

const ratingSchema = object({
    score: nullable(number()),
    count: number(),
});

export const quizQuestionSchema = object({
    id: number(),
    question_text: string(),
    choices: array(
        object({
            id: number(),
            is_correct: boolean(),
            choice_text: string(),
        }),
    ),
    hints: array(
        object({
            id: number(),
            text: string(),
            type: string(),
        }),
    ),
});

export type QuizQuestion = InferInput<typeof quizQuestionSchema>;

export const questionsSchema = array(quizQuestionSchema);
export const quizOverviewSchema = object({
    id: number(),
    title: string(),
    description: string(),
    author: object({
        full_name: string(),
        username: string(),
        avatar: string(),
        id: number(),
        email: string(),
    }),
    created_at: string(),
    tags: array(quizTagSchema),
    type: number(),
    num_taken: number(),
    is_my_quiz: boolean(),
    is_taken: boolean(),
    questions: questionsSchema,
    //question_count: nullable(number()),
    rating: ratingSchema,
    difficulty: number(),
});

export const quizDetailsSchema = object({
    ...quizOverviewSchema.entries,
    questions: questionsSchema,
});

export type QuizOverview = InferInput<typeof quizOverviewSchema>;
export type QuizDetails = InferInput<typeof quizDetailsSchema>;
