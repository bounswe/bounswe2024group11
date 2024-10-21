import { LoaderFunction } from "react-router";
import { safeParse } from "valibot";
import { quizDetailsSchema } from "../types/quiz";
import { BASE_URL, logger } from "../utils";

export const quizLoader = (async ({ params }) => {
    const { quizId } = params;

    if (!quizId) {
        throw new Error("Quiz ID is required.");
    }

    const res = await fetch(`${BASE_URL}/quizzes/${quizId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch quiz with ID: ${quizId}`);
    }

    const data = await res.json();
    logger.log(data);
    const { output, issues, success } = safeParse(quizDetailsSchema, data);
    if (!success) {
        throw new Error(`Failed to parse quiz response: ${issues}`);
    }

    return output;
}) satisfies LoaderFunction;
