import { ActionFunction, LoaderFunction, redirect } from "react-router";
import { safeParse } from "valibot";
import apiClient, { getUserOrRedirect } from "../../api";
import { logger } from "../../utils";
import { completedQuizSchema, quizDetailsSchema } from "./Quiz.schema";

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

        const response = await apiClient.post(`/take-quiz/`, {
            quiz: Number(quizId),
            answers: JSON.parse(answers),
        });

        const { output, issues, success } = safeParse(
            completedQuizSchema,
            response.data,
        );

        if (!success) {
            logger.error("Failed to parse quiz response:", issues);
            throw new Error(`We couldn't submit your quiz.`);
        }

        return { success: true, data: output };
    } catch (error) {
        logger.error("Failed to submit quiz:", error);

        throw new Error(
            "Failed to submit quiz. Let's hope this doesn't happen again.",
        );
    }
}) satisfies ActionFunction;
