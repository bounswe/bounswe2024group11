import { LoaderFunction } from "react-router";
import { defer } from "react-router-typesafe";
import { safeParse } from "valibot";
import apiClient from "../../api";
import { logger } from "../../utils";
import { UserAchievement } from "./Achievement.schema";

const achievements = [
    {
        title: "First Quiz",
        slug: "first-quiz",
        description: "Complete your first quiz",
        category: "first_steps",
    },
    {
        title: "First Question",
        slug: "first-question",
        description: "Create your first forum question",
        category: "first_steps",
    },
    {
        title: "First Answer",
        slug: "first-answer",
        description: "Leave your first forum answer",
        category: "first_steps",
    },
    {
        title: "First Follow",
        slug: "first-follow",
        description: "Follow your first user",
        category: "first_steps",
    },
    {
        title: "First Bookmark",
        slug: "first-bookmark",
        description: "Bookmark your first forum question",
        category: "first_steps",
    },
    {
        title: "Quiz Creator",
        slug: "quiz-creator",
        description: "Create your first quiz",
        category: "first_steps",
    },

    {
        title: "Quiz Fan",
        slug: "quiz-fan",
        description: "Take 10 quizzes",
        category: "growing_engagement",
    },
    {
        title: "Quiz Champion",
        slug: "quiz-champion",
        description: "Take 25 quizzes",
        category: "growing_engagement",
    },
    {
        title: "Perfect Scorer",
        slug: "perfect-scorer",
        description: "Take 5 quizzes with 100% score",
        category: "growing_engagement",
    },

    {
        title: "Quiz Expert",
        slug: "quiz-expert",
        description: "Create 10 quizzes",
        category: "quiz_creation",
    },
    {
        title: "Popular Teacher",
        slug: "popular-teacher",
        description: "Have your quizzes taken 10 times",
        category: "quiz_creation",
    },

    {
        title: "Active Questioner",
        slug: "active-questioner",
        description: "Create 10 forum questions",
        category: "forum_mastery",
    },
    {
        title: "Question Expert",
        slug: "question-expert",
        description: "Create 25 forum questions",
        category: "forum_mastery",
    },
    {
        title: "Helpful Member",
        slug: "helpful-member",
        description: "Get 10 upvotes on an answer",
        category: "forum_mastery",
    },
    {
        title: "Answer Guru",
        slug: "answer-guru",
        description: "Get 100 upvotes on an answer",
        category: "forum_mastery",
    },
    {
        title: "Save Expert",
        slug: "save-expert",
        description: "Bookmark 10 forum questions",
        category: "forum_mastery",
    },

    {
        title: "New Friend",
        slug: "new-friend",
        description: "Get 10 followers",
        category: "community",
    },
    {
        title: "Rising Star",
        slug: "rising-star",
        description: "Get 50 followers",
        category: "community",
    },
    {
        title: "Community Builder",
        slug: "community-builder",
        description: "Follow 10 people",
        category: "community",
    },

    {
        title: "Getting Started",
        slug: "getting-started",
        description: "Select your first 3 interests",
        category: "interests",
    },
    {
        title: "Diverse Learner",
        slug: "diverse-learner",
        description: "Select 10 different interests",
        category: "interests",
    },
];

export const achievementsLoader = (async () => {
    const achievementsPromise = apiClient
        .get(`/achievements/`)
        .then((response) => {
            logger.log(response.data);
            const { output, success, issues } = safeParse(
                UserAchievement,
                response.data,
            );
            if (!success) {
                throw new Error("Failed to parse achievement response");
            }
            logger.log(output);
            return output.map((achievement) => {
                const item = achievements.find(
                    (userAchievement) =>
                        achievement.achievement.slug === userAchievement.slug,
                ) || {
                    title: "Diverse Learner",
                    slug: "diverse-learner",
                    description: "Select 10 different interests",
                    category: "interests",
                };
                return {
                    item: {
                        ...item,
                        created_at: "",
                        id: 1,
                    },
                    is_earned: achievement.earned_at !== null,
                };
            });
        })
        .catch((error) => {
            throw new Error(`Failed to load achievements: ${error}`);
        });

    return defer({
        achievementsData: achievementsPromise,
    });
}) satisfies LoaderFunction;
