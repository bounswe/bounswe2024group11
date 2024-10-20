import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";
import { getRelativeTime } from "../utils";
import { quizzesLoader } from "./Quizzes.data";

export const Quizzes = () => {
    const data = useLoaderData<typeof quizzesLoader>();
    return (
        <div className="container flex flex-col items-center py-20">
            <div className="grid max-w-4xl grid-cols-2 items-stretch justify-stretch gap-4">
                {data.quizzes.map((quiz) => (
                    <Link
                        aria-label={quiz.title}
                        to={quiz.id}
                        className="flex max-w-lg flex-col gap-2 p-8 shadow-card ring ring-slate-200"
                        key={quiz.id}
                    >
                        <span>Title: {quiz.title}</span>
                        <p>Desc: {quiz.description}</p>
                        <p>By {quiz.author.full_name}</p>
                        <p>
                            Created {getRelativeTime(new Date(quiz.created_at))}{" "}
                        </p>
                        {quiz.tags.map(({ name }) => {
                            return (
                                <div className="flex items-center bg-cyan-100 px-2 py-1 text-cyan-800">
                                    {name}
                                </div>
                            );
                        })}
                    </Link>
                ))}
            </div>
        </div>
    );
};
