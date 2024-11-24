import { LoaderFunction, redirect } from "react-router";
import { safeParse } from "valibot";
import apiClient, { getUserOrRedirect } from "../../api"; // Axios instance
import { logger } from "../../utils";
import { forumSchema } from "../Forum/Forum.schema";

export const myProfileLoader = (async () => {
    const user = getUserOrRedirect();
    if (!user) {
        return redirect("/login");
    }

    if ("username" in user) return redirect(`/profile/${user.username}`);
}) satisfies LoaderFunction;

export const profileLoader = (async ({ params }) => {
    if (!getUserOrRedirect()) {
        return redirect("/login");
    }

    try {
        const response = await apiClient.get("/forum-questions/");

        const { output, success, issues } = safeParse(
            forumSchema,
            response.data,
        );
        if (!success) {
            logger.log(issues);
            throw new Error("Failed to parse forum response");
        }

        const myQuestions = output.results.filter(
            (question) => question.author.username === params.username,
        );

        const bookMarkedQuestions = output.results.filter(
            (question) => question.is_bookmarked,
        );

        const upvotedQuestions = output.results.filter(
            (question) => question.is_upvoted,
        );

        const downvotedQuestions = myQuestions.filter(
            (question) => question.is_downvoted,
        );

        return {
            my: myQuestions,
            bookMarked: bookMarkedQuestions,
            upvoted: upvotedQuestions,
            downvoted: downvotedQuestions,
        };
    } catch (error) {
        logger.error(`Error fetching profile:`, error);
        throw new Error(`Failed to load profile`);
    }
}) satisfies LoaderFunction;
