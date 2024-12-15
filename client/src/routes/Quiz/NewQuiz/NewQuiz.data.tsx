import { ActionFunction, LoaderFunction, redirect } from "react-router";
import apiClient from "../../../api";
import { useToastStore } from "../../../store";
import { logger } from "../../../utils";
import { useQuizStore } from "./state";

export const newQuizLoader = (async () => {
    return null;
}) satisfies LoaderFunction;

export const newQuizAction = (async ({ request, params, context }) => {
    const formData = await request.formData();
    const quiz = formData.get("quiz") as string;
    const quizData = JSON.parse(quiz);

    return apiClient
        .post("/quizzes/", quizData)
        .then(() => {
            useToastStore.getState().add({
                id: "quiz-created",
                data: {
                    message: "Quiz created",
                    description: "You have successfully created a quiz.",
                },
                type: "success",
            });

            return redirect("/quizzes");
        })
        .catch((error) => {
            logger.error(error);
            useToastStore.getState().add({
                type: "error",
                id: "quiz-create-failed",
                data: {
                    message: "Quiz creation failed",
                    description:
                        "An unexpected error occurred. Please try again.",
                },
            });

            return redirect("/quizzes");
        })
        .finally(() => {
            useQuizStore.getState().resetQuiz();
        });
}) satisfies ActionFunction;
