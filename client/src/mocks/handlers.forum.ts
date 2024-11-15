import { http, HttpResponse } from "msw";
import { Post } from "../routes/Forum.data";
import { PostDetails, PostOverview } from "../types/post";
import { BASE_URL } from "../utils";
import { forumDetails, forumOverview } from "./mocks.forum";

export const forumHandlers = [
    http.get(`${BASE_URL}/forum`, async ({ request }) => {
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
    http.post(`${BASE_URL}/forum`, async ({ request }) => {
        const formData = await request.formData();
        const post: Post = {
            id: (forumOverview.length + 1).toString(),
            title: formData.get("title") as string,
            description: formData.get("body") as string,
            author: {
                full_name: "Current User", // Replace with actual user data from auth
                username: "current_user",
                avatar: "https://randomuser.me/api/portraits/men/31.jpg",
            },
            created_at: new Date().toISOString(),
            tags:
                formData
                    .get("tags")
                    ?.toString()
                    .split(",")
                    .map((tag, index) => {
                        return { name: tag, id: String(index) };
                    }) || [],
            num_comments: 0,
            num_likes: 0,
            num_dislikes: 0,
        };
        const postDetail: PostDetails = {
            post,
            answers: [],
        };
        const postOverview: PostOverview = {
            ...post,
        };
        forumOverview.unshift(postOverview);
        forumDetails.unshift(postDetail);

        return HttpResponse.json({ ...postDetail }, { status: 201 });
    }),
];
