import { Link, useSearchParams } from "react-router-dom";
import { useLoaderData, useRouteLoaderData } from "react-router-typesafe";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { ForumQuestionCard } from "../../components/forum-card";
import { inputClass } from "../../components/input";
import { PageHead } from "../../components/page-head";

import { Portal } from "@ariakit/react";
import { RiAddFill } from "@remixicon/react";
import { homeLoader } from "../Home/Home.data";
import { forumLoader } from "./Forum.data";

export const Forum = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const data = useLoaderData<typeof forumLoader>();
    const allTagsInPage = data.results.flatMap((question) => question.tags);
    const selectedTagId = searchParams.get("tag");
    const { user, logged_in } =
        useRouteLoaderData<typeof homeLoader>("home-main");
    const description = logged_in
        ? `There you engage with community, ${user.full_name}`
        : "Engage with the community, ask questions, and get help from other people.";

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
        newParams.set("page", "1");
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

    const uniqueTags = Array.from(
        new Map(allTagsInPage.map((tag) => [tag.linked_data_id, tag])).values(),
    );

    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <PageHead title="Forum" description={description} />
            {/* <aside className="max-w-lg">
                <Form
                    aria-labelledby="add-new-post"
                    className="w-full"
                    method="POST"
                >
                    <div className="flex w-full flex-col gap-4">
                        <input
                            aria-label="Title"
                            type="text"
                            name="title"
                            placeholder="Question Title"
                            className={inputClass()}
                            required
                            maxLength={100}
                            minLength={1}
                        />
                        <textarea
                            name="question"
                            aria-label="Question"
                            placeholder="Write your question here..."
                            className={inputClass()}
                            required
                            maxLength={1000}
                            minLength={1}
                            rows={4}
                        />
                        <div className="flex flex-col gap-2">
                            <label htmlFor="tags">Tags</label>
                            <select
                                id="tags"
                                name="tags"
                                multiple
                                className={`${inputClass()} w-full`}
                                required
                            >
                                {uniqueTags.map((tag) => (
                                    <option
                                        key={tag.linked_data_id}
                                        value={tag.linked_data_id}
                                        data-linked-id={tag.linked_data_id}
                                        data-description={tag.description}
                                    >
                                        {tag.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className={buttonClass({ intent: "primary" })}
                        >
                            <div
                                className={buttonInnerRing({
                                    intent: "primary",
                                })}
                                aria-hidden="true"
                            />
                            <span>Post</span>
                        </button>
                    </div>
                </Form>
            </aside> */}
            <aside className="flex flex-col items-stretch justify-stretch gap-10">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-4">
                            <fieldset className="flex flex-col gap-2">
                                <label
                                    htmlFor="perPage"
                                    className="text-sm text-slate-500"
                                >
                                    Show forum questions per page:
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
                            <div>
                                <select
                                    id="tagFilter"
                                    value={selectedTagId || ""}
                                    onChange={handleTagChange}
                                    className={`${inputClass()} w-48`}
                                >
                                    <option value="">All Tags</option>
                                    {uniqueTags.map((tag) => (
                                        <option
                                            key={tag.linked_data_id}
                                            value={tag.linked_data_id}
                                        >
                                            {tag.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
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
                                    aria-hidden="true"
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
                                    aria-hidden="true"
                                />
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
            <main>
                <div className="flex w-full flex-col items-center gap-6">
                    {data.results
                        .filter(
                            (post) =>
                                !selectedTagId ||
                                post.tags.some(
                                    (tag) =>
                                        tag.linked_data_id === selectedTagId,
                                ),
                        )
                        .map((post) => (
                            <ForumQuestionCard
                                onTagClick={(tag) =>
                                    setSearchParams(
                                        new URLSearchParams({ tag }),
                                    )
                                }
                                key={post.id}
                                question={post}
                            />
                        ))}
                </div>
            </main>
            <Portal className="fixed bottom-10 right-10 z-10">
                <Link
                    to="/forum/new"
                    className={buttonClass({ intent: "primary", icon: "left" })}
                >
                    <span className={buttonInnerRing({ intent: "primary" })} />
                    <RiAddFill size={20} />
                    <span>New Forum Question</span>
                </Link>
            </Portal>
        </div>
    );
};
