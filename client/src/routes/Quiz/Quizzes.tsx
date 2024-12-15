import { Portal } from "@ariakit/react";
import {
    RiAddFill,
    RiArrowLeftLine,
    RiArrowRightLine,
    RiCloseFill,
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
import { QuizLoading } from "../_loading";
import { userLoader } from "../Home/Home.data";
import { quizzesLoader } from "./Quizzes.data";

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
            <Suspense fallback={<QuizLoading />}>
                <Await resolve={quizzesData}>
                    {(data) => {
                        const totalPages = Math.ceil(data.count / perPage);
                        const description = logged_in
                            ? `This is your time to shine, ${user.full_name}`
                            : "Test your knowledge of various topics. Log in to track your progress.";

                        return (
                            <>
                                <PageHead
                                    title="Quizzes"
                                    description={description}
                                />
                                <aside className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-4 sm:flex-row">
                                            <div className="flex flex-grow items-end gap-2">
                                                <TagSearch
                                                    onTagSelect={(tag) => {
                                                        const newParams =
                                                            new URLSearchParams(
                                                                searchParams,
                                                            );
                                                        if (tag) {
                                                            newParams.set(
                                                                "linked_data_id",
                                                                tag.id.replace(
                                                                    "bn:",
                                                                    "",
                                                                ),
                                                            );
                                                        } else {
                                                            newParams.delete(
                                                                "linked_data_id",
                                                            );
                                                        }
                                                        setSearchParams(
                                                            newParams,
                                                        );
                                                    }}
                                                    inputRef={searchInputRef}
                                                />
                                            </div>
                                            <div></div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {[
                                            "newest",
                                            "oldest",
                                            "popular",
                                            "most liked",
                                        ].map((option) => (
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
                                                        newParams.set(
                                                            "sort",
                                                            option,
                                                        );
                                                        setSearchParams(
                                                            newParams,
                                                        );
                                                    }}
                                                    className="sr-only"
                                                />
                                                <span
                                                    className={radioOptionClass(
                                                        {
                                                            selected:
                                                                sortBy ===
                                                                option,
                                                        },
                                                    )}
                                                >
                                                    {option === "newest" &&
                                                        "Newest"}
                                                    {option === "oldest" &&
                                                        "Oldest"}
                                                    {option === "popular" &&
                                                        "Most Popular"}
                                                    {option === "most liked" &&
                                                        "Most Liked"}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </aside>
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
                                        <div className="flex w-full items-center gap-6 bg-slate-100 px-6 py-2">
                                            <div className="py-2 text-slate-500">
                                                No quizzes found
                                            </div>
                                            {searchParams.get(
                                                "linked_data_id",
                                            ) && (
                                                <>
                                                    <Link
                                                        to="/quizzes"
                                                        className={buttonClass({
                                                            intent: "ghost",
                                                            size: "medium",
                                                            icon: "right",
                                                        })}
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

                                <Portal className="fixed bottom-10 right-10 z-10">
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
                                </Portal>
                            </>
                        );
                    }}
                </Await>
            </Suspense>
        </div>
    );
};
