import { array, nullable, number, object, string } from "valibot";

export const leaderboardSchema = array(
    object({
        score: number(),
        user_info: object({
            id: number(),
            username: string(),
            email: string(),
            full_name: string(),
            avatar: string(),
            is_followed: nullable(string()),
            is_blocked: nullable(string()),
        }),
    }),
);
