import {
    ActionFunction,
    LoaderFunction,
    redirect,
    ShouldRevalidateFunction,
} from "react-router";
import { defer } from "react-router-typesafe";
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
        currentUrlParams.get("per_page") !== nextUrlParams.get("per_page")
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

export const takeQuizAction = (async ({ request }) => {
    try {
        if (!getUserOrRedirect()) {
            return redirect("/login");
        }

        const formData = await request.formData();
        const answers = formData.get("answers") as string;
        const quizId = formData.get("quizId");

        localStorage.setItem("quiz_answer" + String(quizId), answers);

        const quizSubmissionPromise = apiClient
            .post(`/take-quiz/`, {
                quiz: Number(quizId),
                answers: JSON.parse(answers),
            })
            .then((response) => {
                const { output, issues, success } = safeParse(
                    completedQuizSchema,
                    response.data,
                );
                if (!success) {
                    logger.error("Failed to parse quiz response:", issues);
                    throw new Error(`Failed to parse quiz response: ${issues}`);
                }
                return output;
            });

        return defer({
            quizSubmissionData: quizSubmissionPromise,
        });
    } catch (error) {
        logger.error(`Error submitting quiz:`, error);
        throw new Error(
            `We couldn't submit your quiz. Let's hope this doesn't happen again.`,
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
