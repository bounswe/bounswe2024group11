import { RiCloseFill } from "@remixicon/react";
import { useState } from "react";
import { useLoaderData } from "react-router-typesafe";
import { buttonClass } from "../components/button";
import { inputClass } from "../components/input";
import { QuizCard } from "../components/quiz-card";
import { quizzesLoader } from "./Quizzes.data";

export const Quizzes = () => {
    const data = useLoaderData<typeof quizzesLoader>();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTagId, setSelectedTagId] = useState<string | null>(null);

    const filteredQuizzes = data.quizzes.filter(
        (quiz) =>
            quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!selectedTagId ||
                quiz.tags.some((tag) => tag.id === selectedTagId)),
    );

    const allTags = Array.from(
        new Set(data.quizzes.flatMap((quiz) => quiz.tags)),
    ).slice(0, 10);

    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <div className="flex flex-1 flex-col items-start gap-1">
                <h1 className="font-display text-4xl font-medium">Quizzes</h1>
                <p className="text-slate-500">
                    Test your knowledge of various topics.
                </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
                <div>
                    <select
                        className={inputClass()}
                        value={selectedTagId || ""}
                        onChange={(e) =>
                            setSelectedTagId(e.target.value || null)
                        }
                    >
                        <option value="">All Tags</option>
                        {allTags.map((tag) => (
                            <option key={tag.id} value={tag.id}>
                                {tag.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex-grow">
                    <input
                        type="text"
                        placeholder="Search quizzes..."
                        className={inputClass({ className: "w-full max-w-sm" })}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        className={buttonClass({
                            intent: "tertiary",
                            size: "medium",
                            icon: "left",
                        })}
                        onClick={() => {
                            setSearchTerm("");
                            setSelectedTagId(null);
                        }}
                    >
                        <RiCloseFill size={20} />
                        Clear All Filters
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 items-stretch justify-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredQuizzes.map((quiz) => (
                    <QuizCard key={quiz.id} quiz={quiz} />
                ))}
            </div>
        </div>
    );
};
