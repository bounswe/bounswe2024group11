import {
    array,
    boolean,
    InferInput,
    nullable,
    number,
    object,
    optional,
    string,
} from "valibot";

const quizTagSchema = object({
    name: string(),
    linked_data_id: string(),
    description: string(),
});

export type QuizTag = InferInput<typeof quizTagSchema>;

const ratingSchema = object({
    score: nullable(number()),
    count: number(),
});

const myAnswersSchema = object({
    id: number(),
    question: number(),
    take_quiz: number(),
    answer: number(),
    is_hint_used: boolean(),
});

const myAnswersEntitySchema = object({
    id: number(),
    quiz: number(),
    user: number(),
    date: string(),
    answers: array(myAnswersSchema),
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
    hints: nullable(
        array(
            object({
                id: number(),
                text: string(),
                type: string(),
            }),
        ),
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
    rating: ratingSchema,
    difficulty: number(),
    my_last_answers: nullable(myAnswersEntitySchema),
});

export const quizAnswerSchema = object({
    question: number(),
    answer: number(),
    is_hint_used: boolean(),
});

export const quizAnswersSchema = array(quizAnswerSchema);

export type QuizAnswer = InferInput<typeof quizAnswerSchema>;

export const completedQuizSchema = object({
    quiz: number(),
    answers: quizAnswersSchema,
});

export const quizDetailsSchema = object({
    ...quizOverviewSchema.entries,
    questions: questionsSchema,
});

export const choiceSchema = object({
    id: string(),
    choice_text: string(),
    is_correct: boolean(),
});

export const quizQuestionCreateSchema = object({
    id: string(),
    question_tag: nullable(quizTagSchema),
    question_text: string(),
    question_point: optional(number()),
    choices: array(
        object({
            id: string(),
            choice_text: string(),
            is_correct: boolean(),
        }),
    ),
    hints: optional(
        array(
            object({
                type: string(),
                text: string(),
            }),
        ),
    ),
});

export const quizCreateSchema = object({
    title: string(),
    description: string(),
    tags: array(quizTagSchema),
    type: number(),
    questions: array(quizQuestionCreateSchema),
});

// eXtremeGoHorse begin
const quizAnswerSchemaForProfile = object({
    id: number(),
    take_quiz: number(),
    question: number(),
    answer: number(),
    is_hint_used: boolean(),
});
export const quizzeTakenSchemaForProfile = object({
    id: number(),
    quiz: number(),
    user: number(),
    date: string(),
    answers: array(quizAnswerSchemaForProfile),
    score: number(),
    correct_answer_count: number(),
    wrong_answer_count: number(),
    empty_answer_count: number(),
});
// eXtremeGoHorse end
export type CompletedQuiz = InferInput<typeof completedQuizSchema>;
export type QuizOverview = InferInput<typeof quizOverviewSchema>;
export type QuizDetails = InferInput<typeof quizDetailsSchema>;
export type QuizCreate = InferInput<typeof quizCreateSchema>;
export type QuizQuestionCreate = InferInput<typeof quizQuestionCreateSchema>;
export type Choice = InferInput<typeof choiceSchema>;
