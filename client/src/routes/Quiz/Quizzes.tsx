import { Separator } from "@ariakit/react";
import {
    RiAddFill,
    RiArrowLeftLine,
    RiArrowRightLine,
    RiCloseFill,
    RiSearchLine,
} from "@remixicon/react";
import { Suspense, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
    Await,
    useLoaderData,
    useRouteLoaderData,
} from "react-router-typesafe";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { PageHead } from "../../components/page-head";
import { QuizCard } from "../../components/quiz-card";
import { radioOptionClass } from "../../components/radio-option";
import { TagSearch } from "../../components/tag-search";
import { snakeToTitle } from "../../utils";
import { QuizLoading } from "../_loading";
import { userLoader } from "../Home/Home.data";
import { quizSortOptions, quizzesLoader } from "./Quizzes.data";

export const Quizzes = () => {
    const { quizzesData } = useLoaderData<typeof quizzesLoader>();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchInputRef = useRef<HTMLInputElement>(null);

    const sortBy = searchParams.get("sort") || "newest";

    const { user, logged_in } =
        useRouteLoaderData<typeof userLoader>("home-main");

    const currentPage = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("per_page") || "10");

    const handlePageChange = (page: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", page.toString());
        newParams.set("per_page", perPage.toString());
        setSearchParams(newParams);
    };

    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <PageHead
                        title="Quizzes"
                        description="Test your knowledge of various topics."
                    />
                    <aside className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4 pt-6">
                            <TagSearch
                                onTagSelect={(tag) => {
                                    const newParams = new URLSearchParams(
                                        searchParams,
                                    );
                                    if (tag) {
                                        newParams.set("linked_data_id", tag.id);
                                    } else {
                                        newParams.delete("linked_data_id");
                                    }
                                    setSearchParams(newParams);
                                }}
                                inputRef={searchInputRef}
                            />
                        </div>
                        <Separator className="border-slate-200" />

                        <div className="flex gap-2">
                            {quizSortOptions.map((option) => (
                                <label
                                    key={option}
                                    className="flex cursor-pointer items-center gap-2"
                                >
                                    <input
                                        type="radio"
                                        value={option}
                                        checked={sortBy === option}
                                        onChange={() => {
                                            const newParams =
                                                new URLSearchParams(
                                                    searchParams,
                                                );
                                            newParams.set("sort", option);
                                            setSearchParams(newParams);
                                        }}
                                        className="sr-only"
                                    />
                                    <span
                                        className={radioOptionClass({
                                            selected: sortBy === option,
                                        })}
                                    >
                                        {snakeToTitle(option)}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </aside>
                </div>
                <div className="flex flex-col justify-end">
                    <Link
                        to="/quizzes/new"
                        className={buttonClass({
                            intent: "primary",
                            icon: "left",
                            size: "large",
                        })}
                    >
                        <span
                            className={buttonInnerRing({
                                intent: "primary",
                            })}
                        />
                        <RiAddFill size={20} />
                        <span>Create A Quiz</span>
                    </Link>
                </div>
            </div>
            <Separator className="border-slate-200" />
            <Suspense fallback={<QuizLoading />}>
                <Await resolve={quizzesData}>
                    {(data) => {
                        const totalPages = Math.ceil(data.count / perPage);
                        return (
                            <>
                                <main className="grid grid-cols-1 items-stretch justify-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {data.results
                                        .map((quiz) => {
                                            return {
                                                ...quiz,
                                                is_taken: !logged_in
                                                    ? false
                                                    : quiz.is_taken,
                                            };
                                        })
                                        .map((quiz) => (
                                            <QuizCard
                                                key={quiz.id}
                                                quiz_key={String(quiz.id)}
                                                quiz={quiz}
                                                onTagClick={() => {}}
                                            />
                                        ))}
                                    {data.results.length === 0 && (
                                        <div className="col-span-3 flex w-full flex-col items-center gap-6 px-6 py-2">
                                            <div className="flex flex-col items-center gap-4 py-20">
                                                <div className="rounded-full bg-slate-50 p-5 text-slate-400">
                                                    <RiSearchLine size={24} />
                                                </div>
                                                <span className="max-w-lg text-balance text-center text-sm text-slate-500">
                                                    We did our best, but we
                                                    couldn't find any quizzes
                                                    for your search.
                                                </span>
                                                {searchParams.get(
                                                    "linked_data_id",
                                                ) && (
                                                    <>
                                                        <Link
                                                            to="/quizzes"
                                                            className={buttonClass(
                                                                {
                                                                    intent: "ghost",
                                                                    size: "medium",
                                                                    icon: "right",
                                                                },
                                                            )}
                                                        >
                                                            <span>
                                                                Clear search
                                                            </span>
                                                            <RiCloseFill
                                                                size={16}
                                                            />
                                                        </Link>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </main>
                                {totalPages > 1 && (
                                    <>
                                        <hr />
                                        <div className="flex flex-col gap-4 text-start">
                                            <div className="flex items-end justify-center">
                                                <div className="flex gap-4">
                                                    <button
                                                        onClick={() =>
                                                            handlePageChange(
                                                                currentPage - 1,
                                                            )
                                                        }
                                                        disabled={
                                                            !data.previous
                                                        }
                                                        aria-label="Previous Page"
                                                        aria-disabled={
                                                            !data.previous
                                                        }
                                                        className={buttonClass({
                                                            intent: "tertiary",
                                                            icon: "left",
                                                        })}
                                                    >
                                                        <div
                                                            className={buttonInnerRing(
                                                                {
                                                                    intent: "tertiary",
                                                                },
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                        <RiArrowLeftLine
                                                            size={16}
                                                        />
                                                        <span>Previous</span>
                                                    </button>
                                                    <span className="flex w-20 items-center justify-center gap-1 rounded-1 bg-slate-100 px-4 text-center text-sm text-slate-400 ring ring-slate-200">
                                                        <span className="px-1 py-0.5 text-lg font-medium text-slate-800">
                                                            {currentPage}
                                                        </span>
                                                        <span className="text-xs">
                                                            /
                                                        </span>
                                                        <span className="px-1 py-0.5 text-base font-regular">
                                                            {totalPages}
                                                        </span>
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            handlePageChange(
                                                                currentPage + 1,
                                                            )
                                                        }
                                                        disabled={!data.next}
                                                        aria-disabled={
                                                            !data.next
                                                        }
                                                        aria-label="Next"
                                                        className={buttonClass({
                                                            intent: "tertiary",
                                                            icon: "right",
                                                        })}
                                                    >
                                                        <div
                                                            className={buttonInnerRing(
                                                                {
                                                                    intent: "tertiary",
                                                                },
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                        <span>Next Page</span>
                                                        <RiArrowRightLine
                                                            size={16}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </>
                                )}
                            </>
                        );
                    }}
                </Await>
            </Suspense>
        </div>
    );
};
