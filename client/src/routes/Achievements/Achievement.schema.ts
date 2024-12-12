import { InferInput, object, string } from "valibot";

export const achievementSchema = object({
    title: string(),
    description: string(),
    category: string(),
    slug: string(),
});

export type Achievement = InferInput<typeof achievementSchema>;
