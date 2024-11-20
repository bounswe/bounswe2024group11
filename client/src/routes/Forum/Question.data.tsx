import { ActionFunctionArgs, LoaderFunction } from "react-router";
import { safeParse } from "valibot";
import apiClient from "../../api";
import { logger } from "../../utils";
import { answerSchema, forumQuestionSchema } from "./Forum.schema";

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

export const postAction = async ({ params, request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const postId = params.postId;

    if (!postId) {
        throw new Error("Post ID is required.");
    }

    try {
        const response = await apiClient.post(
            `/forum/${postId}/answers`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data", // Handle FormData correctly
                },
            },
        );

        const { issues, success } = safeParse(answerSchema, response.data);

        if (!success) {
            throw new Error(`Failed to create post: ${issues}`);
        }

        console.log("here");

        return null;
    } catch (error) {
        logger.error(`Error posting answer to post ID: ${postId}`, error);
        throw new Error(`Failed to answer post`);
    }
};
