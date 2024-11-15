import { Button, Separator } from "@ariakit/react";
import { RiArrowDownLine, RiArrowUpLine } from "@remixicon/react";
import { useState } from "react";
import { useRouteLoaderData } from "react-router-typesafe";
import { homeLoader } from "../routes/Home.data";
import { Answer } from "../types/post";
import { BASE_URL, getRelativeTime, logger } from "../utils";
import { Avatar } from "./avatar";

type ForumAnswerCardProps = {
    answer: Answer;
    key: string;
};

export const ForumAnswerCard = ({ answer, key }: ForumAnswerCardProps) => {
    const [userVote, setUserVote] = useState<"upvote" | "downvote" | null>(
        answer.userVote || null,
    );
    const [numVotes, setNumVotes] = useState(
        answer.num_likes - answer.num_dislikes,
    );
    const { user, logged_in } =
        useRouteLoaderData<typeof homeLoader>("home-main");
    const handleVote = async (
        e: React.MouseEvent,
        voteType: "upvote" | "downvote",
    ) => {
        e.preventDefault();
        logger.log("Vote clicked");
        if (!logged_in) return;

        try {
            const response = await fetch(
                `${BASE_URL}/answers/${answer.id}/vote`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ voteType }),
                },
            );

            if (response.ok) {
                const updatedAnswer = await response.json();
                setUserVote(
                    voteType === updatedAnswer.userVote ? voteType : null,
                );
                setNumVotes(
                    updatedAnswer.num_likes - updatedAnswer.num_dislikes,
                );
            }
        } catch (error) {
            console.error("Vote failed:", error);
        }
    };

    return (
        <div
            key={key}
            aria-label={answer.text}
            className="relative flex w-full max-w-xl flex-col gap-3 bg-white px-6 pb-4 pt-6 shadow-none ring ring-slate-200 transition-all duration-200"
        >
            <div className="flex flex-col gap-3 pb-3">
                <div className="flex w-full items-center justify-between gap-3">
                    <div className="flex flex-row items-center justify-start gap-3">
                        <Avatar author={answer.author} size={24} />
                        <p className="text-sm text-slate-500">
                            {answer.author.username}
                        </p>
                    </div>
                    <p className="text-sm text-slate-500">
                        {getRelativeTime(new Date(answer.created_at))}
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm text-slate-500">{answer.text}</p>
                    </div>
                </div>
            </div>
            <Separator className="w-full border-slate-200" />
            <div className="flex w-full flex-row justify-end">
                <div className="flex flex-row items-center gap-2">
                    <Button
                        aria-label="Upvote"
                        onClick={(e) => handleVote(e, "upvote")}
                        className="flex size-8 items-center justify-center rounded-2 bg-slate-100"
                    >
                        <RiArrowUpLine
                            className={`size-5 ${userVote === "upvote" ? "text-orange-500" : "text-slate-900"}`}
                        />
                    </Button>
                    <p className="w-6 text-sm text-slate-900">{numVotes}</p>
                    <Button
                        aria-label="Downvote"
                        onClick={(e) => handleVote(e, "downvote")}
                        className="flex size-8 items-center justify-center rounded-2 border border-slate-200"
                    >
                        <RiArrowDownLine
                            className={`size-5 ${userVote === "downvote" ? "text-indigo-900" : "text-slate-900"}`}
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
};
