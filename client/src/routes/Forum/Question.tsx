import { Link, useFetcher } from "react-router-dom";
import { useLoaderData, useRouteLoaderData } from "react-router-typesafe";
import { buttonClass } from "../../components/button";
import { ForumAnswerCard } from "../../components/forum-answer-card";
import { ForumQuestionCard } from "../../components/forum-card";
import { inputClass } from "../../components/input";
import { homeLoader } from "../Home/Home.data";
import { answerForumAction, forumQuestionLoader } from "./Question.data";

export const ForumQuestion = () => {
    const data = useLoaderData<typeof forumQuestionLoader>();
    const { logged_in } = useRouteLoaderData<typeof homeLoader>("home-main");

    const answerFetcher = useFetcher<typeof answerForumAction>();

    return (
        <div className="container flex w-full max-w-screen-xl flex-col items-center gap-8 py-12">
            <main className="flex w-full max-w-2xl flex-col items-center justify-center gap-10">
                <ForumQuestionCard
                    key={data.id}
                    question={data}
                ></ForumQuestionCard>
                <div className="flex w-full flex-col items-center justify-center">
                    {data.answers.map((answer) => {
                        return (
                            <ForumAnswerCard
                                key={answer.id.toFixed(0)}
                                answer={answer}
                            ></ForumAnswerCard>
                        );
                    })}
                </div>
                <answerFetcher.Form
                    action="answer"
                    method="POST"
                    className="flex w-full max-w-xl flex-col items-center justify-center gap-4"
                >
                    <textarea
                        name="answer"
                        placeholder="Write your comment..."
                        className={inputClass({
                            className: "min-h-32 w-full resize-none",
                        })}
                        required
                        minLength={1}
                        aria-label="Answer forum question"
                    />
                    <button
                        type="submit"
                        className={`${buttonClass({ intent: "primary" })} w-full`}
                        disabled={!logged_in}
                    >
                        Post Comment
                    </button>
                    {data.related_forum_questions?.map((answer) => {
                        return (
                            <Link
                                className="flex w-full flex-row items-center justify-center gap-4 rounded-1 bg-slate-50 p-3 ring ring-slate-200"
                                to={`/forum/${answer.id}`}
                            >
                                <div className="flex h-8 w-8 flex-col items-center justify-center rounded-1 bg-white text-center ring ring-slate-200">
                                    {answer.upvotes_count -
                                        answer.downvotes_count}
                                </div>
                                <div className="flex flex-1 flex-col">
                                    <h2 className="overflow-hidden text-base font-semibold text-slate-900 underline-offset-2 group-hover:underline">
                                        {answer.title}
                                    </h2>
                                    <p className="line-clamp-2 overflow-hidden text-sm text-slate-700">
                                        {answer.question}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </answerFetcher.Form>
            </main>
        </div>
    );
};
