import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import { BASE_URL } from "../utils";
import { predefinedQuizzes } from "./mockQuizzes";
import { quizDataType1, quizDataType2, quizDataType3 } from "./quiz";

export const quizHandlers = [
    http.post(`${BASE_URL}/quizzes`, async ({ request }) => {
        const url = new URL(request.url);
        const page = Number(url.searchParams.get("page")) || 1;
        const per_page = Number(url.searchParams.get("per_page")) || 20;
        const seed = Number(page) * Number(per_page);

        faker.seed(seed);

        const quizzes = predefinedQuizzes
            .slice((page - 1) * per_page, page * per_page)
            .map((quiz) => ({
                ...quiz,
            }));
        return HttpResponse.json({ quizzes }, { status: 200 });
    }),
    http.get(`${BASE_URL}/quizzes/:id`, async ({ params }) => {
        const { id } = params as { id: string };
        const quizFromMockBackend = predefinedQuizzes.find(
            (quiz) => quiz.id === id,
        );
        faker.seed(Number(id.split("-").join("")) % 100);
        const quizData =
            quizFromMockBackend?.type === 1
                ? quizDataType1
                : quizFromMockBackend?.type === 2
                  ? quizDataType2
                  : quizFromMockBackend?.type === 3
                    ? quizDataType3
                    : [];
        const quiz = {
            id,
            title: quizFromMockBackend?.title,
            description: quizFromMockBackend?.description,
            author: quizFromMockBackend?.author,
            created_at: quizFromMockBackend?.created_at,
            tags: quizFromMockBackend?.tags,
            questions: quizData,
        };

        // Return the single quiz data as JSON response with 200 status
        return HttpResponse.json(quiz, { status: 200 });
    }),
];
