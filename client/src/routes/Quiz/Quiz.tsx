import * as Ariakit from "@ariakit/react";
import { RiArrowLeftSLine, RiLightbulbFlashLine } from "@remixicon/react";
import { useEffect, useRef, useState } from "react";
import { Form, Link } from "react-router-dom";
import {
    useActionData,
    useLoaderData,
    useRouteLoaderData,
} from "react-router-typesafe";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { PageHead } from "../../components/page-head";
import { logger } from "../../utils";
import { homeLoader } from "../Home/Home.data";
import { quizLoader, takeQuizAction } from "./Quiz.data";
import { QuizDetails } from "./Quiz.schema";
import { questionTypeToQuestion } from "./Quiz.utils";

const StartQuizComponent = ({
    quiz,
    onStart,
}: {
    quiz: QuizDetails;
    onStart: () => void;
}) => (
    <header className="grid grid-cols-12 items-start self-stretch">
        <div className="col-span-2 flex">
            <Link
                to="/quizzes"
                className={buttonClass({
                    intent: "tertiary",
                    icon: "left",
                })}
                aria-label="Back to quizzes"
            >
                <RiArrowLeftSLine size={18} className="text-slate-700" />
                <span>Back to quizzes</span>
            </Link>
        </div>
        <div className="col-span-8 flex flex-1 flex-col items-center gap-4">
            <figure className="flex flex-col items-center gap-2">
                <svg
                    width="144"
                    height="144"
                    viewBox="0 0 124 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    strokeWidth="1px"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <title>Ready to start the quiz?</title>
                    <g
                        strokeWidth="1px"
                        stroke="currentColor"
                        className="text-cyan-600"
                    >
                        <path d="M74.0403 57.47V77.47L56.0503 67.08V53.98L37.3402 43.18L31.3303 39.71L25.9902 36.6299V29.73L31.3003 32.79L37.3003 36.2599L43.3102 39.73L74.0403 57.47Z" />
                        <path d="M121.79 29.8999V49.8999L74.0403 77.4699V57.4699L83.0903 52.2399L92.8803 46.5899L104.47 39.8999L121.79 29.8999Z" />
                        <path d="M56.0503 53.98L50.0903 57.43L31.3703 46.62L25.9903 43.52L25.3603 43.16L19.3503 39.6899L2.03027 29.6899L49.7903 2.12L55.7903 5.58997L14.0103 29.71L25.3303 36.24L25.9903 36.6299L31.3303 39.71L37.3403 43.18L56.0503 53.98Z" />
                        <path d="M56.0504 53.98V73.98L50.0903 77.43V57.43L56.0504 53.98Z" />
                        <path d="M73.7402 2.15997L55.7903 12.52L25.9902 29.73L31.3003 32.79L37.3003 36.2599L43.3102 39.73L74.0403 57.47L83.0902 52.24L92.8802 46.59L104.47 39.9L121.79 29.9L73.7402 2.15997ZM65.2502 38.4399C64.4102 38.9299 63.3603 39.18 62.1103 39.17C60.8603 39.17 59.8102 38.92 58.9602 38.43C58.1102 37.94 57.6902 37.34 57.6802 36.62C57.6802 35.9 58.1002 35.29 58.9402 34.8C59.7902 34.32 60.8403 34.0699 62.0803 34.0699C63.3303 34.0799 64.3803 34.32 65.2303 34.81C66.0803 35.31 66.5103 35.9099 66.5103 36.6299C66.5103 37.3499 66.1002 37.9599 65.2502 38.4399ZM89.7603 30.54C89.5003 30.69 89.2403 30.83 88.9803 30.96C88.2003 31.33 87.3903 31.6199 86.5503 31.8199C86.2903 31.8799 86.0303 31.94 85.7603 31.98C84.3403 32.22 82.1303 32.34 79.1403 32.33C76.9403 32.33 75.3603 32.43 74.3903 32.65C73.4203 32.86 72.2102 33.39 70.7702 34.22L66.2603 31.62C68.5503 30.3 70.2902 29.51 71.4902 29.25C72.6802 28.99 74.8303 28.93 77.9203 29.05C79.8703 29.08 81.3502 29.03 82.3802 28.9C83.1802 28.81 83.8802 28.62 84.4702 28.35C84.6402 28.28 84.8003 28.2 84.9503 28.11C85.9803 27.51 86.5203 26.86 86.5503 26.14V25.89C86.4703 25.07 85.8302 24.31 84.6302 23.61C83.6302 23.04 82.4302 22.7 81.0302 22.61C79.6302 22.53 78.0903 22.71 76.3903 23.17L73.9803 19.8799C76.4703 19.1299 79.0502 18.87 81.7202 19.09C84.3902 19.31 86.7602 20.02 88.8102 21.2C91.3602 22.68 92.7202 24.2799 92.8802 26.0099C93.0302 27.7399 92.0003 29.25 89.7603 30.54Z" />
                        <path d="M66.5103 36.6299C66.5103 37.3499 66.1003 37.9599 65.2503 38.4399C64.4103 38.9299 63.3603 39.18 62.1103 39.17C60.8603 39.17 59.8103 38.92 58.9603 38.43C58.1103 37.94 57.6903 37.34 57.6803 36.62C57.6803 35.9 58.1003 35.29 58.9403 34.8C59.7903 34.32 60.8403 34.0699 62.0803 34.0699C63.3303 34.0799 64.3803 34.32 65.2303 34.81C66.0803 35.31 66.5103 35.9099 66.5103 36.6299Z" />
                        <path d="M86.5503 26.1399V31.8199C86.2903 31.8799 86.0303 31.9399 85.7603 31.9799C84.3403 32.2199 82.1303 32.3399 79.1403 32.3299C76.9403 32.3299 75.3603 32.4299 74.3903 32.6499C73.4203 32.8599 72.2102 33.3899 70.7702 34.2199L66.2603 31.6199C68.5503 30.2999 70.2902 29.5099 71.4902 29.2499C72.6802 28.9899 74.8303 28.9299 77.9203 29.0499C79.8703 29.0799 81.3502 29.0299 82.3802 28.8999C83.1802 28.8099 83.8802 28.6199 84.4702 28.3499C84.6402 28.2799 84.8003 28.1999 84.9503 28.1099C85.9803 27.5099 86.5203 26.8599 86.5503 26.1399Z" />
                        <path d="M89.7602 30.5399C89.5002 30.6899 89.2402 30.8299 88.9802 30.9599C88.2002 31.3299 87.3902 31.6199 86.5502 31.8199V25.8899C86.4702 25.0699 85.8302 24.3099 84.6302 23.6099C83.6302 23.0399 82.4302 22.6999 81.0302 22.6099C79.6302 22.5299 78.0902 22.7099 76.3902 23.1699L73.9802 19.8799C76.4702 19.1299 79.0502 18.8699 81.7202 19.0899C84.3902 19.3099 86.7602 20.0199 88.8102 21.1999C91.3602 22.6799 92.7202 24.2799 92.8802 26.0099C93.0302 27.7399 92.0002 29.2499 89.7602 30.5399Z" />
                        <path d="M55.7903 5.58997V12.52L25.9902 29.73V36.6299L25.3303 36.24L14.0103 29.71L55.7903 5.58997Z" />
                        <path d="M50.0903 57.43V77.43L2.03027 49.6899V29.6899L19.3503 39.6899L25.3603 43.16L25.9903 43.52L31.3703 46.62L50.0903 57.43Z" />
                    </g>
                </svg>
            </figure>
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-center text-2xl font-semibold">
                    Ready to start the quiz?
                </h1>
                <p className="text-balance text-center text-slate-500">
                    The quiz consists of {quiz.questions.length} questions. You
                    can move the next or previous question using the buttons
                    below. will be provided 10 minutes to complete the quiz.
                </p>
            </div>
            <button
                className={buttonClass({
                    intent: "secondary",
                    size: "medium",
                })}
                onClick={onStart}
                aria-describedby="start-quiz-heading"
            >
                <span
                    className={buttonInnerRing({ intent: "secondary" })}
                    aria-hidden="true"
                />
                Start Quiz
            </button>
        </div>
    </header>
);

