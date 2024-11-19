import { LoaderFunction } from "react-router";
import { redirect } from "react-router-typesafe";
import { safeParse } from "valibot";
import { forumResponseSchema, postDetailsSchema } from "../types/forum";
import { BASE_URL, logger } from "../utils";

export const forumLoader = (async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const per_page = Number(url.searchParams.get("per_page")) || 10;
    const res = await fetch(
        `${BASE_URL}/forum-questions/?page=${page}&per_page=${per_page}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
    const data = await res.json();
    const { output, issues, success } = safeParse(forumResponseSchema, data);
    console.log(issues);
    if (!success) {
        throw new Error("Failed to parse quizzes response");
    }
    return output;
}) satisfies LoaderFunction;

export const createPostAction = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const res = await fetch(`${BASE_URL}/forum`, {
        method: "POST",
        body: formData,
    });
    if (!res.ok) {
        throw new Error(`Failed to create post`);
    }

    const data = await res.json();
    const { output, issues, success } = safeParse(postDetailsSchema, data);
    if (!success) {
        logger.log(data);
        throw new Error(`Failed to create post: ${issues}`);
    }
    return redirect("/forum");
};
