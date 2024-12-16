import { array, InferInput, nullable, number, object, string } from "valibot";
import { UserAchievement } from "../Achievements/Achievement.schema";
import { forumQuestionSchema } from "../Forum/Forum.schema";
import { quizDetailsSchema } from "../Quiz/Quiz.schema";

const InterestTag = object({
    id: number(),
    name: string(),
    linked_dat_id: string(),
    description: string(),
});

const blockingsSchema = object({
    id: number(),
    username: string(),
    email: string(),
    full_name: string(),
    avatar: string(),
    is_followed: nullable(number()),
    is_blocked: nullable(number()),
});
export const profileSchema = object({
    id: number(),
    full_name: string(),
    avatar: string(),
    quizzes_taken: array(quizDetailsSchema),
    bookmarked_forums: array(forumQuestionSchema),
    score: number(),
    achievements: UserAchievement,
    interests: array(InterestTag),
    is_following: nullable(number()),
    is_blocked: nullable(number()),
    // followings: string(),
    // followers: string(),
    blockings: array(blockingsSchema),
});

export const blockSchema = object({
    id: number(),
    blocker: number(),
    blocking: number(),
    created_at: string(),
});

export const followSchema = object({
    id: number(),
    follower: number(),
    following: number(),
    created_at: string(),
});

export type Blockings = InferInput<typeof blockingsSchema>;
