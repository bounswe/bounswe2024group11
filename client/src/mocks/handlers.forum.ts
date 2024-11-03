import { http, HttpResponse } from "msw";
import { BASE_URL } from "../utils";
import { forumDetails, forumOverview } from "./mocks.forum";

export const forumHandlers = [
    http.post(`${BASE_URL}/forum`, async ({ request }) => {
        const url = new URL(request.url);
        const page = Number(url.searchParams.get("page")) || 1;
        const per_page = Number(url.searchParams.get("per_page")) || 10;
        const posts = forumOverview
            .slice((page - 1) * per_page, page * per_page)
            .map((post) => ({
                ...post,
            }));
        return HttpResponse.json({ posts }, { status: 200 });
    }),
    http.get(`${BASE_URL}/forum/:id`, async ({ params, request }) => {
        const { id } = params as { id: string };
        const url = new URL(request.url);
        const page = Number(url.searchParams.get("page")) || 1;
        const per_page = Number(url.searchParams.get("per_page")) || 10;
        const sort = url.searchParams.get("sort") || "upvote";

        const postFromMockBackend = forumDetails.find(
            (post) => post.post.id === id,
        );

        if (!postFromMockBackend) {
            return HttpResponse.json(
                { error: "Post not found" },
                { status: 404 },
            );
        }

        const sortedAnswers = [...postFromMockBackend.answers];

        if (sort === "upvote") {
            sortedAnswers.sort((a, b) => b.num_likes - a.num_likes);
        } else if (sort === "newest") {
            sortedAnswers.sort(
                (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime(),
            );
        } else if (sort === "oldest") {
            sortedAnswers.sort(
                (a, b) =>
                    new Date(a.created_at).getTime() -
                    new Date(b.created_at).getTime(),
            );
        }

        const paginatedAnswers = sortedAnswers.slice(
            (page - 1) * per_page,
            page * per_page,
        );

        const post = {
            ...postFromMockBackend,
            answers: paginatedAnswers,
        };

        return HttpResponse.json(post, { status: 200 });
    }),
];