const SuccessIllustration = ({ size = 128 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 97 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke-width="1px"
            stroke-linecap="round"
        >
            <title>Success Illustration</title>
            <g className="text-cyan-600" stroke="currentColor" stroke-width="1">
                <path d="M38.48 34.99V44.11L18.48 34.11V24.99L38.48 34.99Z" />
                <path d="M38.48 44.11L22.5898 53.28L18.48 51.23L11.0598 47.51L2.58984 43.28L18.48 34.11L38.48 44.11Z" />
                <path d="M28.6099 79.78L9.11987 70.05L8.91992 69.95C8.46992 69.72 8.03986 69.46 7.60986 69.16C4.25986 66.8 2.58984 62.73 2.58984 56.96V43.28L11.0598 47.51L18.48 51.23L22.5898 53.28V66.96C22.5898 69.67 22.96 72.01 23.7 73.97C24.53 76.18 25.8399 77.91 27.6099 79.16C27.9399 79.39 28.2699 79.6 28.6099 79.78Z" />
                <path d="M38.48 107.93V117.04L18.48 107.04V97.9299L26.9399 102.16L38.48 107.93Z" />
                <path d="M44.1697 84.2499L43.0996 83.7099L42.3196 83.3199L36.8096 80.5699C37.8496 80.3099 38.9396 79.9299 40.0696 79.4299C40.6496 80.8199 41.4096 81.9599 42.3196 82.8599C42.6096 83.1499 42.9097 83.4099 43.2297 83.6399C43.5297 83.8699 43.8397 84.0699 44.1697 84.2499Z" />
                <path d="M54.3701 84.62V98.75L42.8401 92.9799L34.3701 88.75V80.9699C35.1601 80.9099 35.9701 80.7799 36.8101 80.5699L42.3201 83.3199L43.1001 83.71L44.1702 84.25L44.4702 84.4C44.8602 84.6 45.2602 84.7699 45.6802 84.9099C48.2302 85.7499 51.1301 85.66 54.3701 84.62Z" />
                <path d="M78.21 21.18V12.06L74.0999 14.43L66.1499 19.02L58.21 23.6L38.48 34.99V44.11L22.5898 53.28V66.96C22.5898 69.67 22.96 72.01 23.7 73.97C24.53 76.18 25.8399 77.91 27.6099 79.16C27.9399 79.39 28.2699 79.6 28.6099 79.78L28.6899 79.82C30.3899 80.74 32.2899 81.12 34.3699 80.97C35.1599 80.91 35.9698 80.78 36.8098 80.57C37.8498 80.31 38.9398 79.93 40.0698 79.43C40.6498 80.82 41.4098 81.96 42.3198 82.86C42.6098 83.15 42.91 83.41 43.23 83.64C43.53 83.87 43.8399 84.07 44.1699 84.25L44.47 84.4C44.86 84.6 45.2599 84.77 45.6799 84.91C48.2299 85.75 51.1299 85.66 54.3699 84.62V98.75L38.48 107.93V117.04L78.21 94.11V84.99L62.3198 94.16V80.03C63.0498 79.42 63.76 78.78 64.46 78.11C66.85 75.84 69.03 73.23 71.01 70.29C73.56 66.5 75.4299 62.51 76.6199 58.33C81.5799 54.78 85.7398 49.89 89.0798 43.67C92.4198 37.45 94.0999 31.45 94.0999 25.68V12L78.21 21.18ZM38.48 70.55C36.1 70.94 34.18 70.39 32.72 68.92C31.27 67.44 30.54 65.26 30.54 62.37V57.81L38.48 53.23V70.55ZM86.1499 30.26C86.1499 33.15 85.42 36.17 83.97 39.33C82.51 42.49 80.59 45.25 78.21 47.61V30.29L86.1499 25.7V30.26Z" />
                <path d="M86.1499 25.7V30.2599C86.1499 33.1499 85.42 36.17 83.97 39.33C82.51 42.49 80.59 45.25 78.21 47.61V30.2899L86.1499 25.7Z" />
                <path d="M38.48 53.23V70.55C36.1 70.94 34.18 70.39 32.72 68.92C31.27 67.44 30.54 65.26 30.54 62.37V57.81L38.48 53.23Z" />
                <path d="M78.21 21.18V12.06L74.0999 10.01L66.6699 6.28998L74.0999 2L94.0999 12L78.21 21.18Z" />
                <path d="M78.21 12.06L74.0999 14.43L66.1499 19.02L58.21 23.6L38.48 34.99L18.48 24.99L58.21 2.06L66.6699 6.28998L74.0999 10.01L78.21 12.06Z" />
                <path d="M54.3699 98.75L38.48 107.93L26.9399 102.16L18.48 97.93L34.3699 88.75L42.8398 92.98L54.3699 98.75Z" />
                <path d="M78.21 84.99L62.3198 94.16V80.03C63.0498 79.42 63.76 78.78 64.46 78.11L78.21 84.99Z" />
            </g>
        </svg>
    );
};

