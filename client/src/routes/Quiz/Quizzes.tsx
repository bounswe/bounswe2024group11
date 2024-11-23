import { RiCloseFill } from "@remixicon/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useLoaderData, useRouteLoaderData } from "react-router-typesafe";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { inputClass } from "../../components/input";
import { PageHead } from "../../components/page-head";
import { QuizCard } from "../../components/quiz-card";
import { homeLoader } from "../Home/Home.data";
import { quizzesLoader } from "./Quizzes.data";

export const Quizzes = () => {
    const data = useLoaderData<typeof quizzesLoader>();
    const [searchParams, setSearchParams] = useSearchParams();

    const { user, logged_in } =
        useRouteLoaderData<typeof homeLoader>("home-main");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState("newest");

    const currentPage = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("per_page") || "10");
    const totalPages = Math.ceil(data.count / perPage);

    const handlePageChange = (page: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", page.toString());
        newParams.set("per_page", perPage.toString());
        setSearchParams(newParams);
    };

    const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("per_page", e.target.value);
        newParams.set("page", "1"); // Reset to the first page
        setSearchParams(newParams);
    };

    const filteredQuizzes = data.results
        .filter(
            (quiz) =>
                quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (!selectedTagId ||
                    quiz.tags.some(
                        (tag) => tag.linked_data_id === selectedTagId,
                    )),
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
                return (b.rating.score || 0) - (a.rating.score || 0);
            }
            return 0;
        });

    const allTags = Array.from(
        new Set(data.results.flatMap((quiz) => quiz.tags)),
    ).sort((a, b) => a.name.localeCompare(b.name));

    const description = logged_in
        ? `This is your time to shine ${user.full_name}`
        : "Test your knowledge of various topics. Log in to track your progress.";

    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <PageHead title="Quizzes" description={description} />
            <aside className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <label htmlFor="perPage" className="mr-2">
                                Questions per page:
                            </label>
                            <select
                                id="perPage"
                                value={perPage}
                                onChange={handlePerPageChange}
                                className={`${inputClass()} w-24`}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                disabled={!data.previous}
                                aria-disabled={!data.previous}
                                className={buttonClass({
                                    intent: "secondary",
                                })}
                            >
                                <div
                                    className={buttonInnerRing({
                                        intent: "secondary",
                                    })}
                                />
                                Previous
                            </button>
                            <span className="flex items-center">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                disabled={!data.next}
                                aria-disabled={!data.next}
                                className={buttonClass({
                                    intent: "secondary",
                                })}
                            >
                                <div
                                    className={buttonInnerRing({
                                        intent: "secondary",
                                    })}
                                />
                                Next
                            </button>
                        </div>
                    </div>
                </div>
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
                                <option
                                    key={tag.linked_data_id}
                                    value={tag.name}
                                >
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
                {filteredQuizzes
                    .map((quiz) => {
                        return {
                            ...quiz,
                            is_taken: !logged_in ? false : quiz.is_taken,
                        };
                    })
                    .map((quiz) => (
                        <QuizCard
                            key={quiz.id}
                            quiz_key={String(quiz.id)}
                            onTagClick={(tag) => setSelectedTagId(tag)}
                            quiz={quiz}
                        />
                    ))}
            </main>
        </div>
    );
};
