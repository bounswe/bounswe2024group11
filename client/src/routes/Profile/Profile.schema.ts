import { array, number, object, string } from "valibot";
import { UserAchievement } from "../Achievements/Achievement.schema";
import { forumQuestionSchema } from "../Forum/Forum.schema";
import { quizzeTakenSchemaForProfile } from "../Quiz/Quiz.schema";

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
    quizzes_taken: array(quizzeTakenSchemaForProfile),
    bookmarked_forums: array(forumQuestionSchema),
    score: number(),
    achievements: UserAchievement,
    interests: array(InterestTag),
    // followings: string(),
    // followers: string(),
    // blockings: string(),
});
