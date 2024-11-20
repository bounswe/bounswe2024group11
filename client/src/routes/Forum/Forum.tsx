import { Button, Dialog, DialogHeading } from "@ariakit/react";
import { RiAddLine } from "@remixicon/react";
import { useState } from "react";
import { Form, useSearchParams } from "react-router-dom";
import { useLoaderData, useRouteLoaderData } from "react-router-typesafe";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { ForumQuestionCard } from "../../components/forum-card";
import { inputClass } from "../../components/input";
import { PageHead } from "../../components/page-head";

import { forumLoader } from "./Forum.data";

import { homeLoader } from "../Home/Home.data";

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
        if (perPage !== 10) {
            newParams.set("per_page", perPage.toString());
        }
        setSearchParams(newParams);
    };

    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <PageHead title="Forum" description={description} />
            <main className="flex flex-col items-stretch justify-stretch gap-10">
                <div className="mt-8 flex justify-center gap-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!data.previous}
                        aria-disabled={!data.previous}
                        className={buttonClass({
                            intent: "secondary",
                        })}
                    >
                        <div
                            className={buttonInnerRing({ intent: "secondary" })}
                        />
                        Previous
                    </button>
                    <span className="flex items-center">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!data.next}
                        aria-disabled={!data.next}
                        className={buttonClass({ intent: "secondary" })}
                    >
                        <div
                            className={buttonInnerRing({ intent: "secondary" })}
                        />
                        Next
                    </button>
                </div>
                <div className="flex w-full flex-col items-center gap-6">
                    {data.results.map((post) => (
                        <ForumQuestionCard key={post.id} question={post} />
                    ))}
                </div>
            </main>
            <div hidden={!logged_in}>
                <Button
                    aria-labelledby="add-new-post"
                    onClick={() => setCreatingPost(true)}
                    className={`${buttonClass({ intent: "primary", rounded: "full", position: "fixed" })} bottom-8 right-8 size-12`}
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
            <Dialog
                open={creatingPost}
                onClose={() => setCreatingPost(false)}
                backdrop={<div className="backdrop" />}
                className="dialog"
            >
                <DialogHeading className="heading">
                    Create New Question
                </DialogHeading>
                <Form
                    aria-labelledby="add-new-post"
                    className="w-full"
                    method="POST"
                    action="/forum"
                >
                    <div className="flex w-full flex-col gap-4">
                        <input
                            aria-label="Title"
                            type="text"
                            name="title"
                            placeholder="Post Title"
                            className={`${inputClass()} w-full`}
                            required
                        />

                        <textarea
                            name="body"
                            aria-label="Question Body"
                            placeholder="Question Body"
                            className={`${inputClass()} w-full`}
                        ></textarea>
                        <div className="flex flex-col gap-2">
                            <div>
                                <span>Tags:</span>
                            </div>
                        </div>
                        <button
                            aria-label="Post"
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
            </Dialog>
        </div>
    );
};
