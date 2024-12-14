import { ActionFunction, LoaderFunction, redirect } from "react-router";
import apiClient from "../../../api";
import { useToastStore } from "../../../store";
import { useQuizStore } from "./state";

export const newQuizLoader = (async () => {
    return null;
}) satisfies LoaderFunction;

export const newQuizAction = (async ({ request, params, context }) => {
    const formData = await request.formData();
    const quiz = formData.get("quiz") as string;
    const quizData = JSON.parse(quiz);

    await apiClient
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
            console.error(error);
            throw new Error("Failed to create quiz");
        });
    useQuizStore.getState().resetQuiz();
    return redirect("/quizzes");
}) satisfies ActionFunction;
