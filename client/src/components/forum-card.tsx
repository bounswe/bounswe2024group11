import { Button, Separator } from "@ariakit/react";
import {
    RiArrowDownLine,
    RiArrowUpLine,
    RiBookmark2Line,
    RiDeleteBin4Line,
} from "@remixicon/react";
import { Link, useFetcher } from "react-router-dom";

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

export const ForumQuestionCard = ({ question, onTagClick }: ForumCardProps) => {
    const upvoteFetcher = useFetcher<typeof upvoteForumAction>();
    const downvoteFetcher = useFetcher<typeof downvoteForumAction>();
    const bookmarkFetcher = useFetcher<typeof bookmarkForumAction>();
    const deleteFetcher = useFetcher<typeof deleteForumAction>();

    return (
        <div className="relative flex h-full w-full flex-col gap-3 rounded-2 bg-white px-6 pb-4 pt-6 shadow-none ring ring-slate-200 transition-all duration-200 hover:ring-slate-300">
            <div className="flex flex-1 flex-col gap-3 pb-3">
                <div className="flex w-full items-center justify-between gap-3">
                    <div className="flex flex-row items-center justify-start gap-3">
                        <Avatar author={question.author} size={24} />
                        <p className="text-sm text-slate-500">
                            {question.author.username}
                        </p>
                    </div>
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
                                    <RiDeleteBin4Line size={16} />
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
                        <p className="text-sm text-slate-500">
                            {question.question}
                        </p>
                    </Link>
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
                <RelevantQuiz quizQuestion={question.quiz_question} />
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
                            <RiArrowUpLine size={16} />
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
                            <RiArrowDownLine size={16} />
                        </Button>
                    </downvoteFetcher.Form>
                </div>
            </div>
        </div>
    );
};
