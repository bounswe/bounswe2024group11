import {
    ActionFunction,
    LoaderFunction,
    redirect,
    ShouldRevalidateFunction,
} from "react-router";
import { safeParse } from "valibot";
import apiClient, { getUserOrRedirect } from "../../api";
import { logger } from "../../utils";
import { completedQuizSchema, quizDetailsSchema } from "./Quiz.schema";

export const quizShouldRevalidate: ShouldRevalidateFunction = ({
    currentUrl,
    nextUrl,
}) => {
    const currentUrlParams = new URLSearchParams(currentUrl.search);
    const nextUrlParams = new URLSearchParams(nextUrl.search);

    return (
        currentUrlParams.get("page") !== nextUrlParams.get("page") ||
        currentUrlParams.get("per_page") !== nextUrlParams.get("per_page")
    );
};

export const quizLoader = (async ({ params }) => {
    const { quizId } = params;

    if (!getUserOrRedirect()) {
        return redirect("/login");
    }

    if (!quizId) {
        throw new Error("Quiz ID is required.");
    }

    try {
        const response = await apiClient.get(`/quizzes/${quizId}/`);

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

export const takeQuizAction = (async ({ request, params }) => {
    try {
        if (!getUserOrRedirect()) {
            return redirect("/login");
        }

        const formData = await request.formData();

        const answers = formData.get("answers") as string;
        const quizId = formData.get("quizId");

        logger.log("submit quiz", {
            quiz: Number(quizId),
            answers: JSON.parse(answers),
        });

        const response = await apiClient.post(`/take-quiz/`, {
            quiz: Number(quizId),
            answers: JSON.parse(answers),
        });

        const data = response.data; // Extract data from axios response
        logger.log(data);
        const { output, issues, success } = safeParse(
            completedQuizSchema,
            data,
        );
        if (!success) {
            logger.error("Failed to parse quiz response:", issues);
            throw new Error(`Failed to parse quiz response: ${issues}`);
        }

        return output;
    } catch (error) {
        logger.error(`Error submitting quiz:`, error);
        throw new Error(`Failed to take quiz with ID: `);
    }
}) satisfies ActionFunction;
