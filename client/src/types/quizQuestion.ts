import { array, InferInput, object, string, union } from "valibot";
import { termSchema } from "./mockTerm";

const quizQuestionOptions = object({
    id: string(),
    text: string(),
    is_correct: string(),
});

const quizQuestion = object({
    id: string(),
    text: string(),
    options: array(quizQuestionOptions),
    selected_option_id: string(),
});

export const shuffleArray = union([
    quizQuestion,
    quizQuestionOptions,
    termSchema,
]);

export type ShuffleArray = InferInput<typeof shuffleArray>;
export type Options = InferInput<typeof quizQuestionOptions>;
