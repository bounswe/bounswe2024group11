import { LoaderFunction } from "react-router";
import { safeParse } from "valibot";
import apiClient from "../../api";
import { logger } from "../../utils";
import { quizDetailsSchema } from "./Quiz.schema";

export const quizLoader = (async ({ params }) => {
    const { quizId } = params;

    if (!quizId) {
        throw new Error("Quiz ID is required.");
    }

    try {
        const response = await apiClient.get(`/quizzes/${quizId}`);

        const data = response.data; // Extract data from axios response
        logger.log(data);

        const { output, issues, success } = safeParse(quizDetailsSchema, data);

        if (!success) {
            logger.error("Failed to parse quiz response:", issues);
            throw new Error(`Failed to parse quiz response: ${issues}`);
        }

        return output;
    } catch (error) {
        logger.error(`Error fetching quiz with ID: ${quizId}`, error);
        throw new Error(`Failed to load quiz with ID: ${quizId}`);
    }
}) satisfies LoaderFunction;
