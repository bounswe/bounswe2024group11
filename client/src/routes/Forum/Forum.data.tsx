import { ActionFunction, LoaderFunction, redirect } from "react-router";
import { defer } from "react-router-typesafe";
import { safeParse } from "valibot";
import apiClient, { getUserOrRedirect } from "../../api";
import { useQuestionsStore, useToastStore } from "../../store";
import { logger } from "../../utils";
import {
    dictionarySchema,
    forumQuestionSchema,
    forumSchema,
} from "./Forum.schema";

export const forumSortOptions = [
    "newest",
    "oldest",
    "most_popular",
    "most_liked",
];

export const forumLoader = (async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const per_page = Number(url.searchParams.get("per_page")) || 10;
    const linked_data_id = url.searchParams.get("linked_data_id") || null;
    const sort = url.searchParams.get("sort") || "newest";
    const forumDataPromise = apiClient
        .get("/forum-questions/", {
            params: {
                page,
                per_page,
                linked_data_id,
                sort_by: forumSortOptions.includes(sort)
                    ? sort
                    : forumSortOptions[0],
            },
        })
        .then((response) => {
            const { output, success, issues } = safeParse(
                forumSchema,
                response.data,
            );
            if (!success) {
                throw new Error("Failed to parse forum response");
            }
            return output;
        })
        .catch((error) => {
            logger.error("Error fetching forum data", error);
            throw new Error("Failed to load forum questions");
        });

    return defer({
        forumData: forumDataPromise,
    });
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

    return {
        queryWord: word,
        relevantQuiz,
        dictionary: output,
    };
}) satisfies LoaderFunction;

export const forumCreateAction = (async ({ request }) => {
    const formData = await request.formData();
    formData.set("tags_string", formData.get("tags") || "");

    //formData.set("quiz_question_id", quiz_question_id);

    const response = await apiClient.post("/forum-questions/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    const { issues, success } = safeParse(forumQuestionSchema, response.data);

    if (!success) {
        console.error(issues);
        useToastStore.getState().add({
            id: `forum-question-create-failure`,
            type: "error",
            data: {
                message: "Failure",
                description: "Failed to post the question.",
            },
        });
    } else {
        useToastStore.getState().add({
            id: `forum-question-create-success`,
            type: "success",
            data: {
                message: "Success",
                description: "Question posted successfully.",
            },
        });
    }

    return redirect("/forum");
}) satisfies ActionFunction;
