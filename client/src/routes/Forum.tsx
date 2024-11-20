import { Button, Dialog, DialogHeading } from "@ariakit/react";
import { RiAddLine } from "@remixicon/react";
import { useState } from "react";
import { Form } from "react-router-dom";
import {
    useActionData,
    useLoaderData,
    useRouteLoaderData,
} from "react-router-typesafe";
import { buttonClass, buttonInnerRing } from "../components/button";
import { ForumCard } from "../components/forum-card";
import { inputClass } from "../components/input";
import { PageHead } from "../components/page-head";
import AutocompleteTag from "../components/tagselect";
import { Tag } from "../types/post";
import { createPostAction, forumLoader } from "./Forum.data";
import { homeLoader } from "./Home.data";

import "./styles.css";

const availableTags: Tag[] = [
    { id: "Writing", name: "Writing" },
    { id: "Grammar", name: "Grammar" },
    { id: "Word", name: "Word" },
    { id: "Vocabulary", name: "Vocabulary" },
    { id: "English", name: "English" },
    // Add more tags as needed
];

export const Forum = () => {
    const actionData = useActionData<typeof createPostAction>();
    const [creatingPost, setCreatingPost] = useState(false);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const data = useLoaderData<typeof forumLoader>();
    const { user, logged_in } =
        useRouteLoaderData<typeof homeLoader>("home-main");
    const description = logged_in
        ? `This is your time to shine ${user.full_name}`
        : "Test your knowledge of various topics. Log in to track your progress.";
    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <PageHead title="Forum" description={description} />
            <main className="items-stretch justify-stretch">
                <div className="flex w-full flex-col items-center gap-6">
                    {data.posts.map((post) => (
                        <ForumCard key={post.id} post={post} />
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

                            <AutocompleteTag
                                availableTags={availableTags}
                                onTagsChange={setSelectedTags}
                                initialTags={selectedTags}
                            ></AutocompleteTag>
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
