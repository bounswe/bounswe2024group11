import { Button } from "@ariakit/react";
import { useState } from "react";
import { ForumQuestion } from "../routes/Forum/Forum.schema";
import { buttonClass } from "./button";
import { ForumQuestionCard } from "./forum-card";

const INITIAL_DISPLAY_COUNT = 6;
const LOAD_MORE_COUNT = 6;

export const BookmarkedForum = ({ forums }: { forums: ForumQuestion[] }) => {
    const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);

    const displayedForums = forums.slice(0, displayCount);
    const hasMore = displayCount < forums.length;

    return (
        <section aria-label="User posts" className="flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-medium text-slate-900">
                <span>Bookmarked Forum Questions</span>
                <span className="rounded-2 bg-slate-100 px-2 py-1 text-base font-regular text-slate-700">
                    {forums.length}
                </span>
            </h2>
            <div className="grid w-full grid-cols-1 flex-col items-center gap-8 md:grid-cols-2">
                {displayedForums.map((post) => (
                    <ForumQuestionCard
                        onTagClick={() => {}}
                        key={post.id}
                        question={post}
                    />
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