const FailIllustration = ({ size = 128 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 99 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke-width="1px"
            stroke-linecap="round"
        >
            <title>Fail Illustration</title>
            <g className="text-red-600" stroke="currentColor" stroke-width="1">
                <path d="M57.6897 20.6388L37.6897 30.6388C35.6397 27.2288 33.2997 24.1888 30.6797 21.4988C28.0697 18.8088 25.3597 16.6488 22.5497 15.0288C22.3897 14.9388 22.2297 14.8488 22.0697 14.7488C17.0097 11.9588 12.6397 11.3588 8.96973 12.9888L27.9797 3.47875C31.9597 1.20875 36.8197 1.72877 42.5497 5.02877C45.3597 6.64877 48.0697 8.80877 50.6797 11.4988C53.2997 14.1888 55.6397 17.2288 57.6897 20.6388Z" />
                <path d="M57.6898 20.6388L55.9398 26.6088V26.6188L46.0099 31.5788L40.9698 45.9088V45.9188L33.2998 49.7488L31.8999 50.4488L32.5299 48.2988L37.6898 30.6388L57.6898 20.6388Z" />
                <path d="M47.0898 54.9288L43.1099 56.9188L34.4799 51.9388L31.8999 50.4488L33.2998 49.7488L40.9698 45.9188L39.3699 50.4788L47.0898 54.9288Z" />
                <path d="M50.5897 56.9488L45.8197 72.1888L39.9297 91.0088L42.2698 65.9488L43.1097 56.9188L47.0897 54.9288L50.5897 56.9488Z" />
                <path d="M76.75 69.9087C76.75 73.3387 76.34 76.2488 75.53 78.6488C74.72 81.0388 73.01 83.4588 70.4 85.9188C67.78 88.3788 64.01 91.1288 59.09 94.1888C58.94 94.2888 58.78 94.3788 58.62 94.4788C53.76 97.4888 47.37 101.319 39.47 105.959C31.12 91.4988 24.47 79.8688 19.52 71.0688C14.57 62.2788 10.8 55.1688 8.20996 49.7488C5.62996 44.3288 3.93992 39.9888 3.16992 36.7588C2.38992 33.5188 2 30.1888 2 26.7488C2 20.1788 3.98998 15.7488 7.97998 13.4788L8.96997 12.9888C12.64 11.3588 17.0099 11.9588 22.0699 14.7488C22.2299 14.8488 22.3899 14.9388 22.5499 15.0288C25.3599 16.6488 28.0699 18.8088 30.6799 21.4988C33.2999 24.1888 35.6399 27.2288 37.6899 30.6388L32.53 48.2988L31.9 50.4488L34.48 51.9387L43.11 56.9188L42.27 65.9488L39.9299 91.0088L45.8199 72.1887L50.59 56.9488L47.09 54.9288L39.37 50.4788L40.97 45.9188L46.01 31.5788C47.56 31.4788 49.2 31.6688 50.91 32.1588C51.92 32.4488 52.95 32.8288 53.99 33.3088C54.72 33.6488 55.4499 34.0288 56.1899 34.4588C57.6699 35.3088 59.1 36.2888 60.46 37.3788C63.22 39.5888 65.73 42.2788 68.01 45.4588C68.72 46.4488 69.41 47.4888 70.08 48.5788C70.31 48.9588 70.54 49.3388 70.77 49.7288C74.76 56.6088 76.75 63.3387 76.75 69.9087Z" />
                <path d="M96.7498 59.9087C96.7498 63.3387 96.3398 66.2488 95.5298 68.6488C94.7198 71.0388 93.0098 73.4588 90.3998 75.9188C87.7798 78.3788 84.0097 81.1287 79.0897 84.1887C74.1697 87.2387 67.6297 91.1688 59.4697 95.9588L39.4697 105.959C47.3697 101.319 53.7598 97.4888 58.6198 94.4788C58.7798 94.3788 58.9397 94.2887 59.0897 94.1887C64.0097 91.1287 67.7798 88.3788 70.3998 85.9188C73.0098 83.4588 74.7198 81.0388 75.5298 78.6488C76.3398 76.2488 76.7498 73.3387 76.7498 69.9087C76.7498 63.3387 74.7598 56.6088 70.7698 49.7288C70.5398 49.3388 70.3097 48.9588 70.0797 48.5788C69.4097 47.4888 68.7198 46.4488 68.0098 45.4588C65.7298 42.2788 63.2197 39.5887 60.4597 37.3787C59.0997 36.2887 57.6697 35.3088 56.1897 34.4588C55.4497 34.0288 54.7197 33.6488 53.9897 33.3088C52.9497 32.8288 51.9198 32.4487 50.9098 32.1587C49.1998 31.6687 47.5598 31.4788 46.0098 31.5788L55.9397 26.6188L66.0098 21.5788C67.5598 21.4788 69.1998 21.6687 70.9098 22.1587C72.6298 22.6487 74.3897 23.4088 76.1897 24.4588C81.9197 27.7588 86.7798 32.8588 90.7698 39.7288C94.7598 46.6088 96.7498 53.3387 96.7498 59.9087Z" />
            </g>
        </svg>
    );
};

