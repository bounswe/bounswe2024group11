import { LoaderFunction } from "react-router";
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
    const per_page = Number(url.searchParams.get("per_page")) || 20;

    try {
        const response = await apiClient.get("/quizzes/", {
            params: { page, per_page },
        });
        //logger.log(response.data);
        const data = response.data; // Extract data from the axios response
        const { output, issues, success } = safeParse(
            quizzesResponseSchema,
            data,
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
        console.log("question Store:", questionStore.getState().questions);

        return output;
    } catch (error) {
        logger.error("Error fetching quizzes", error);
        throw new Error("Failed to load quizzes");
    }
}) satisfies LoaderFunction;
