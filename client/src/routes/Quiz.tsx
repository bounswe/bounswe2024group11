import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";
import { getRelativeTime } from "../utils";
import { quizLoader } from "./Quiz.data";

export const Quiz = () => {
    const quiz = useLoaderData<typeof quizLoader>();
    return (
        <div className="container items-center flex flex-col py-20">
            <div className="grid grid-cols-2 gap-4 max-w-4xl justify-stretch items-stretch">
                <Link
                    aria-label={quiz.title}
                    to={quiz.id}
                    className="p-8 shadow-card ring-slate-200 ring max-w-lg flex flex-col gap-2"
                    key={quiz.id}
                >
                    <span>Title: {quiz.title}</span>
                    <p>Desc: {quiz.description}</p>
                    <p>By {quiz.author.full_name}</p>
                    <p>Created {getRelativeTime(new Date(quiz.created_at))} </p>
                    {quiz.tags.map(({ name }) => {
                        return (
                            <div className="flex items-center py-1 px-2 bg-cyan-100 text-cyan-800">
                                {name}
                            </div>
                        );
                    })}
                </Link>
            </div>
        </div>
    );
};
