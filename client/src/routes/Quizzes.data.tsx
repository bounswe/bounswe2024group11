import { LoaderFunction } from "react-router";
import { array, number, object, safeParse, string } from "valibot";
import { BASE_URL } from "../utils";

export type Quiz = {
    id: string;
    title: string;
    description: string;
    author: {
        full_name: string;
        username: string;
        avatar: string;
    };
    created_at: string; // 2021-09-01T12:00:00Z
    tags: {
        id: string;
        name: string;
    };
    is_taken: boolean;
    question_count: number;
    difficulty: string;
    type: number; // 1: English to Turkish, 2: Turkish to English, 3: English to English definition
    num_taken: number; // Number of times the quiz has been taken by users
    rating: {
        score: number;
        count: number;
    };
};

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
});

const quizzesResponseSchema = object({
    quizzes: array(quizSchema),
});

export const quizzesLoader = (async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const per_page = Number(url.searchParams.get("per_page")) || 20;
    const res = await fetch(
        `${BASE_URL}/quizzes/?page=${page}&per_page=${per_page}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
    const data = await res.json();
    const { output, issues, success } = safeParse(quizzesResponseSchema, data);
    if (!success) {
        throw new Error(`Failed to parse quizzes response: ${issues}`);
    }
    return output;
}) satisfies LoaderFunction;
