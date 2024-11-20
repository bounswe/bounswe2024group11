import { ActionFunction, LoaderFunction } from "react-router";
import { safeParse } from "valibot";
import apiClient from "../../api";
import { USER } from "../../constants";
import { useToastStore } from "../../store";
import { logger } from "../../utils";
import {
    forumAnswerSchema,
    forumBookmarkSchema,
    forumDownvoteSchema,
    forumSchema,
    forumUpvoteSchema,
} from "./Forum.schema";

export const forumLoader = (async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const per_page = Number(url.searchParams.get("per_page")) || 10;

    try {
        const response = await apiClient.get("/forum-questions/", {
            params: { page, per_page },
        });

        const { output, success, issues } = safeParse(
            forumSchema,
            response.data,
        );
        console.log(issues);
        console.log(output);
        if (!success) {
            throw new Error("Failed to parse forum response");
        }

        return output;
    } catch (error) {
        logger.error("Error fetching forum data", error);
        throw new Error("Failed to load forum questions");
    }
}) satisfies LoaderFunction;

export const upvoteForumAction = (async ({ request }: { request: Request }) => {
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
}) satisfies ActionFunction;

export const downvoteForumAction = (async ({
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
}) satisfies ActionFunction;

export const bookmarkForumAction = (async ({
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
}) satisfies ActionFunction;

export const answerForumAction = (async ({ request, params }) => {
    // if not logged in, redirect to login page and add a toast

    const user = sessionStorage.getObject(USER) || localStorage.getObject(USER);
    if (!user) {
        useToastStore.getState().add({
            id: "not-logged-in",
            type: "info",
            data: {
                message: "Log in to answer forum question",
                description: "You need to log in to answer forum questions.",
            },
        });
    }

    const formData = await request.formData();
    const answer = formData.get("answer");
    const questionId = params.questionId;

    try {
        const response = await apiClient.post(
            `forum-questions/${questionId}/answers/`,
            {
                answer,
            },
        );

        const { issues, success } = safeParse(forumAnswerSchema, response.data);

        if (!success) {
            logger.error("Response validation failed", issues);
            throw new Error("Invalid response from answer creation");
        }

        useToastStore.getState().add({
            id: `answer-success-${postId}`,
            type: "success",
            data: {
                message: "Answer created successfully",
                description: "Your answer has been posted.",
            },
        });

        return response;
    } catch (error) {
        logger.error("Error in answerForumAction", error);
        throw new Error("Failed to process answer action");
    }
}) satisfies ActionFunction;
