import { ActionFunction, LoaderFunction, redirect } from "react-router";
import { safeParse } from "valibot";
import apiClient from "../../api";
import { USER } from "../../constants";
import { useToastStore } from "../../store";
import { logger } from "../../utils";
import {
    forumAnswerDownvoteSchema,
    forumAnswerSchema,
    forumAnswerUpvoteSchema,
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
    // If not logged in, render a warning message and return redirect login.

    const postId = params.postId;
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
        return redirect("/login");
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

export const upvoteForumAnswerAction = (async ({ request }) => {
    console.log("Processing upvote/downvote action...");
    const user = sessionStorage.getObject(USER) || localStorage.getObject(USER);

    if (!user) {
        useToastStore.getState().add({
            id: "not-logged-in",
            type: "info",
            data: {
                message: "Log in to vote",
                description: "You need to log in to vote on answers.",
            },
        });
        return redirect("/login");
    }

    const formData = await request.formData();
    const answerId = formData.get("answer_id");
    const isUpvoted = formData.get("is_upvoted");

    if (!answerId) {
        throw new Error("Answer ID is required to process vote action.");
    }

    try {
        let response;

        if (Number(isUpvoted)) {
            // DELETE request to remove upvote
            response = await apiClient.delete(
                `/forum-answer-upvote/${isUpvoted}/`,
            );

            useToastStore.getState().add({
                id: `upvote-delete-success-${answerId}`,
                type: "info",
                data: {
                    message: "Upvote removed",
                    description: "Your upvote has been removed.",
                },
            });
        } else {
            // POST request to create upvote
            response = await apiClient.post(`/forum-answer-upvote/`, {
                forum_answer: Number(answerId),
            });

            const { issues, success } = safeParse(
                forumAnswerUpvoteSchema,
                response.data,
            );

            if (!success) {
                logger.error("Response validation failed", issues);
                throw new Error("Invalid response from upvote creation.");
            }

            useToastStore.getState().add({
                id: `upvote-success-${answerId}`,
                type: "success",
                data: {
                    message: "Upvote created successfully",
                    description: "Your upvote has been posted.",
                },
            });
        }

        return response;
    } catch (error) {
        logger.error("Error in upvoteForumAnswerAction", error);
        useToastStore.getState().add({
            id: `vote-error-${answerId}`,
            type: "error",
            data: {
                message: "Failed to process vote",
                description: "Something went wrong while processing your vote.",
            },
        });
        throw new Error("Failed to process vote action.");
    }
}) satisfies ActionFunction;

export const downvoteForumAnswerAction = (async ({ request }) => {
    console.log("Processing downvote action...");
    const user = sessionStorage.getObject(USER) || localStorage.getObject(USER);

    if (!user) {
        useToastStore.getState().add({
            id: "not-logged-in",
            type: "info",
            data: {
                message: "Log in to vote",
                description: "You need to log in to vote on answers.",
            },
        });
        return redirect("/login");
    }

    const formData = await request.formData();
    const answerId = formData.get("answer_id");
    const isDownvoted = formData.get("is_downvoted");

    if (!answerId) {
        throw new Error("Answer ID is required to process downvote action.");
    }

    try {
        let response;

        if (Number(isDownvoted)) {
            // DELETE request to remove downvote
            response = await apiClient.delete(
                `/forum-answer-downvote/${isDownvoted}/`,
            );

            useToastStore.getState().add({
                id: `downvote-delete-success-${answerId}`,
                type: "info",
                data: {
                    message: "Downvote removed",
                    description: "Your downvote has been removed.",
                },
            });
        } else {
            // POST request to create downvote
            response = await apiClient.post(`/forum-answer-downvote/`, {
                forum_answer: Number(answerId),
            });

            const { issues, success } = safeParse(
                forumAnswerDownvoteSchema,
                response.data,
            );

            if (!success) {
                logger.error("Response validation failed", issues);
                throw new Error("Invalid response from downvote creation.");
            }

            useToastStore.getState().add({
                id: `downvote-success-${answerId}`,
                type: "success",
                data: {
                    message: "Downvote created successfully",
                    description: "Your downvote has been recorded.",
                },
            });
        }

        return response;
    } catch (error) {
        logger.error("Error in downvoteForumAnswerAction", error);
        useToastStore.getState().add({
            id: `vote-error-${answerId}`,
            type: "error",
            data: {
                message: "Failed to process vote",
                description:
                    "Something went wrong while processing your downvote.",
            },
        });
        throw new Error("Failed to process downvote action.");
    }
}) satisfies ActionFunction;
