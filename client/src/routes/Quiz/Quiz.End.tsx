import { Link } from "react-router-dom";
import { useRouteLoaderData } from "react-router-typesafe";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { userLoader } from "../Home/Home.data";
import { FailIllustration, SuccessIllustration } from "./Quiz.Illustration";

export const EndQuiz = ({
    correctAnswers,
    totalQuestions,
    quizId,
}: {
    correctAnswers: number;
    totalQuestions: number;
    quizId: number;
}) => {
    const successful = correctAnswers >= totalQuestions * 0.7;
    const { logged_in, user } =
        useRouteLoaderData<typeof userLoader>("home-main");
    return (
        <div className="flex flex-col items-center gap-4">
            {successful ? <SuccessIllustration /> : <FailIllustration />}
            <div className="rounded-4 bg-cyan-100 px-3 py-1 text-center text-sm font-medium uppercase tracking-widest text-cyan-900">
                {((correctAnswers / totalQuestions) * 100).toFixed(0)}% accuracy
            </div>
            <div className="flex flex-col items-center gap-2">
                <h2 className="max-w-lg text-balance text-center font-display text-3xl font-medium text-slate-900">
                    {successful
                        ? `Great job ${logged_in ? user.full_name : "buddy"}!`
                        : `Well, that could've gone better! Ready for another shot?`}
                </h2>
                <p className="text-lg text-slate-600">
                    {successful
                        ? "You've done very well! :)"
                        : "Next time, try harder :("}
                </p>
            </div>
            <div className="flex gap-4 rounded-4 bg-slate-100 px-4 py-2">
                <p className="font-medium">
                    {correctAnswers}{" "}
                    <span className="text-sm text-slate-500">
                        / {totalQuestions}
                    </span>
                </p>
            </div>
            <div className="flex gap-4">
                <Link
                    className={buttonClass({
                        intent: "secondary",
                        size: "medium",
                    })}
                    to={`/quizzes/${quizId}/review`}
                >
                    <span
                        className={buttonInnerRing({ intent: "secondary" })}
                        aria-hidden="true"
                    />
                    Review Quiz
                </Link>
                <Link
                    to={`/quizzes`}
                    className={buttonClass({
                        intent: "primary",
                        size: "medium",
                    })}
                >
                    <span
                        className={buttonInnerRing({ intent: "primary" })}
                        aria-hidden="true"
                    />
                    See All Quizzes
                </Link>
            </div>
        </div>
    );
};
