import { Button, Separator } from "@ariakit/react";
import {
    RiArrowDownLine,
    RiArrowUpLine,
    RiBookmark2Line,
} from "@remixicon/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PostOverview } from "../types/post";
import { BASE_URL, logger } from "../utils";
import { Avatar } from "./avatar";

type ForumCardProps = {
    post: PostOverview;
    key: string;
    logged_in: boolean;
};

export const ForumCard = ({ post, key, logged_in }: ForumCardProps) => {
    const [userVote, setUserVote] = useState<"upvote" | "downvote" | null>(
        post.userVote || null,
    );

    const handleVote = async (
        e: React.MouseEvent,
        voteType: "upvote" | "downvote",
    ) => {
        e.preventDefault(); // Prevent link navigation
        e.stopPropagation(); // Stop event bubbling

        if (!logged_in) return;

        try {
            const response = await fetch(`${BASE_URL}/forum/${post.id}/vote`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ voteType }),
            });

            if (response.ok) {
                const updatedPost = await response.json();
                setUserVote(
                    voteType === updatedPost.userVote ? voteType : null,
                );
            }
        } catch (error) {
            console.error("Vote failed:", error);
        }
    };

    const handleBookmark = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        logger.log(post.id);
    };

    return (
        <Link
            to={`/forum/${post.id}`}
            key={key}
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
                    <Button
                        onClick={handleBookmark}
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
                        {post.num_comments}{" "}
                        {post.num_comments === 1 ? "comment" : "comments"}
                    </p>
                </div>
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
                    <p className="text-sm text-slate-900">
                        {post.num_likes - post.num_dislikes}
                    </p>
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
        </Link>
    );
};
