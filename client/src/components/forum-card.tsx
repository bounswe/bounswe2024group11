import { Button, Separator } from "@ariakit/react";
import {
    RiArrowDownLine,
    RiArrowUpLine,
    RiBookmark2Line,
} from "@remixicon/react";
import { Link } from "react-router-dom";
import { PostOverview } from "../types/forum";
import { pluralize } from "../utils";
import { Avatar } from "./avatar";

type ForumCardProps = {
    post: PostOverview;
};

export const ForumCard = ({ post }: ForumCardProps) => {
    console.log(post);
    return (
        <Link
            to={`/forum/${post.id}`}
            aria-label={`${post.title} by ${post.author.full_name}`}
            className="relative flex w-full max-w-xl flex-col gap-3 rounded-2 bg-white px-6 pb-4 pt-6 shadow-none ring ring-slate-200 transition-all duration-200"
        >
            <div className="flex flex-col gap-3 pb-3">
                <div className="flex w-full items-center justify-between gap-3">
                    <div className="flex flex-row items-center justify-start gap-3">
                        <Avatar author={post.author} size={24} />
                        <p className="text-sm text-slate-500">
                            {post.author.username}
                        </p>
                    </div>
                    <Button className="flex size-9 items-center justify-center rounded-1 bg-slate-100">
                        <RiBookmark2Line className="size-5" />
                    </Button>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl font-semibold text-slate-900">
                            {post.title}
                        </h2>
                        <p className="text-sm text-slate-500">
                            {post.question}
                        </p>
                    </div>
                    <div className="flex flex-row gap-4">
                        {post.tags.map(({ name }) => (
                            <span className="rounded-2 border border-slate-200 bg-white px-2 py-1 text-xs text-slate-500">
                                {name.toLocaleUpperCase()}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <Separator className="w-full border-slate-200" />
            <div className="flex w-full flex-row justify-between">
                <div className="flex flex-row items-center gap-1">
                    <RiBookmark2Line className="size-5 text-slate-500" />
                    <p className="text-xs text-slate-500">
                        {pluralize(post.answers_count, "answer", "answers")}
                    </p>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <Button
                        aria-label="Upvote"
                        className="flex size-8 items-center justify-center rounded-2 bg-slate-100"
                    >
                        <RiArrowUpLine />
                    </Button>
                    <p className="text-slate- w-6 text-sm">
                        {post.answers_count}
                    </p>
                    <Button
                        aria-label="Downvote"
                        className="flex size-8 items-center justify-center rounded-2 border border-slate-200"
                    >
                        <RiArrowDownLine />
                    </Button>
                </div>
            </div>
        </Link>
    );
};
