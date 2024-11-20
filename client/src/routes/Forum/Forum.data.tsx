import { LoaderFunction } from "react-router";
import { number, object, safeParse, string } from "valibot";
import apiClient from "../../api";
import { logger } from "../../utils";
import { forumSchema } from "./Forum.schema";

export const forumLoader = (async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const per_page = Number(url.searchParams.get("per_page")) || 10;

    try {
        const response = await apiClient.get("/forum-questions/", {
            params: { page, per_page },
        });

        const { output, success } = safeParse(forumSchema, response.data);

        if (!success) {
            throw new Error("Failed to parse forum response");
        }

        return output;
    } catch (error) {
        logger.error("Error fetching forum data", error);
        throw new Error("Failed to load forum questions");
    }
}) satisfies LoaderFunction;

const forumUpvoteSchema = object({
    id: number(),
    user: number(),
    forum_question: number(),
    created_at: string(), // ISO date string
});

const forumDownvoteSchema = object({
    id: number(),
    user: number(),
    forum_question: number(),
    created_at: string(), // ISO date string
});

export const upvoteForumAction = async ({ request }: { request: Request }) => {
    try {
        console.log("Processing upvote action...");

        // Parse form data
        const formData = await request.formData();
        const forumQuestionId = formData.get("post_id");
        const currentUpvote = formData.get("is_upvoted");

        // Validate required fields
        if (!forumQuestionId || currentUpvote === null) {
            throw new Error(
                "Missing forumQuestionId or isCurrentlyUpvoted in form data",
            );
        }

        let response;

        if (currentUpvote === "0") {
            // Perform POST request to create upvote
            response = await apiClient.post("/forum-upvote/", {
                forum_question: Number(forumQuestionId),
            });

            const { output, issues, success } = safeParse(
                forumUpvoteSchema,
                response.data,
            );

            if (!success) {
                logger.error("Response validation failed", issues);
                throw new Error("Invalid response from upvote creation");
            }

            return output;
        } else {
            response = await apiClient.delete(
                `/forum-upvote/${currentUpvote}/`,
            );
        }

        return null;
    } catch (error) {
        logger.error("Error in upvoteForumAction", error);
        throw new Error("Failed to process upvote action");
    }
};

export const downvoteForumAction = async ({
    request,
}: {
    request: Request;
}) => {
    try {
        console.log("Processing downvote action...");

        // Parse form data
        const formData = await request.formData();
        const forumQuestionId = formData.get("post_id");
        const currentDownvote = formData.get("is_downvoted");

        // Validate required fields
        if (!forumQuestionId || currentDownvote === null) {
            throw new Error(
                "Missing forumQuestionId or isCurrentlyDownvoted in form data",
            );
        }

        let response;

        if (currentDownvote === "0") {
            // Perform POST request to create downvote
            response = await apiClient.post("/forum-downvote/", {
                forum_question: Number(forumQuestionId),
            });

            const { output, issues, success } = safeParse(
                forumDownvoteSchema,
                response.data,
            );

            if (!success) {
                logger.error("Response validation failed", issues);
                throw new Error("Invalid response from downvote creation");
            }

            return output;
        } else {
            response = await apiClient.delete(
                `/forum-downvote/${currentDownvote}/`,
            );
        }

        return null;
    } catch (error) {
        logger.error("Error in downvoteForumAction", error);
        throw new Error("Failed to process downvote action");
    }
};

const forumBookmarkSchema = object({
    id: number(),
    user: number(),
    forum_question: number(),
    created_at: string(), // ISO date string
});

export const bookmarkForumAction = async ({
    request,
}: {
    request: Request;
}) => {
    try {
        console.log("Processing bookmark action...");

        // Parse form data
        const formData = await request.formData();
        const forumQuestionId = formData.get("post_id");
        const currentBookmark = formData.get("is_bookmarked");

        // Validate required fields
        if (!forumQuestionId || currentBookmark === null) {
            throw new Error(
                "Missing forumQuestionId or isCurrentlyBookmarked in form data",
            );
        }

        let response;

        if (currentBookmark === "0") {
            // Perform POST request to create bookmark
            response = await apiClient.post("/forum-bookmarks/", {
                forum_question: Number(forumQuestionId),
            });

            const { issues, success } = safeParse(
                forumBookmarkSchema,
                response.data,
            );

            if (!success) {
                logger.error("Response validation failed", issues);
                throw new Error("Invalid response from bookmark creation");
            }
        } else {
            // Perform DELETE request to delete bookmark
            response = await apiClient.delete(
                `/forum-bookmarks/${currentBookmark}/`,
            );
        }
        return null;
    } catch (error) {
        logger.error("Error in bookmarkForumAction", error);
        throw new Error("Failed to process bookmark action");
    }
};