const EndQuizComponent = ({
    correctAnswers,
    totalQuestions,
    quizId,
}: {
    correctAnswers: number;
    totalQuestions: number;
    quizId: number;
}) => {
    const successful = correctAnswers === totalQuestions * 0.7;
    const { logged_in, user } =
        useRouteLoaderData<typeof homeLoader>("home-main");
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
                        : `Quiz Completed!`}
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

export const TakeQuizPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const quiz = useLoaderData<typeof quizLoader>();
    const solvedQuiz = useActionData<typeof takeQuizAction>();
    const dialogRef = useRef<HTMLAnchorElement>(null);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [hints, setHints] = useState<Record<number, boolean>>({});
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [isQuizEnded, setIsQuizEnded] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(600);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [hintText, setHintText] = useState("");
    const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
    const [showAnswer, setShowAnswer] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (hints[currentQuestion]) {
            setHintOpen(true);
            setHintText(
                quiz.questions[currentQuestion]?.hints?.[0]?.text || "",
            );
        } else {
            setHintOpen(false);
            setHintText("");
        }
        ref.current?.focus();
    }, [currentQuestion, hints, quiz.questions]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isQuizStarted && timeRemaining > 0 && !isQuizEnded) {
            timer = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        endQuiz();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isQuizStarted, timeRemaining, isQuizEnded]);

    const handleOptionChange = (optionId: string) => {
        if (showAnswer) {
            return;
        }
        setSelectedOption(optionId);
        const updatedAnswers = { ...answers, [currentQuestion]: optionId };
        setAnswers(updatedAnswers);
        setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    };

    const handleCheckAnswer = () => {
        if (!selectedOption) return;

        const updatedAnswers = {
            ...answers,
            [currentQuestion]: selectedOption,
        };
        setAnswers(updatedAnswers);
        setAnsweredQuestions([...answeredQuestions, currentQuestion]);
        setShowAnswer(true);
    };

    const progress =
        (Object.keys(answers).length / quiz.questions.length) * 100;

    const [hintOpen, setHintOpen] = useState(false);
    const showHint = (questionIndex: number) => {
        const hint = quiz.questions[questionIndex].hints;
        const hinttext = hint?.[0]?.text || "";
        if (hinttext === "") {
            logger.log(`No hint for question ${questionIndex}`);
        } else {
            const updatedHints = { ...hints, [questionIndex]: true };
            logger.log(`Hint for question ${questionIndex}`, hinttext || "");
            setHintText(hinttext);
            setHints(updatedHints);
            setHintOpen(true);
        }
    };

    const prepareAnswers = () => {
        return Object.entries(answers).map(([index, answer]) => ({
            question: quiz.questions[Number(index)].id,
            answer: Number(answer),
            is_hint_used: hints[Number(index)] || false,
        }));
    };

    const startQuiz = () => {
        setIsQuizStarted(true);
    };

    const handleNext = () => {
        setSelectedOption("");
        setShowAnswer(false);
        setCurrentQuestion((prev) => prev + 1);
    };

    useEffect(() => {
        if (solvedQuiz) {
            endQuiz();
        }
    }, [solvedQuiz]);

    const endQuiz = () => {
        setIsQuizEnded(true);
        let correct = 0;
        Object.entries(answers).forEach(([index, answer]) => {
            const correctOption = quiz.questions[Number(index)].choices.find(
                (o) => o.is_correct === true,
            );
            if (correctOption && String(correctOption.id) === answer) {
                correct++;
            }
        });
        setCorrectAnswers(correct);
    };

    if (!isQuizStarted) {
        return (
            <main className="container flex max-w-screen-xl flex-col items-center gap-12 py-12">
                <StartQuizComponent quiz={quiz} onStart={startQuiz} />
            </main>
        );
    }

    if (isQuizEnded) {
        return (
            <main className="container flex max-w-screen-sm flex-col items-stretch gap-8 py-12">
                <EndQuizComponent
                    correctAnswers={correctAnswers}
                    totalQuestions={quiz.questions.length}
                    quizId={quiz.id}
                />
            </main>
        );
    }

    return (
        <main className="container flex max-w-screen-sm flex-col items-stretch gap-8 py-12">
            <PageHead title={quiz.title} description={quiz.description} />
            <div className="flex flex-col items-stretch gap-3">
                <div className="h-2 w-full flex-grow rounded-full bg-slate-200">
                    <div
                        className="h-2 rounded-full bg-cyan-600"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="flex flex-1 items-center justify-between gap-1">
                    <div>
                        {currentQuestion + 1} / {quiz.questions.length}
                    </div>
                </div>
            </div>
            <div className="flex gap-4">
                <div
                    ref={ref}
                    tabIndex={0}
                    id="question"
                    autoFocus={true}
                    aria-description="Question"
                    className="flex-1 font-display text-lg font-medium tracking-tight"
                >
                    {questionTypeToQuestion(
                        quiz.type,
                        quiz.questions[currentQuestion].question_text,
                    )}
                </div>
                {!showAnswer &&
                    quiz.questions[currentQuestion].hints?.length && (
                        <div>
                            <Ariakit.PopoverProvider placement="bottom-end">
                                <Ariakit.PopoverDisclosure
                                    className={buttonClass({
                                        intent: "primary",
                                        size: "medium",
                                        icon: "only",
                                    })}
                                >
                                    <span
                                        className={buttonInnerRing({
                                            intent: "primary",
                                        })}
                                        aria-hidden="true"
                                    />
                                    <RiLightbulbFlashLine size={18} />
                                </Ariakit.PopoverDisclosure>
                                <Ariakit.Popover className="my-2 flex w-80 flex-col gap-4 rounded-2 bg-white p-4 text-slate-700 shadow-md ring-1 ring-slate-100">
                                    <div className="flex flex-col gap-1">
                                        <Ariakit.PopoverHeading className="text-md font-medium">
                                            Using hint for the question{" "}
                                            {currentQuestion + 1}
                                        </Ariakit.PopoverHeading>
                                        <Ariakit.PopoverDescription className="text-sm text-slate-600">
                                            Using a hint in a question will
                                            decrease the points earned by 50%.
                                        </Ariakit.PopoverDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Ariakit.Button
                                            onClick={() => {}}
                                            className={buttonClass({
                                                intent: "tertiary",
                                                size: "medium",
                                                className: "flex-1",
                                            })}
                                        >
                                            Cancel
                                        </Ariakit.Button>
                                        <Ariakit.Button
                                            onClick={() =>
                                                showHint(currentQuestion)
                                            }
                                            className={buttonClass({
                                                intent: "secondary",
                                                size: "medium",
                                                className: "flex-1",
                                            })}
                                        >
                                            Accept Hint
                                        </Ariakit.Button>
                                    </div>
                                </Ariakit.Popover>
                            </Ariakit.PopoverProvider>
                        </div>
                    )}
            </div>
            {quiz.questions[currentQuestion] && (
                <div>
                    <ul
                        className="grid grid-cols-2 gap-2"
                        role="radiogroup"
                        aria-labelledby={`question-${currentQuestion}`}
                    >
                        {quiz.questions[currentQuestion].choices.map(
                            (choice, _) => (
                                <li key={choice.id}>
                                    <label
                                        className={`flex cursor-pointer items-center justify-center gap-2 rounded-2 px-4 py-3 text-center text-lg transition-colors duration-200 ${
                                            showAnswer
                                                ? choice.is_correct
                                                    ? "bg-green-600 text-white"
                                                    : selectedOption ===
                                                        String(choice.id)
                                                      ? "bg-red-600 text-white"
                                                      : "bg-slate-100 text-slate-950"
                                                : selectedOption ===
                                                    String(choice.id)
                                                  ? "bg-cyan-700 text-white"
                                                  : "bg-slate-100 text-slate-950 hover:bg-slate-200"
                                        }`}
                                        aria-describedby="question"
                                        lang={quiz.type === 2 ? "tr" : "en"}
                                    >
                                        <input
                                            className="sr-only"
                                            type="radio"
                                            name="option"
                                            value={choice.id}
                                            checked={
                                                selectedOption ===
                                                String(choice.id)
                                            }
                                            onChange={() =>
                                                handleOptionChange(
                                                    String(choice.id),
                                                )
                                            }
                                            disabled={showAnswer}
                                        />
                                        {choice.choice_text}
                                    </label>
                                </li>
                            ),
                        )}
                    </ul>
                    {showAnswer && (
                        <a
                            role="alert"
                            aria-atomic="true"
                            href="#"
                            aria-live="polite"
                            ref={dialogRef}
                            className={`mt-4 flex rounded-2 p-3 ${
                                selectedOption ===
                                String(
                                    quiz.questions[
                                        currentQuestion
                                    ].choices.find((c) => c.is_correct)?.id,
                                )
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                        >
                            {selectedOption ===
                            String(
                                quiz.questions[currentQuestion].choices.find(
                                    (c) => c.is_correct,
                                )?.id,
                            )
                                ? "Correct answer!"
                                : "Incorrect answer."}
                        </a>
                    )}
                </div>
            )}
            <div className="grid w-full grid-cols-2 gap-4">
                <button
                    tabIndex={0}
                    className={buttonClass({
                        intent: "tertiary",
                        size: "medium",
                    })}
                    disabled={currentQuestion === 0}
                    onClick={() => {
                        setSelectedOption(answers[currentQuestion - 1] || "");
                        setShowAnswer(true);
                        setCurrentQuestion((prev) => prev - 1);
                    }}
                >
                    <span
                        className={buttonInnerRing({ intent: "tertiary" })}
                        aria-hidden="true"
                    />
                    Previous
                </button>
                {currentQuestion === quiz.questions.length - 1 && showAnswer ? (
                    <Form method="POST" action={`/quizzes/${quiz.id}`}>
                        <input
                            type="hidden"
                            name="answers"
                            value={JSON.stringify(prepareAnswers())}
                        />
                        <input type="hidden" name="quizId" value={quiz.id} />
                        <button
                            type="submit"
                            className={buttonClass({
                                intent: "primary",
                                size: "medium",
                                className: "w-full",
                            })}
                        >
                            <span
                                className={buttonInnerRing({
                                    intent: "primary",
                                })}
                                aria-hidden="true"
                            />
                            Finish Quiz
                        </button>
                    </Form>
                ) : showAnswer ? (
                    <button
                        className={buttonClass({
                            intent: "secondary",
                            size: "medium",
                        })}
                        onClick={handleNext}
                    >
                        <span
                            className={buttonInnerRing({ intent: "secondary" })}
                            aria-hidden="true"
                        />
                        Next
                    </button>
                ) : (
                    <button
                        className={buttonClass({
                            intent: "primary",
                            size: "medium",
                        })}
                        disabled={!selectedOption}
                        onClick={() => {
                            handleCheckAnswer();
                            dialogRef.current?.focus();
                        }}
                    >
                        <span
                            className={buttonInnerRing({ intent: "primary" })}
                            aria-hidden="true"
                        />
                        Check Answer
                    </button>
                )}
            </div>
            {hintOpen && <Hint message={hintText} />}
        </main>
    );
};

const Hint = ({ message }: { message: string }) => {
    return (
        <div className="flex flex-col gap-2 rounded-2 bg-orange-200 p-4 text-orange-900 ring-1 ring-orange-500/50">
            <div className="flex items-center gap-2">
                <RiLightbulbFlashLine size={24} />
            </div>
            <p className="w-full">{message}</p>
        </div>
    );
};
