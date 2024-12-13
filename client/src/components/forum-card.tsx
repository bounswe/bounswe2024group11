import { Button, Separator } from "@ariakit/react";
import {
    RiBookmark2Line,
    RiDeleteBinLine,
    RiThumbDownFill,
    RiThumbDownLine,
    RiThumbUpFill,
    RiThumbUpLine,
} from "@remixicon/react";
import { Link, useFetcher } from "react-router-dom";

import { cva } from "cva";
import { useState } from "react";
import { ForumQuestion } from "../routes/Forum/Forum.schema";
import {
    bookmarkForumAction,
    deleteForumAction,
    downvoteForumAction,
    upvoteForumAction,
} from "../routes/Forum/Question.data";
import { RelevantQuiz } from "../routes/Forum/RelevantQuizQuestion";
import { getNumberDifference, pluralize } from "../utils";
import { Avatar } from "./avatar";
import { toggleButtonClass } from "./button";
type ForumCardProps = {
    question: ForumQuestion;
    onTagClick?: (tag: string) => void;
};
const forumPhotoClass = cva("h-full w-full ring-1 ring-slate-200", {
    variants: {
        view: {
            cover: "rounded-1 object-cover",
            contain: "object-contain",
        },
    },
});

export const ForumQuestionCard = ({ question, onTagClick }: ForumCardProps) => {
    const upvoteFetcher = useFetcher<typeof upvoteForumAction>();
    const downvoteFetcher = useFetcher<typeof downvoteForumAction>();
    const bookmarkFetcher = useFetcher<typeof bookmarkForumAction>();
    const deleteFetcher = useFetcher<typeof deleteForumAction>();
    const [photoView, setPhotoView] = useState<"cover" | "contain">("cover");
    const buttonLabel = `Toggle image view mode (currently ${photoView})`;
    return (
        <div className="relative flex h-full w-full flex-col gap-3 rounded-2 bg-white px-6 pb-4 pt-6 shadow-none ring ring-slate-200 transition-all duration-200 hover:ring-slate-300">
            <div className="flex flex-1 flex-col gap-3 pb-3">
                <div className="flex w-full items-center justify-between gap-3">
                    <Link
                        className="flex flex-row items-center justify-start gap-3"
                        to={`/profile/${question.author.username}`}
                    >
                        <Avatar author={question.author} size={32} />
                        <div className="flex flex-col items-start">
                            <p className="font-medium text-slate-900">
                                {question.author.full_name}
                            </p>
                            <p className="text-sm text-slate-700">
                                @{question.author.username}
                            </p>
                        </div>
                    </Link>
                    <div className="flex flex-row items-center justify-end gap-3">
                        {question.is_my_forum_question && (
                            <deleteFetcher.Form
                                method="POST"
                                action={`/forum/${question.id}/delete`}
                            >
                                <input
                                    type="hidden"
                                    name="post_id"
                                    value={question.id}
                                />
                                <input
                                    type="hidden"
                                    name="is_bookmarked"
                                    value={question.is_bookmarked || 0}
                                />
                                <Button
                                    type="submit"
                                    aria-label="Bookmark"
                                    className={toggleButtonClass({
                                        intent: "delete",
                                        state: "on",
                                    })}
                                >
                                    <RiDeleteBinLine size={16} />
                                </Button>
                            </deleteFetcher.Form>
                        )}
                        <bookmarkFetcher.Form
                            method="POST"
                            action={`/forum/${question.id}/bookmark`}
                        >
                            <input
                                type="hidden"
                                name="post_id"
                                value={question.id}
                            />
                            <input
                                type="hidden"
                                name="is_bookmarked"
                                value={question.is_bookmarked || 0}
                            />
                            <Button
                                type="submit"
                                aria-label="Bookmark"
                                className={toggleButtonClass({
                                    intent: "bookmark",
                                    state: question.is_bookmarked
                                        ? "on"
                                        : "off",
                                })}
                            >
                                <RiBookmark2Line size={16} />
                            </Button>
                        </bookmarkFetcher.Form>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <Link
                        to={`/forum/${question.id}`}
                        aria-label={`${question.title} by ${question.author.full_name}`}
                        className="group flex flex-col gap-2"
                    >
                        <h2 className="text-xl font-semibold text-slate-900 underline-offset-2 group-hover:underline">
                            {question.title}
                        </h2>
                        <p className="text-slate-700">{question.question}</p>
                    </Link>
                    {question.image_url && (
                        <div className="relative h-48 w-full">
                            <Button
                                onClick={() => {
                                    setPhotoView(
                                        photoView === "cover"
                                            ? "contain"
                                            : "cover",
                                    );
                                }}
                                aria-label={buttonLabel}
                                className="h-full w-full"
                            >
                                <img
                                    src={question.image_url}
                                    alt="Question Image"
                                    className={forumPhotoClass({
                                        view: photoView,
                                    })}
                                    role="img"
                                    aria-hidden="true"
                                />
                            </Button>
                        </div>
                    )}

                    <div className="flex flex-row gap-2">
                        {question.tags.map(
                            ({ name, linked_data_id, description }) => (
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onTagClick?.(linked_data_id);
                                    }}
                                    aria-label={name}
                                    key={linked_data_id}
                                    className="rounded-2 border border-slate-200 bg-white px-2 py-1 text-xs text-slate-500"
                                    data-linked-id={linked_data_id}
                                    data-description={description}
                                >
                                    {name.toLocaleUpperCase()}
                                </Button>
                            ),
                        )}
                    </div>
                </div>
            </div>
            {question.quiz_question && (
                <RelevantQuiz
                    quizType={question.quiz_question_type}
                    quizQuestion={question.quiz_question}
                />
            )}
            <Separator className="w-full border-slate-200" />
            <div className="flex w-full flex-row justify-between">
                <Link
                    className="flex flex-row items-center gap-1 underline-offset-2 hover:underline"
                    to={`/forum/${question.id}`}
                >
                    <RiBookmark2Line className="size-5 text-slate-500" />
                    <p className="text-sm text-slate-500">
                        {pluralize(question.answers_count, "answer", "answers")}
                    </p>
                </Link>
                <div className="flex flex-row items-center gap-2">
                    <upvoteFetcher.Form
                        method="POST"
                        action={`/forum/${question.id}/upvote`}
                    >
                        <input
                            type="hidden"
                            name="post_id"
                            value={question.id}
                        />
                        <input
                            type="hidden"
                            name="is_upvoted"
                            value={question.is_upvoted || 0}
                        />
                        <Button
                            type="submit"
                            aria-label="Upvote"
                            className={toggleButtonClass({
                                intent: "upvote",
                                state: question.is_upvoted ? "on" : "off",
                            })}
                        >
                            {question.is_upvoted ? (
                                <RiThumbUpFill size={16} />
                            ) : (
                                <RiThumbUpLine size={16} />
                            )}
                        </Button>
                    </upvoteFetcher.Form>
                    <p className="text-slate- w-6 text-center text-sm">
                        {getNumberDifference(
                            question.upvotes_count,
                            question.downvotes_count,
                        )}
                    </p>
                    <downvoteFetcher.Form
                        method="POST"
                        action={`/forum/${question.id}/downvote`}
                    >
                        <input
                            type="hidden"
                            name="post_id"
                            value={question.id}
                        />
                        <input
                            type="hidden"
                            name="is_downvoted"
                            value={question.is_downvoted || 0}
                        />
                        <Button
                            type="submit"
                            aria-label="Downvote"
                            className={toggleButtonClass({
                                intent: "downvote",
                                state: question.is_downvoted ? "on" : "off",
                            })}
                        >
                            {question.is_downvoted ? (
                                <RiThumbDownFill size={16} />
                            ) : (
                                <RiThumbDownLine size={16} />
                            )}
                        </Button>
                    </downvoteFetcher.Form>
                </div>
            </div>
        </div>
    );
};
