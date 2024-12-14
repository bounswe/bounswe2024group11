import { array, nullable, number, object, string } from "valibot";
import { UserAchievement } from "../Achievements/Achievement.schema";
import { forumQuestionSchema } from "../Forum/Forum.schema";
import { quizSchema } from "../Quiz/Quiz.schema";

const InterestTag = object({
    id: number(),
    name: string(),
    linked_dat_id: string(),
    description: string(),
});
export const profileSchema = object({
    id: number(),
    full_name: string(),
    avatar: string(),
    quizzes_taken: array(quizSchema),
    bookmarked_forums: array(forumQuestionSchema),
    score: number(),
    achievements: UserAchievement,
    interests: array(InterestTag),
    is_following: nullable(number()),
    is_blocked: nullable(number()),
    // followings: string(),
    // followers: string(),
    // blockings: string(),
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
