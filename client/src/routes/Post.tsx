import { Radio, RadioGroup, RadioProvider, useFormStore } from "@ariakit/react";
import { useSearchParams } from "react-router-dom";
import { useLoaderData, useRouteLoaderData } from "react-router-typesafe";
import { ForumAnswerCard } from "../components/forum-answer-card";
import { ForumCard } from "../components/forum-card";
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
            </main>
        </div>
    );
};
