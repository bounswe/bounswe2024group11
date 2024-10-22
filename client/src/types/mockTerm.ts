import { InferInput, object, string } from "valibot";

// Define the schema for each term
export const termSchema = object({
    en: string(), // English term
    tr: string(), // Turkish term
    sense: string(), // Description or sense
});

export type Term = InferInput<typeof termSchema>;
