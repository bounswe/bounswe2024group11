import * as Ariakit from "@ariakit/react";
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
import { getNumberDifference, getRelativeTime, pluralize } from "../utils";
import { Avatar } from "./avatar";
import { buttonClass, toggleButtonClass } from "./button";
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
    const [isOpen, setIsOpen] = useState(false);
    const buttonLabel = `Toggle image view mode (currently ${photoView})`;
    return (
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2 bg-slate-50 shadow-none ring ring-slate-200 transition-all duration-200">
            <div className="flex w-full items-center justify-between gap-3 bg-white px-6 py-3 ring ring-slate-200">
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
                            <Ariakit.PopoverProvider
                                open={isOpen}
                                setOpen={setIsOpen}
                                placement="bottom-end"
                            >
                                <Ariakit.PopoverDisclosure
                                    aria-label="Delete"
                                    className={toggleButtonClass({
                                        intent: "delete",
                                        state: "on",
                                    })}
                                >
                                    <RiDeleteBinLine size={16} />
                                </Ariakit.PopoverDisclosure>
                                <Ariakit.Popover className="overflow-hidden rounded-2 bg-slate-800 text-white shadow-lg ring ring-slate-900">
                                    <Ariakit.PopoverArrow className="arrow" />
                                    <div className="flex flex-col gap-1 px-4 py-4">
                                        <Ariakit.PopoverHeading className="text-base font-medium text-slate-100">
                                            Are you sure?
                                        </Ariakit.PopoverHeading>
                                        <Ariakit.PopoverDescription className="text-sm text-slate-300">
                                            We can't be arsed to bring this
                                            forum question back.
                                        </Ariakit.PopoverDescription>
                                    </div>
                                    <div className="flex justify-end gap-4 bg-slate-700 px-4 py-4">
                                        <Ariakit.Button
                                            type="submit"
                                            className={buttonClass({
                                                intent: "destructive",
                                                className:
                                                    "ring-offset-red-900",
                                            })}
                                        >
                                            Yes, delete
                                        </Ariakit.Button>
                                        <Ariakit.Button
                                            onClick={() => setIsOpen(false)}
                                            className={buttonClass({
                                                intent: "ghost",
                                            })}
                                        >
                                            No, cancel
                                        </Ariakit.Button>
                                    </div>
                                </Ariakit.Popover>
                            </Ariakit.PopoverProvider>
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
                                state: question.is_bookmarked ? "on" : "off",
                            })}
                        >
                            <RiBookmark2Line size={16} />
                        </Button>
                    </bookmarkFetcher.Form>
                </div>
            </div>
            <div className="flex flex-1 flex-col px-6">
                <Link
                    to={`/forum/${question.id}`}
                    aria-label={`${question.title} by ${question.author.full_name}`}
                    className="group flex flex-col gap-2 py-4"
                >
                    <h2 className="text-xl font-semibold text-slate-900 decoration-inherit decoration-1 underline-offset-4 transition-all group-hover:underline">
                        {question.title}
                    </h2>
                    <p className="text-slate-700 decoration-inherit decoration-1 underline-offset-2 group-hover:underline">
                        {question.question}
                    </p>
                </Link>
                {question.image_url && (
                    <div className="relative mb-4 h-full max-h-64 min-h-40 w-full">
                        <Button
                            onClick={() => {
                                setPhotoView(
                                    photoView === "cover" ? "contain" : "cover",
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
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "/forum-fallback-image.png";
                                }}
                            />
                        </Button>
                    </div>
                )}
                {question.tags.length > 0 && (
                    <div className="flex flex-1 flex-row items-end gap-2 pb-4">
                        {question.tags.map(
                            ({ name, linked_data_id, description }) => (
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onTagClick?.(linked_data_id);
                                    }}
                                    aria-label={name}
                                    key={linked_data_id}
                                    className="rounded-2 border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                                    data-linked-id={linked_data_id}
                                    data-description={description}
                                >
                                    {name.toLocaleUpperCase()}
                                </Button>
                            ),
                        )}
                    </div>
                )}
            </div>
            {question.quiz_question && (
                <div className="px-6 pb-4">
                    <RelevantQuiz
                        quizType={question.quiz_question_type}
                        quizQuestion={question.quiz_question}
                    />
                </div>
            )}
            <Separator className="w-full border-slate-200" />
            <div className="flex w-full flex-row justify-between bg-white px-6 py-3">
                <div className="flex items-center gap-6">
                    <div className="flex flex-row items-center gap-1 underline-offset-2">
                        <RiBookmark2Line className="size-5 text-slate-500" />
                        <p className="text-sm text-slate-500 decoration-inherit group-hover:underline">
                            {pluralize(
                                question.answers_count,
                                "answer",
                                "answers",
                            )}
                        </p>
                    </div>
                    <span className="text-sm text-slate-500">
                        {getRelativeTime(new Date(question.created_at))}
                    </span>
                </div>

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
