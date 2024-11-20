import { Button } from "@ariakit/react";
import { RiAddLine } from "@remixicon/react";
import { useState } from "react";
import { Form, useSearchParams } from "react-router-dom";
import { useLoaderData, useRouteLoaderData } from "react-router-typesafe";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { ForumQuestionCard } from "../../components/forum-card";
import { inputClass } from "../../components/input";
import { PageHead } from "../../components/page-head";

import { homeLoader } from "../Home/Home.data";
import { forumLoader } from "./Forum.data";

export const Forum = () => {
    const [creatingPost, setCreatingPost] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const data = useLoaderData<typeof forumLoader>();
    const { user, logged_in } =
        useRouteLoaderData<typeof homeLoader>("home-main");
    const description = logged_in
        ? `This is your time to shine ${user.full_name}`
        : "Test your knowledge of various topics. Log in to track your progress.";

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

    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <PageHead title="Forum" description={description} />
            <aside className="max-w-lg">
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
                                <option
                                    value="tag1"
                                    data-linked-id="ld_tag1"
                                    data-description="Description for tag 1"
                                >
                                    Tag 1
                                </option>
                                <option
                                    value="tag2"
                                    data-linked-id="ld_tag2"
                                    data-description="Description for tag 2"
                                >
                                    Tag 2
                                </option>
                                <option
                                    value="tag3"
                                    data-linked-id="ld_tag3"
                                    data-description="Description for tag 3"
                                >
                                    Tag 3
                                </option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className={buttonClass({ intent: "primary" })}
                            onClick={() => setCreatingPost(false)}
                        >
                            <div
                                className={buttonInnerRing({
                                    intent: "primary",
                                })}
                            />
                            <span>Post</span>
                        </button>
                    </div>
                </Form>
            </aside>
            <main className="flex flex-col items-stretch justify-stretch gap-10">
                <div className="flex flex-col gap-4">
                    {/* Pagination Controls */}
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
                {/* Forum Questions */}
                <div className="flex w-full flex-col items-center gap-6">
                    {data.results.map((post) => (
                        <ForumQuestionCard key={post.id} question={post} />
                    ))}
                </div>
            </main>
            {/* Floating Add Question Button */}
            <div hidden={!logged_in}>
                <Button
                    aria-labelledby="add-new-post"
                    onClick={() => setCreatingPost(true)}
                    className={`${buttonClass({
                        intent: "primary",
                        rounded: "full",
                        position: "fixed",
                    })} bottom-8 right-8 size-12`}
                >
                    <div
                        className={buttonInnerRing({
                            intent: "primary",
                            rounded: "full",
                        })}
                    />
                    <RiAddLine color="white" size="24px"></RiAddLine>
                </Button>
            </div>
        </div>
    );
};
