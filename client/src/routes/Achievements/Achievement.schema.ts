import { array, InferInput, nullable, number, object, string } from "valibot";

// export const achievementSchema = object({
//     title: string(),
//     description: string(),
//     category: string(),
//     slug: string(),
// });
const achievementSchema = object({
    id: number(),
    title: string(),
    slug: string(),
    description: string(),
    created_at: string(),
    category: string(),
});
export const UserAchievement = array(
    object({
        earned_at: nullable(string()),
        achievement: achievementSchema,
    }),
);
export type Achievement = InferInput<typeof achievementSchema>;
