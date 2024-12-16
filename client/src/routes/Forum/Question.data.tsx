import { ActionFunction, LoaderFunction, redirect } from "react-router";
import { safeParse } from "valibot";
import apiClient, { getUserOrRedirect } from "../../api";
import { useToastStore } from "../../store";
import { logger } from "../../utils";
import {
    forumAnswerDownvoteSchema,
    forumAnswerSchema,
    forumAnswerUpvoteSchema,
    forumBookmarkSchema,
    forumDownvoteSchema,
    forumQuestionSchema,
    forumUpvoteSchema,
} from "./Forum.schema";

export const forumQuestionLoader = (async ({ params }) => {
    const postId = params.questionId;

    if (!postId) {
        throw new Error("Post ID is required.");
    }

    try {
        const response = await apiClient.get(`/forum-questions/${postId}/`);

        const { output, issues, success } = safeParse(
            forumQuestionSchema,
            response.data,
        );

        if (!success) {
            throw new Error(`Failed to parse post response: ${issues}`);
        }

        return output;
    } catch (error) {
        logger.error(`Error fetching post with ID: ${postId}`, error);
        throw new Error(`Failed to load post with ID: ${postId}`);
    }
}) satisfies LoaderFunction;

export const upvoteForumAction = (async ({ request }: { request: Request }) => {
    if (!getUserOrRedirect()) return null;
    try {
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

            useToastStore.getState().add({
                id: `upvote-success-${currentUpvote}`,
                type: "success",
                data: {
                    message: "Upvoted successfully",
                    description: "You've upvoted this question",
                },
            });

            return output;
        } else {
            response = await apiClient.delete(
                `/forum-upvote/${currentUpvote}/`,
            );

            useToastStore.getState().add({
                id: `upvote-delete-success-${currentUpvote}`,
                type: "info",
                data: {
                    message: "Upvote removed",
                    description:
                        "You've removed your upvote from this question",
                },
            });
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
    if (!getUserOrRedirect()) return null;
    try {
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

            useToastStore.getState().add({
                id: `downvote-success-${currentDownvote}`,
                type: "success",
                data: {
                    message: "Downvoted successfully",
                    description: "You've downvoted this question",
                },
            });

            return output;
        } else {
            response = await apiClient.delete(
                `/forum-downvote/${currentDownvote}/`,
            );

            useToastStore.getState().add({
                id: `downvote-delete-success-${currentDownvote}`,
                type: "info",
                data: {
                    message: "Downvote removed",
                    description:
                        "You've removed your downvote from this question",
                },
            });
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
        if (!getUserOrRedirect()) return null;

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

            useToastStore.getState().add({
                id: `bookmark-success-${currentBookmark}`,
                type: "success",
                data: {
                    message: "Question bookmarked",
                    description: "You can find this question in your bookmarks",
                },
            });
        } else {
            // Perform DELETE request to delete bookmark
            response = await apiClient.delete(
                `/forum-bookmarks/${currentBookmark}/`,
            );

            useToastStore.getState().add({
                id: `bookmark-delete-success-${currentBookmark}`,
                type: "info",
                data: {
                    message: "Bookmark removed",
                    description: "Question removed from your bookmarks",
                },
            });
        }
        return null;
    } catch (error) {
        logger.error("Error in bookmarkForumAction", error);
        throw new Error("Failed to process bookmark action");
    }
}) satisfies ActionFunction;

export const answerForumAction = (async ({ request, params }) => {
    if (!getUserOrRedirect()) return null;
    const postId = params.postId;

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
                message: "Answer posted",
                description: "Your answer has been shared successfully",
            },
        });

        return response;
    } catch (error) {
        logger.error("Error in answerForumAction", error);
        throw new Error("Failed to process answer action");
    }
}) satisfies ActionFunction;

export const upvoteForumAnswerAction = (async ({ request }) => {
    if (!getUserOrRedirect()) return null;

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
                    description: "You've removed your upvote from this answer",
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
                    message: "Answer upvoted",
                    description: "You've upvoted this answer",
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
                message: "Action failed",
                description: "Unable to process your vote. Please try again.",
            },
        });
        throw new Error("Failed to process vote action.");
    }
}) satisfies ActionFunction;

export const downvoteForumAnswerAction = (async ({ request }) => {
    if (!getUserOrRedirect()) return null;

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
                    description:
                        "You've removed your downvote from this answer",
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
                    message: "Answer downvoted",
                    description: "You've downvoted this answer",
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
                message: "Action failed",
                description:
                    "Unable to process your downvote. Please try again.",
            },
        });
        throw new Error("Failed to process downvote action.");
    }
}) satisfies ActionFunction;

export const deleteForumAction = (async ({ params }) => {
    const postId = params.questionId;
    getUserOrRedirect();
    try {
        const response = await apiClient.delete(`/forum-questions/${postId}/`);

        if (response.status === 204) {
            useToastStore.getState().add({
                id: `delete-success-${postId}`,
                type: "success",
                data: {
                    message: "Question deleted",
                    description: "The question has been removed successfully",
                },
            });
        }

        return redirect("/forum");
    } catch (error) {
        logger.error("Error in deleteForumAction", error);
        useToastStore.getState().add({
            id: `delete-error-${postId}`,
            type: "error",
            data: {
                message: "Failed to delete question",
                description: "Unable to remove the question. Please try again.",
            },
        });
        throw new Error("Failed to delete question");
    }
}) satisfies ActionFunction;
