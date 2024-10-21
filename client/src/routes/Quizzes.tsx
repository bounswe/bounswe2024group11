import { RiCloseFill } from "@remixicon/react";
import { useState } from "react";
import { useLoaderData } from "react-router-typesafe";
import { buttonClass } from "../components/button";
import { inputClass } from "../components/input";
import { PageHead } from "../components/page-head";
import { QuizCard } from "../components/quiz-card";
import { quizzesLoader } from "./Quizzes.data";

export const Quizzes = () => {
    const data = useLoaderData<typeof quizzesLoader>();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState("newest");

    const filteredQuizzes = data.quizzes
        .filter(
            (quiz) =>
                quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (!selectedTagId ||
                    quiz.tags.some((tag) => tag.id === selectedTagId)),
        )
        .sort((a, b) => {
            if (sortBy === "newest") {
                return (
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                );
            } else if (sortBy === "oldest") {
                return (
                    new Date(a.created_at).getTime() -
                    new Date(b.created_at).getTime()
                );
            } else if (sortBy === "popular") {
                return b.num_taken - a.num_taken;
            } else if (sortBy === "most liked") {
                return b.rating.score - a.rating.score;
            }
            return 0;
        });

    const allTags = Array.from(
        new Set(data.quizzes.flatMap((quiz) => quiz.tags)),
    ).sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <PageHead
                title="Quizzes"
                description="Test your knowledge of various topics."
            />
            <aside className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 sm:flex-row">
                    <div>
                        <select
                            className={inputClass({
                                className: "w-40 cursor-pointer",
                            })}
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
                            className={inputClass({
                                className: "w-full max-w-sm",
                            })}
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
                                setSortBy("newest");
                            }}
                        >
                            <RiCloseFill size={20} />
                            Clear All Filters
                        </button>
                    </div>
                </div>
                <div className="flex gap-2">
                    {["newest", "oldest", "popular", "most liked"].map(
                        (option) => (
                            <label
                                key={option}
                                className="flex cursor-pointer items-center gap-2"
                            >
                                <input
                                    type="radio"
                                    value={option}
                                    checked={sortBy === option}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="sr-only"
                                />
                                <span
                                    className={`rounded-full px-4 py-1.5 font-medium transition-all ${
                                        sortBy === option
                                            ? "bg-cyan-900 text-white"
                                            : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                                    }`}
                                >
                                    {option === "newest" && "Newest"}
                                    {option === "oldest" && "Oldest"}
                                    {option === "popular" && "Most Popular"}
                                    {option === "most liked" && "Most Liked"}
                                </span>
                            </label>
                        ),
                    )}
                </div>
            </aside>
            <main className="grid grid-cols-1 items-stretch justify-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredQuizzes.map((quiz) => (
                    <QuizCard
                        onTagClick={(tag) => setSelectedTagId(tag)}
                        key={quiz.id}
                        quiz={quiz}
                    />
                ))}
            </main>
        </div>
    );
};
