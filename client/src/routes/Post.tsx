import { Radio, RadioGroup, RadioProvider, useFormStore } from "@ariakit/react";
import { Form, useSearchParams } from "react-router-dom";
import { useLoaderData, useRouteLoaderData } from "react-router-typesafe";
import { buttonClass } from "../components/button";
import { ForumAnswerCard } from "../components/forum-answer-card";
import { ForumCard } from "../components/forum-card";
import { inputClass } from "../components/input";
import { homeLoader } from "./Home.data";
import { postLoader } from "./Post.data";

export const PostPage = () => {
    const data = useLoaderData<typeof postLoader>();
    const { user, logged_in } =
        useRouteLoaderData<typeof homeLoader>("home-main");
    const [searchParams, setSearchParams] = useSearchParams();
    const formStore = useFormStore({
        defaultValues: {
            selectedValue: searchParams.get("sort") || "upvote",
        },
    });

    const handleRadioChange = (value: string) => {
        formStore.setValue("selectedValue", value);
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("sort", value);
        setSearchParams(newSearchParams);
    };
    const description = logged_in
        ? `This is your time to shine ${user.full_name}`
        : "Test your knowledge of various topics. Log in to track your progress.";
    return (
        <div className="container flex w-full max-w-screen-xl flex-col items-center gap-8 py-12">
            <main className="flex w-full flex-col items-center justify-center gap-10">
                <ForumCard key={data.post.id} post={data.post}></ForumCard>
                <RadioProvider>
                    <RadioGroup>
                        <label className="label">
                            <Radio
                                className="radio"
                                value="upvote"
                                checked={
                                    formStore.getValue("selectedValue") ===
                                    "upvote"
                                }
                                onChange={() => handleRadioChange("upvote")}
                            />
                            Most Upvoted
                        </label>
                        <label className="label">
                            <Radio
                                className="radio"
                                value="newest"
                                checked={
                                    formStore.getValue("selectedValue") ===
                                    "newest"
                                }
                                onChange={() => handleRadioChange("newest")}
                            />
                            Newest
                        </label>
                        <label className="label">
                            <Radio
                                className="radio"
                                value="oldest"
                                checked={
                                    formStore.getValue("selectedValue") ===
                                    "oldest"
                                }
                                onChange={() => handleRadioChange("oldest")}
                            />
                            Oldest
                        </label>
                    </RadioGroup>
                </RadioProvider>
                <div className="flex w-full flex-col items-center justify-center">
                    {data.answers.map((answer) => {
                        return (
                            <ForumAnswerCard
                                key={answer.id}
                                answer={answer}
                            ></ForumAnswerCard>
                        );
                    })}
                </div>
                <Form
                    action={`/forum/${data.post.id}`}
                    method="POST"
                    aria-labelledby="add-new-answer"
                    className="flex w-full max-w-xl flex-col items-center justify-center gap-4"
                    hidden={!logged_in}
                >
                    <textarea
                        name="body"
                        placeholder="Write your comment..."
                        className={`${inputClass()} min-h-[100px] w-full resize-y`}
                        required
                        minLength={1}
                        aria-label="Comment text"
                    />
                    <button
                        type="submit"
                        className={`${buttonClass({ intent: "primary" })} w-full`}
                        disabled={!logged_in}
                    >
                        Post Comment
                    </button>
                </Form>
            </main>
        </div>
    );
};
