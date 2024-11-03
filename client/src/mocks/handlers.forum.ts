import { faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";
import { BASE_URL } from "../utils";
import { forumDetails, forumOverview } from "./mocks.forum";

export const forumHandlers = [
    http.post(`${BASE_URL}/forum`, async ({ request }) => {
        const url = new URL(request.url);
        const page = Number(url.searchParams.get("page")) || 1;
        const per_page = Number(url.searchParams.get("per_page")) || 10;
        const seed = Number(page) * Number(per_page);
        faker.seed(seed);

        const posts = forumOverview
            .slice((page - 1) * per_page, page * per_page)
            .map((post) => ({
                ...post,
            }));
        return HttpResponse.json({ posts }, { status: 200 });
    }),
    http.get(`${BASE_URL}/forum/:id`, async ({ params }) => {
        const { id } = params as { id: string };
        const postFromMockBackend = forumDetails.find((post) => post.id === id);
        faker.seed(Number(id.split("-").join("")) % 100);
        const post = {
            ...postFromMockBackend,
        };

        // Return the single post data as JSON response with 200 status
        return HttpResponse.json(post, { status: 200 });
    }),
];
