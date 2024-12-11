import { number, object, string } from "valibot";

export const profileSchema = object({
    id: number(),
    username: string(),
    first_name: string(),
    last_name: string(),
    email: string(),
});
