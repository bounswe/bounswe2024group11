import { LoaderFunction } from "react-router";
import { safeParse } from "valibot";
import apiClient from "../../api";
import { logger } from "../../utils";
import { forumQuestionSchema } from "./Forum.schema";

export const forumQuestionLoader = (async ({ params }) => {
    const postId = params.questionId;

    if (!postId) {
        throw new Error("Post ID is required.");
    }

    try {
        const response = await apiClient.get(`/forum-questions/${postId}`);

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
        throw new Error(`Failed to fetch post with ID: ${postId}`);
    }
}) satisfies LoaderFunction;
