import * as v from "valibot";
import { object, string } from "valibot";

export const userSchema = object({
    full_name: string(),
    username: string(),
    email: string(),
});

export type User = v.InferInput<typeof userSchema>;
