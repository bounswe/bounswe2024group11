import { Button, Separator } from "@ariakit/react";
import { RiArrowDownLine, RiArrowUpLine } from "@remixicon/react";
import { Answer } from "../types/forum";
import { getRelativeTime } from "../utils";
import { Avatar } from "./avatar";

type ForumAnswerCardProps = {
    answer: Answer;
    key: string;
};

export const ForumAnswerCard = ({ answer, key }: ForumAnswerCardProps) => {
    return (
        <div
            key={key}
            aria-label={answer.answer + " by " + answer.author.username}
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
                        <p className="text-sm text-slate-500">
                            {answer.answer}
                        </p>
                    </div>
                </div>
            </div>
            <Separator className="w-full border-slate-200" />
            <div className="flex w-full flex-row justify-end">
                <div className="flex flex-row items-center gap-2">
                    <Button
                        aria-label="Upvote"
                        className="flex size-8 items-center justify-center rounded-2 bg-slate-100"
                    >
                        <RiArrowUpLine />
                    </Button>
                    <p className="w-6 text-center text-sm text-slate-900">
                        {answer.upvotes_count && answer.downvotes_count
                            ? answer.upvotes_count - answer.downvotes_count
                            : 0}
                    </p>
                    <Button
                        aria-label="Downvote"
                        className="flex size-8 items-center justify-center rounded-2 border border-slate-200"
                    >
                        <RiArrowDownLine />
                    </Button>
                </div>
            </div>
        </div>
    );
};
