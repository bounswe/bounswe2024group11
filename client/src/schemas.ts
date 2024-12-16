import { InferInput, nullable, number, object, string } from "valibot";

export const userSchema = object({
    full_name: string(),
    username: string(),
    email: string(),
});

export const authorSchema = object({
    id: number(),
    full_name: string(),
    username: string(),
    avatar: nullable(string()),
    email: string(),
    is_followed: nullable(number()),
    is_blocked: nullable(number()),
});

export type User = InferInput<typeof userSchema>;
