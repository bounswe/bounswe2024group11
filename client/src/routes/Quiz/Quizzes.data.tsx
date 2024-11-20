import { LoaderFunction } from "react-router";
import {
    array,
    boolean,
    InferInput,
    nullable,
    number,
    object,
    safeParse,
    string,
} from "valibot";
import apiClient from "../../api"; // Axios instance
import { logger } from "../../utils";

export type Quiz = InferInput<typeof quizSchema>;

const quizSchema = object({
    id: string(),
    title: string(),
    description: string(),
    author: object({
        full_name: string(),
        username: string(),
        avatar: string(),
    }),
    created_at: string(),
    tags: array(
        object({
            id: string(),
            name: string(),
        }),
    ),
    type: number(),
    num_taken: number(),
    is_taken: boolean(),
    question_count: number(),
    difficulty: string(),
    rating: object({
        score: number(),
        count: number(),
    }),
});

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

        const data = response.data; // Extract data from the axios response
        const { output, issues, success } = safeParse(
            quizzesResponseSchema,
            data,
        );

        if (!success) {
            logger.error("Failed to parse quizzes response", issues);
            throw new Error(`Failed to parse quizzes response: ${issues}`);
        }

        return output;
    } catch (error) {
        logger.error("Error fetching quizzes", error);
        throw new Error("Failed to fetch quizzes");
    }
}) satisfies LoaderFunction;
