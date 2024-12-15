import { Portal } from "@ariakit/react";
import {
    RiAddFill,
    RiArrowLeftLine,
    RiArrowRightLine,
    RiCloseFill,
} from "@remixicon/react";
import { Link, useSearchParams } from "react-router-dom";
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

    const currentPage = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("per_page") || "10");
    const totalPages = Math.ceil(data.count / perPage);
    const searchTerm = searchParams.get("search") || "";
    const sortBy = searchParams.get("sort") || "newest";
    const selectedTagId = searchParams.get("tag");

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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("search", e.target.value);
        setSearchParams(newParams);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("sort", e.target.value);
        setSearchParams(newParams);
    };

    const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newParams = new URLSearchParams(searchParams);
        if (e.target.value) {
            newParams.set("tag", e.target.value);
        } else {
            newParams.delete("tag");
        }
        setSearchParams(newParams);
    };

    const filteredQuizzes = data.results.sort((a, b) => {
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

    const description = logged_in
        ? `This is your time to shine, ${user.full_name}`
        : "Test your knowledge of various topics. Log in to track your progress.";

    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <PageHead title="Quizzes" description={description} />
            <aside className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="flex-grow">
                            <input
                                type="text"
                                placeholder="Search by title, description, or tag"
                                className={inputClass({
                                    className: "w-full max-w-sm",
                                })}
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div>
                            <button
                                className={buttonClass({
                                    intent: "tertiary",
                                    size: "medium",
                                    icon: "left",
                                })}
                                onClick={() =>
                                    setSearchParams(new URLSearchParams())
                                }
                            >
                                <RiCloseFill size={20} />
                                Clear All Filters
                            </button>
                        </div>
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
                                    className="sr-only"
                                    onChange={handleSortChange}
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
                            quiz={quiz}
                            onTagClick={(tag) => {
                                const newParams = new URLSearchParams(
                                    searchParams,
                                );
                                newParams.set("tag", tag);
                                setSearchParams(newParams);
                            }}
                        />
                    ))}
            </main>
            <div className="flex flex-col gap-4">
                <div className="flex items-end justify-end">
                    <fieldset className="flex flex-col gap-2">
                        <label
                            htmlFor="perPage"
                            className="text-sm text-slate-500"
                        >
                            Show quizzes per page:
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
                    </fieldset>
                    <div className="flex gap-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={!data.previous}
                            aria-label="Previous Page"
                            aria-disabled={!data.previous}
                            className={buttonClass({
                                intent: "secondary",
                                className: "w-16",
                            })}
                        >
                            <div
                                className={buttonInnerRing({
                                    intent: "secondary",
                                })}
                                aria-hidden="true"
                            />
                            <RiArrowLeftLine size={16} />
                        </button>
                        <span className="flex w-12 items-center justify-center gap-1 text-center text-sm text-slate-400">
                            <span className="px-1 py-0.5 text-base text-slate-700">
                                {currentPage}
                            </span>
                            <span className="text-xs">/</span>
                            <span className="px-1 py-0.5 text-base font-regular">
                                {totalPages}
                            </span>
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={!data.next}
                            aria-disabled={!data.next}
                            aria-label="Next Page"
                            className={buttonClass({
                                intent: "secondary",
                                className: "w-16",
                            })}
                        >
                            <div
                                className={buttonInnerRing({
                                    intent: "secondary",
                                })}
                                aria-hidden="true"
                            />
                            <RiArrowRightLine size={16} />
                        </button>
                    </div>
                </div>
            </div>
            <Portal className="fixed bottom-10 right-10 z-10">
                <Link
                    to="/quizzes/new"
                    className={buttonClass({ intent: "primary", icon: "left" })}
                >
                    <span className={buttonInnerRing({ intent: "primary" })} />
                    <RiAddFill size={20} />
                    <span>Create a Quiz</span>
                </Link>
            </Portal>
        </div>
    );
};
