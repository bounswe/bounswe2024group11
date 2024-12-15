import {
    ActionFunction,
    LoaderFunction,
    redirect,
    ShouldRevalidateFunction,
} from "react-router";
import { safeParse } from "valibot";
import apiClient, { getUserOrRedirect } from "../../api";
import { logger } from "../../utils";
import {
    completedQuizSchema,
    quizAnswersSchema,
    quizDetailsSchema,
} from "./Quiz.schema";

export const quizShouldRevalidate: ShouldRevalidateFunction = ({
    currentUrl,
    nextUrl,
    formData,
}) => {
    const currentUrlParams = new URLSearchParams(currentUrl.search);
    const nextUrlParams = new URLSearchParams(nextUrl.search);

    return (
        !!formData ||
        currentUrlParams.get("page") !== nextUrlParams.get("page") ||
        currentUrlParams.get("per_page") !== nextUrlParams.get("per_page") ||
        currentUrlParams.get("linked_data_id") !==
            nextUrlParams.get("linked_data_id")
    );
};

export const quizLoader = (async ({ params }) => {
    const { quizId } = params;

    if (!quizId || !Number(quizId)) {
        throw new Error("Quiz ID is required.");
    }

    if (!getUserOrRedirect()) {
        return redirect("/login");
    }

    try {
        const response = await apiClient.get(`/quizzes/${quizId}/`);

        const data = response.data;

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

export const takeQuizAction = (async ({ request }) => {
    try {
        if (!getUserOrRedirect()) {
            return redirect("/login");
        }

        const formData = await request.formData();
        const answers = formData.get("answers") as string;
        const quizId = formData.get("quizId");

        // Store answers in localStorage as backup
        localStorage.setItem("quiz_answer" + String(quizId), answers);

        // Submit quiz and wait for response
        const response = await apiClient.post(`/take-quiz/`, {
            quiz: Number(quizId),
            answers: JSON.parse(answers),
        });

        // Parse and validate the response
        const { output, issues, success } = safeParse(
            completedQuizSchema,
            response.data,
        );

        if (!success) {
            logger.error("Failed to parse quiz response:", issues);
            throw new Error(`We couldn't submit your quiz.`);
        }

        // Return the parsed quiz submission data directly
        return { success: true, data: output };
    } catch (error) {
        // Log the error with more details
        logger.error("Failed to submit quiz:", error);

        throw new Error(
            "Failed to submit quiz. Let's hope this doesn't happen again.",
        );
    }
}) satisfies ActionFunction;
export const quizReviewLoader = (async ({ params }) => {
    const { quizId } = params;

    if (!quizId || !Number(quizId)) {
        throw new Error("Quiz ID is required.");
    }

    if (!getUserOrRedirect()) {
        return redirect("/login");
    }
    const savedAnswers = localStorage.getObject("quiz_answer" + String(quizId));
    const {
        output: outputS,
        issues: issuesS,
        success: successS,
    } = safeParse(quizAnswersSchema, savedAnswers);

    if (!successS) {
        logger.error(
            "Failed to parse quiz answers from local storage",
            issuesS,
        );
        throw new Error(`Failed to load quiz answers: ${issuesS}`);
    }
    try {
        const response = await apiClient.get(`/quizzes/${quizId}/`);

        const data = response.data; // Extract data from axios response
        const { output, issues, success } = safeParse(quizDetailsSchema, data);

        if (!success) {
            logger.error("Failed to parse quiz response:", issues);
            throw new Error(`Failed to parse quiz response: ${issues}`);
        }

        if (!output.is_taken) {
            return redirect(`/quizzes/${quizId}/`);
        }
        console.log(output);
        return { quiz: output, savedAnswers: outputS };
    } catch (error) {
        logger.error(`Error fetching quiz with ID: ${quizId}`, error);
        throw new Error(`Failed to load quiz with ID: ${quizId}`);
    }
}) satisfies LoaderFunction;
