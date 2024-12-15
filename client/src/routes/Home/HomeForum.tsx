import { Button } from "@ariakit/react";
import { useState } from "react";
import { buttonClass } from "../../components/button";
import { ForumQuestionCard } from "../../components/forum-card";
import { ForumQuestion } from "../Forum/Forum.schema";
import { INITIAL_DISPLAY_COUNT, LOAD_MORE_COUNT } from "./Home";

export const HomeForumFeed = ({
    forumQuestions,
    title,
}: {
    forumQuestions: ForumQuestion[];
    title: string;
}) => {
    const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
    const displayedForums = forumQuestions.slice(0, displayCount);

    const hasMore = displayCount < forumQuestions.length;

    return (
        <section className="flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-medium text-slate-900">
                <span>{title}</span>
                <span className="rounded-2 bg-slate-100 px-2 py-1 text-base font-regular text-slate-700">
                    {displayedForums.length}
                </span>
            </h2>
            <div className="grid w-full grid-cols-1 flex-col items-center gap-10 md:grid-cols-2">
                {displayedForums.map((post) => (
                    <ForumQuestionCard
                        key={post.id}
                        question={post}
                    ></ForumQuestionCard>
                ))}
            </div>
            {hasMore && (
                <div className="mt-4 flex justify-center">
                    <Button
                        onClick={() =>
                            setDisplayCount((prev) => prev + LOAD_MORE_COUNT)
                        }
                        className={buttonClass({
                            intent: "primary",
                            size: "medium",
                        })}
                    >
                        Load More
                    </Button>
                </div>
            )}
        </section>
    );
};
