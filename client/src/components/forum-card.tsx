import { Button, Separator } from "@ariakit/react";
import {
    RiArrowDownLine,
    RiArrowUpLine,
    RiBookmark2Line,
} from "@remixicon/react";
import { Link } from "react-router-dom";
import { Post } from "../routes/Forum.data";
import { logger } from "../utils";
import { Avatar } from "./avatar";

type forumCardProps = {
    post: Post;
    onClick: () => void;
    key: string;
};

export const ForumCard = ({ post, onClick, key }: forumCardProps) => {
    return (
        <div
            onClick={() => {
                onClick();
            }}
            key={key}
            aria-label={post.title}
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
                    <Button
                        onClick={() => {
                            logger.log(post.id);
                        }}
                        className="flex size-9 items-center justify-center rounded-1 bg-slate-100"
                    >
                        <RiBookmark2Line className="size-5 text-slate-500" />
                    </Button>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl font-semibold text-slate-900">
                            {post.title}
                        </h2>
                        <p className="text-sm text-slate-500">
                            {post.description}
                        </p>
                    </div>
                    <div className="flex flex-row gap-4">
                        {post.tags.map(({ name }) => {
                            return (
                                <Link
                                    to="#"
                                    className="rounded-2 border border-slate-200 bg-white px-2 py-1 text-xs text-slate-500"
                                >
                                    {name.toLocaleUpperCase()}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Separator className="w-full border-slate-200" />
            <div className="flex w-full flex-row justify-between">
                <div className="flex flex-row items-center gap-1">
                    <RiBookmark2Line className="size-5 text-slate-500" />
                    <p className="text-xs text-slate-500">
                        {post.num_comments}{" "}
                        {post.num_comments === 1 ? "comment" : "comments"}
                    </p>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <Button className="flex size-8 items-center justify-center rounded-2 bg-slate-100">
                        <RiArrowUpLine
                            className="size-5 text-slate-900"
                            onClick={() => {
                                logger.log("upvoted");
                            }}
                        />
                    </Button>
                    <p className="text-sm text-slate-900">
                        {post.num_likes - post.num_dislikes}
                    </p>
                    <Button className="flex size-8 items-center justify-center rounded-2 border border-slate-200">
                        <RiArrowDownLine
                            className="size-5 text-slate-900"
                            onClick={() => {
                                logger.log("downvoted");
                            }}
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
};
