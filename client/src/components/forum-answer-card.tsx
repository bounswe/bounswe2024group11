import { Button, Separator } from "@ariakit/react";
import { RiArrowDownLine, RiArrowUpLine } from "@remixicon/react";
import { Link, useFetcher } from "react-router-dom";

import { Answer } from "../routes/Forum/Forum.schema";
import {
    downvoteForumAnswerAction,
    upvoteForumAnswerAction,
} from "../routes/Forum/Question.data";
import { getNumberDifference, getRelativeTime } from "../utils";
import { Avatar } from "./avatar";
import { toggleButtonClass } from "./button";

type ForumAnswerCardProps = {
    answer: Answer;
    key: string;
};

export const ForumAnswerCard = ({ answer, key }: ForumAnswerCardProps) => {
    const upvoteFetcher = useFetcher<typeof upvoteForumAnswerAction>();
    const downvoteFetcher = useFetcher<typeof downvoteForumAnswerAction>();
    return (
        <div
            key={key}
            aria-label={answer.answer + " by " + answer.author.username}
            className="relative flex w-full max-w-xl flex-col gap-3 bg-white px-6 pb-4 pt-6 shadow-none ring ring-slate-200 transition-all duration-200"
        >
            <div className="flex flex-col gap-3 pb-3">
                <div className="flex w-full items-center justify-between gap-3">
                    <Link
                        className="flex flex-row items-center justify-start gap-3"
                        to={`/profile/${answer.author.username}`}
                    >
                        <Avatar author={answer.author} size={32} />
                        <div className="flex flex-col items-start">
                            <p className="text-sm font-medium text-slate-900">
                                {answer.author.full_name}
                            </p>
                            <p className="text-sm text-slate-700">
                                @{answer.author.username}
                            </p>
                        </div>
                    </Link>
                    <p className="text-sm text-slate-600">
                        {getRelativeTime(new Date(answer.created_at))}
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-slate-900">{answer.answer}</p>
                    </div>
                </div>
            </div>
            <Separator className="w-full border-slate-200" />
            <div className="flex w-full flex-row justify-end">
                <div className="flex flex-row items-center gap-2">
                    <upvoteFetcher.Form
                        method="POST"
                        action={`/forum/${answer.forum_question}/upvoteAnswer`}
                    >
                        <input
                            type="hidden"
                            name="answer_id"
                            value={answer.id}
                        />
                        <input
                            type="hidden"
                            name="is_upvoted"
                            value={answer.is_upvoted || 0}
                        />
                        <Button
                            type="submit"
                            aria-label="Upvote"
                            className={toggleButtonClass({
                                intent: "upvote",
                                state: answer.is_upvoted ? "on" : "off",
                            })}
                        >
                            <RiArrowUpLine size={16} />
                        </Button>
                    </upvoteFetcher.Form>
                    <p className="w-6 text-center text-sm text-slate-900">
                        {getNumberDifference(
                            answer.upvotes_count,
                            answer.downvotes_count,
                        )}
                    </p>
                    <downvoteFetcher.Form
                        method="POST"
                        action={`/forum/${answer.forum_question}/downvoteAnswer`}
                    >
                        <input
                            type="hidden"
                            name="answer_id"
                            value={answer.id}
                        />
                        <input
                            type="hidden"
                            name="is_downvoted"
                            value={answer.is_downvoted || 0}
                        />
                        <Button
                            type="submit"
                            aria-label="Upvote"
                            className={toggleButtonClass({
                                intent: "downvote",
                                state: answer.is_downvoted ? "on" : "off",
                            })}
                        >
                            <RiArrowDownLine size={16} />
                        </Button>
                    </downvoteFetcher.Form>
                </div>
            </div>
        </div>
    );
};
