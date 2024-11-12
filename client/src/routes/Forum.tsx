import {
    Button,
    Dialog,
    DialogHeading,
    Form,
    FormError,
    FormInput,
    FormLabel,
    FormSubmit,
} from "@ariakit/react";
import { RiAddLine } from "@remixicon/react";
import { useState } from "react";
import { useLoaderData, useRouteLoaderData } from "react-router-typesafe";
import { ForumCard } from "../components/forum-card";
import { PageHead } from "../components/page-head";
import { forumLoader } from "./Forum.data";
import { homeLoader } from "./Home.data";
import "./styles.css";

export const Forum = () => {
    const [creatingPost, setCreatingPost] = useState(false);
    const data = useLoaderData<typeof forumLoader>();
    const { user, logged_in } =
        useRouteLoaderData<typeof homeLoader>("home-main");
    const description = logged_in
        ? `This is your time to shine ${user.full_name}`
        : "Test your knowledge of various topics. Log in to track your progress.";
    form.useSubmit(async (state) => {
        alert(JSON.stringify(state.values));
    });
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
            <Button
                onClick={() => setCreatingPost(true)}
                className="fixed bottom-8 right-8 flex size-12 items-center justify-center rounded-full bg-blue-500 hover:shadow-md"
            >
                <RiAddLine color="white" size="24px"></RiAddLine>
            </Button>
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
                    store={form}
                    aria-labelledby="add-new-participant"
                    className="wrapper"
                >
                    <div>
                        <FormInput
                            type="text"
                            name={form.names.title}
                            placeholder="Post Title"
                            className="input"
                            required
                        />
                        <FormError name={form.names.title} className="error" />
                    </div>
                    <div>
                        <textarea name={form.names.body}></textarea>
                        <FormError name={form.names.title} className="error" />
                    </div>
                    <div>
                        <span>Tags:</span>
                    </div>
                    <div>
                        <FormLabel name={form.names.title}>Email</FormLabel>
                        <FormInput
                            type="text"
                            name={form.names.title}
                            placeholder="johndoe@example.com"
                            className="input"
                            required
                        />
                        <FormError name={form.names.title} className="error" />
                    </div>
                    <FormSubmit
                        className="flex h-10 w-40 items-center justify-center rounded-4 bg-blue-500 hover:shadow-md"
                        onClick={() => setCreatingPost(false)}
                    >
                        Post
                    </FormSubmit>
                </Form>
            </Dialog>
        </div>
    );
};
