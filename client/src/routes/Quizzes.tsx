import { useLoaderData } from "react-router-typesafe";
import { QuizCard } from "../components/quiz-card";
import { quizzesLoader } from "./Quizzes.data";

export const Quizzes = () => {
    const data = useLoaderData<typeof quizzesLoader>();
    return (
        <div className="container flex max-w-screen-lg flex-col items-stretch gap-8 py-12">
            <div className="flex flex-1 flex-col items-start gap-1">
                <h1 className="font-display text-4xl font-medium">Quizzes</h1>
                <p className="text-slate-500">
                    Test your knowledge of various topics.
                </p>
            </div>
            <div className="grid max-w-4xl grid-cols-2 items-stretch justify-stretch gap-4">
                {data.quizzes.map((quiz) => (
                    <QuizCard quiz={quiz} />
                ))}
            </div>
        </div>
    );
};
