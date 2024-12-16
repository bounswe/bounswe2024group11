import { Suspense, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
    Await,
    useLoaderData,
    useRouteLoaderData,
} from "react-router-typesafe";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { ForumQuestionCard } from "../../components/forum-card";
import { PageHead } from "../../components/page-head";

import { RiAddFill, RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import { radioOptionClass } from "../../components/radio-option";
import TagSearch from "../../components/tag-search";
import { snakeToTitle } from "../../utils";
import { ForumLoading } from "../_loading";
import { userLoader } from "../Home/Home.data";
import { forumLoader } from "./Forum.data";

export const Forum = () => {
    const { forumData } = useLoaderData<typeof forumLoader>();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState(
        searchParams.get("search") || "",
    );

    const { user, logged_in } =
        useRouteLoaderData<typeof userLoader>("home-main");

    const currentPage = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("per_page") || "10");
    const sortBy = searchParams.get("sort") || "newest";

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setSearchParams((old) => {
                if (searchTerm) {
                    old.set("search", searchTerm);
                } else {
                    old.delete("search");
                }
                return old;
            });
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, setSearchParams]);

    const handlePageChange = (page: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", page.toString());
        newParams.set("per_page", perPage.toString());
        setSearchParams(newParams);
    };

    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <Suspense fallback={<ForumLoading />}>
                <Await resolve={forumData}>
                    {(data) => {
                        const totalPages = Math.ceil(data.count / perPage);
                        const description = logged_in
                            ? `Where the magic happens - jump into the conversation ${user.full_name}!`
                            : "Engage with the community, ask questions, and get help from other people.";

                        return (
                            <>
                                <div className="flex justify-between">
                                    <div>
                                        <PageHead
                                            title="Forum"
                                            description={description}
                                        />

                                        <aside className="flex flex-col gap-6">
                                            <div className="flex flex-col gap-4">
                                                <div className="flex flex-col gap-4 sm:flex-row">
                                                    <div className="flex flex-grow items-center gap-2">
                                                        <TagSearch
                                                            onTagSelect={(
                                                                tag,
                                                            ) => {
                                                                const newParams =
                                                                    new URLSearchParams(
                                                                        searchParams,
                                                                    );
                                                                if (tag) {
                                                                    newParams.set(
                                                                        "linked_data_id",
                                                                        tag.id,
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
                                                            inputRef={
                                                                searchInputRef
                                                            }
                                                        />
                                                    </div>
                                                    <div></div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                {[
                                                    "newest",
                                                    "oldest",
                                                    "highest_rated",
                                                    "most_popular",
                                                ].map((option) => (
                                                    <label
                                                        key={option}
                                                        className="flex cursor-pointer items-center gap-2"
                                                    >
                                                        <input
                                                            type="radio"
                                                            value={option}
                                                            checked={
                                                                sortBy ===
                                                                option
                                                            }
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
                                                            {snakeToTitle(
                                                                option,
                                                            )}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </aside>
                                    </div>
                                    <div className="flex flex-col justify-end">
                                        <Link
                                            to="/forum/new"
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
                                            <span>New Forum Question</span>
                                        </Link>
                                    </div>
                                </div>

                                <main>
                                    <div className="grid w-full grid-cols-1 flex-col items-center gap-10 md:grid-cols-2">
                                        {data.results.map((post) => (
                                            <ForumQuestionCard
                                                onTagClick={() => {}}
                                                key={post.id}
                                                question={post}
                                            />
                                        ))}
                                    </div>
                                </main>
                                <hr />
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-end justify-center">
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() =>
                                                    handlePageChange(
                                                        currentPage - 1,
                                                    )
                                                }
                                                disabled={!data.previous}
                                                aria-label="Previous Page"
                                                aria-disabled={!data.previous}
                                                className={buttonClass({
                                                    intent: "tertiary",
                                                    icon: "left",
                                                })}
                                            >
                                                <div
                                                    className={buttonInnerRing({
                                                        intent: "tertiary",
                                                    })}
                                                    aria-hidden="true"
                                                />
                                                <RiArrowLeftLine size={16} />
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
                                                aria-disabled={!data.next}
                                                aria-label="Next"
                                                className={buttonClass({
                                                    intent: "tertiary",
                                                    icon: "right",
                                                })}
                                            >
                                                <div
                                                    className={buttonInnerRing({
                                                        intent: "tertiary",
                                                    })}
                                                    aria-hidden="true"
                                                />
                                                <span>Next Page</span>
                                                <RiArrowRightLine size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </>
                        );
                    }}
                </Await>
            </Suspense>
        </div>
    );
};
