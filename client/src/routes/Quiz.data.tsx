import { LoaderFunction } from "react-router";
import { array, object, safeParse, string } from "valibot";
import { BASE_URL } from "../utils";

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
});

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
    console.log(data);
    const { output, issues, success } = safeParse(quizSchema, data);
    if (!success) {
        throw new Error(`Failed to parse quiz response: ${issues}`);
    }

    return output;
}) satisfies LoaderFunction;
