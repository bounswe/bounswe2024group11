import { LoaderFunction } from "react-router";
import { defer } from "react-router-typesafe";
import { array, nullable, number, object, safeParse, string } from "valibot";
import apiClient from "../../api"; // Axios instance
import { useQuestionsStore } from "../../store";
import { logger } from "../../utils";
import { quizSchema } from "./Quiz.schema";

const quizzesResponseSchema = object({
    count: number(),
    next: nullable(string()),
    previous: nullable(string()),
    results: array(quizSchema),
});
export const quizzesLoader = (async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const per_page = Number(url.searchParams.get("per_page")) || 10;
    const linked_data_id = url.searchParams.get("linked_data_id") || null;

    const quizzesPromise = apiClient
        .get("/quizzes/", {
            params: { page, per_page, linked_data_id },
        })
        .then((response) => {
            const { output, issues, success } = safeParse(
                quizzesResponseSchema,
                response.data,
            );

            if (!success) {
                logger.error("Failed to parse quizzes response", issues);
                throw new Error(`Failed to parse quizzes response: ${issues}`);
            }

            const questionStore = useQuestionsStore;
            output.results.forEach((quiz) => {
                quiz.questions.forEach((question) => {
                    questionStore.getState().add(quiz.type, {
                        id: question.id,
                        question_text: question.question_text,
                        choices: question.choices,
                        hints: question.hints ?? null,
                    });
                });
            });

            return output;
        })
        .catch((error) => {
            logger.error("Error fetching quizzes", error);
            throw new Error("Failed to load quizzes");
        });

    return defer({
        quizzesData: quizzesPromise,
    });
}) satisfies LoaderFunction;
