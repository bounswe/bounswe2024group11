import { InferInput, literal, object, string, union } from "valibot";

const quizSchema1 = object({
    id: string(),
    type: literal(1),
});

const quizSchema2 = object({
    id: string(),
    type: literal(2),
});

const quizSchema3 = object({
    id: string(),
    type: literal(3),
});

export const quizSchema = union([quizSchema1, quizSchema2, quizSchema3]);

export type Quiz = InferInput<typeof quizSchema>;
