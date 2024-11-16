import { http, HttpResponse } from "msw";
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
        const post: PostOverview = {
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
            bookmark: false,
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
    http.post(`${BASE_URL}/forum/:id/vote`, async ({ params, request }) => {
        const { id } = params as { id: string };
        const { voteType } = (await request.json()) as {
            voteType: "upvote" | "downvote";
        };
        const postIndex = forumOverview.findIndex((post) => post.id === id);
        if (postIndex === -1) {
            return HttpResponse.json(
                { error: "Post not found" },
                { status: 404 },
            );
        }

        // Store vote state in mock database
        if (!forumOverview[postIndex].userVote) {
            forumOverview[postIndex].userVote = voteType;
            if (voteType === "upvote") {
                forumOverview[postIndex].num_likes++;
            } else {
                forumOverview[postIndex].num_dislikes++;
            }
        } else if (forumOverview[postIndex].userVote !== voteType) {
            // Change vote
            if (voteType === "upvote") {
                forumOverview[postIndex].num_likes++;
                forumOverview[postIndex].num_dislikes--;
            } else {
                forumOverview[postIndex].num_dislikes++;
                forumOverview[postIndex].num_likes--;
            }
            forumOverview[postIndex].userVote = voteType;
        } else {
            // Cancel vote
            if (voteType === "upvote") {
                forumOverview[postIndex].num_likes--;
            } else {
                forumOverview[postIndex].num_dislikes--;
            }
            forumOverview[postIndex].userVote = null;
        }

        return HttpResponse.json(forumOverview[postIndex], { status: 200 });
    }),
    http.post(`${BASE_URL}/answers/:id/vote`, async ({ params, request }) => {
        const { id } = params;
        const { voteType } = (await request.json()) as {
            voteType: "upvote" | "downvote";
        };

        let targetAnswer = null;
        let detailIndex = -1;
        let answerIndex = -1;

        // Find the answer in forumDetails
        for (let i = 0; i < forumDetails.length; i++) {
            answerIndex = forumDetails[i].answers.findIndex(
                (answer) => answer.id === id,
            );
            if (answerIndex !== -1) {
                detailIndex = i;
                targetAnswer = forumDetails[i].answers[answerIndex];
                break;
            }
        }

        if (!targetAnswer) {
            return HttpResponse.json(
                { error: "Answer not found" },
                { status: 404 },
            );
        }

        if (!targetAnswer.userVote) {
            targetAnswer.userVote = voteType;
            if (voteType === "upvote") {
                targetAnswer.num_likes++;
            } else {
                targetAnswer.num_dislikes++;
            }
        } else if (targetAnswer.userVote !== voteType) {
            if (voteType === "upvote") {
                targetAnswer.num_likes++;
                targetAnswer.num_dislikes--;
            } else {
                targetAnswer.num_dislikes++;
                targetAnswer.num_likes--;
            }
            targetAnswer.userVote = voteType;
        } else {
            if (voteType === "upvote") {
                targetAnswer.num_likes--;
            } else {
                targetAnswer.num_dislikes--;
            }
            targetAnswer.userVote = null;
        }

        forumDetails[detailIndex].answers[answerIndex] = targetAnswer;
        return HttpResponse.json(targetAnswer, { status: 200 });
    }),
    http.post(`${BASE_URL}/forum/:id/bookmark`, async ({ params }) => {
        const { id } = params;
        const postIndex = forumOverview.findIndex((post) => post.id === id);
        if (postIndex === -1) {
            return HttpResponse.json(
                { error: "Post not found" },
                { status: 404 },
            );
        }
        forumOverview[postIndex].bookmark = !forumOverview[postIndex].bookmark;
        return HttpResponse.json(forumOverview[postIndex], { status: 200 });
    }),
    http.post(
        `${BASE_URL}/forum/:postId/answers`,
        async ({ params, request }) => {
            const { postId } = params;
            const { body } = (await request.json()) as { body: string };

            // Find the post in forumDetails
            const detailIndex = forumDetails.findIndex(
                (detail) => detail.post.id === postId,
            );
            if (detailIndex === -1) {
                return HttpResponse.json(
                    { error: "Post not found" },
                    { status: 404 },
                );
            }

            // Create new answer
            const newAnswer = {
                id: `answer_${Date.now()}`, // Generate unique ID
                text: body,
                author: {
                    // This would normally come from the authenticated user
                    full_name: "Current User",
                    username: "current_user",
                    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
                },
                created_at: new Date().toISOString(),
                num_likes: 0,
                num_dislikes: 0,
                userVote: null as "upvote" | "downvote" | null,
            };

            // Add answer to the post
            forumDetails[detailIndex].answers.unshift(newAnswer);

            // Update comment count in both forumDetails and forumOverview
            forumDetails[detailIndex].post.num_comments++;
            const postIndex = forumOverview.findIndex(
                (post) => post.id === postId,
            );
            if (postIndex !== -1) {
                forumOverview[postIndex].num_comments++;
            }

            return HttpResponse.json(newAnswer, { status: 201 });
        },
    ),
];
