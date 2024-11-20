import { useFetcher, useSearchParams } from "react-router-dom";
import { useLoaderData, useRouteLoaderData } from "react-router-typesafe";
import { buttonClass } from "../../components/button";
import { ForumAnswerCard } from "../../components/forum-answer-card";
import { ForumQuestionCard } from "../../components/forum-card";
import { inputClass } from "../../components/input";
import { homeLoader } from "../Home/Home.data";
import { answerForumAction } from "./Forum.data";
import { forumQuestionLoader } from "./Question.data";

export const ForumQuestion = () => {
    const data = useLoaderData<typeof forumQuestionLoader>();
    const { logged_in } = useRouteLoaderData<typeof homeLoader>("home-main");
    const [searchParams, setSearchParams] = useSearchParams();

    const answerFetcher = useFetcher<typeof answerForumAction>();

    return (
        <div className="container flex w-full max-w-screen-xl flex-col items-center gap-8 py-12">
            <main className="flex w-full flex-col items-center justify-center gap-10">
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
                </answerFetcher.Form>
            </main>
        </div>
    );
};
