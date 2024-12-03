import {
    ActionFunction,
    LoaderFunction,
    redirect,
    ShouldRevalidateFunction,
} from "react-router";
import { safeParse } from "valibot";
import apiClient, { getUserOrRedirect } from "../../api";
import { useQuestionsStore } from "../../store";
import { logger } from "../../utils";
import {
    dictionarySchema,
    forumQuestionSchema,
    forumSchema,
} from "./Forum.schema";

export const forumShouldRevalidate: ShouldRevalidateFunction = ({
    currentUrl,
    nextUrl,
    formData,
}) => {
    const currentUrlParams = new URLSearchParams(currentUrl.search);
    const nextUrlParams = new URLSearchParams(nextUrl.search);
    console.log(formData);
    return (
        !!formData ||
        currentUrlParams.get("page") !== nextUrlParams.get("page") ||
        currentUrlParams.get("per_page") !== nextUrlParams.get("per_page")
    );
};

export const forumLoader = (async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const per_page = Number(url.searchParams.get("per_page")) || 10;

    try {
        const response = await apiClient.get("/forum-questions/", {
            params: { page, per_page },
        });

        const { output, success, issues } = safeParse(
            forumSchema,
            response.data,
        );
        logger.log(issues);
        logger.log(output);
        if (!success) {
            throw new Error("Failed to parse forum response");
        }

        return output;
    } catch (error) {
        logger.error("Error fetching forum data", error);
        throw new Error("Failed to load forum questions");
    }
}) satisfies LoaderFunction;

export const forumCreateLoader = (async ({ request }) => {
    if (!getUserOrRedirect()) {
        return redirect("/login");
    }

    const url = new URL(request.url);
    const word = url.searchParams.get("word") || "";
    const lang = url.searchParams.get("lang") || "en";
    const qid = url.searchParams.get("qid");
    const relevantQuiz = qid
        ? useQuestionsStore.getState().questions[Number(qid)]
        : null;

    if (!word) {
        return {
            dictionary: undefined,
            relevantQuiz,
            relevantQuizType: undefined,
        };
    }

    const response = await apiClient.get("/tagging/", {
        params: {
            word,
            lang,
        },
    });

    const { issues, output, success } = safeParse(
        dictionarySchema,
        response.data,
    );

    if (!success) {
        console.error(issues);
        throw new Error("Failed to parse dictionary response.");
    }

    console.log("qid", qid);

    return {
        queryWord: word,
        relevantQuiz,
        dictionary: output,
    };
}) satisfies LoaderFunction;

export const forumCreateAction = (async ({ request }) => {
    console.log("forum action");
    const formData = await request.formData();
    const tags = JSON.parse(formData.get("tags") as string);
    const title = formData.get("title");
    const question = formData.get("question");
    const quiz_question_id = Number(formData.get("quiz_question_id"));

    const response = await apiClient.post("/forum-questions/", {
        tags,
        title,
        question,
        quiz_question_id: quiz_question_id || null,
    });

    const { issues, success } = safeParse(forumQuestionSchema, response.data);

    if (!success) {
        console.error(issues);
        throw new Error("Failed to parse forum question response.");
    }

    return redirect("/forum");
}) satisfies ActionFunction;
