import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import { BASE_URL } from "../utils";

export const quizHandlers = [
    http.post(`${BASE_URL}/quizzes`, async ({ request, params }) => {
        const page = params["page"];
        const per_page = params["per_page"];
        const seed = Number(page) * Number(per_page);
        faker.seed(seed);
        const quizzes = Array.from({ length: 100 }, (_) => ({
            id: faker.string.uuid(),
            title: faker.animal.crocodilia() + " Quiz",
            description: faker.lorem.paragraph(),
            author: {
                full_name: faker.person.fullName(),
                username: faker.internet.userName(),
                avatar: faker.image.avatar(),
            },
            created_at: faker.date.past().toISOString(),
        }));

        return HttpResponse.json({ quizzes }, { status: 200 });
    }),
];
