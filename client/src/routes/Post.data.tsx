import { LoaderFunction } from "react-router";
import { safeParse } from "valibot";
import { postDetailsSchema } from "../types/post";
import { BASE_URL } from "../utils";

export const postLoader = (async ({ params, request }) => {
    const url = new URL(request.url);
    const postId = params.postId;
    const sort = url.searchParams.get("sort") || "upvote";
    const page = Number(url.searchParams.get("page")) || 1;
    const per_page = Number(url.searchParams.get("per_page")) || 10;

    if (!postId) {
        throw new Error("Post ID is required.");
    }

    const res = await fetch(
        `${BASE_URL}/forum/${postId}?sort=${sort}&page=${page}&per_page=${per_page}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        },
    );

    if (!res.ok) {
        throw new Error(`Failed to fetch post with ID: ${postId}`);
    }

    const data = await res.json();
    const { output, issues, success } = safeParse(postDetailsSchema, data);
    if (!success) {
        throw new Error(`Failed to parse post response: ${issues}`);
    }

    return output;
}) satisfies LoaderFunction;
