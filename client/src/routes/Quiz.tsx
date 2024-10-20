import { RiArrowLeftLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";
import { buttonClass, buttonInnerRing } from "../components/button";
import { PageHead } from "../components/page-head";
import { quizLoader } from "./Quiz.data";

const StartQuizComponent = ({ onStart }: { onStart: () => void }) => (
    <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="font-display text-2xl font-medium">
            Ready to start the quiz?
        </h2>
        <button
            className={buttonClass({ intent: "primary", size: "medium" })}
            onClick={onStart}
        >
            <span className={buttonInnerRing({ intent: "primary" })} />
            Start Quiz
        </button>
    </div>
);

export const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const quiz = useLoaderData<typeof quizLoader>();
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds

    useEffect(() => {
        const savedAnswers = localStorage.getItem(`quiz_${quiz.id}_answers`);
        if (savedAnswers) {
            setAnswers(JSON.parse(savedAnswers));
        }
    }, [quiz.id]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isQuizStarted && timeRemaining > 0) {
            timer = setInterval(() => {
                setTimeRemaining((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isQuizStarted, timeRemaining]);

    const handleOptionChange = (optionId: string) => {
        setSelectedOption(optionId);
        const updatedAnswers = { ...answers, [currentQuestion]: optionId };
        setAnswers(updatedAnswers);
        localStorage.setItem(
            `quiz_${quiz.id}_answers`,
            JSON.stringify(updatedAnswers),
        );
    };

    const isPrevDisabled = currentQuestion === 0;
    const isNextDisabled =
        currentQuestion === quiz.questions.length - 1 ||
        !answers[currentQuestion];

    const progress =
        (Object.keys(answers).length / quiz.questions.length) * 100;

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    const startQuiz = () => {
        setIsQuizStarted(true);
    };

    if (!isQuizStarted) {
        return (
            <main className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
                <Link
                    to="/quizzes"
                    className={buttonClass({
                        intent: "tertiary",
                        icon: "left",
                    })}
                >
                    <RiArrowLeftLine size={16} />
                    <span>Back to Quizzes</span>
                </Link>
                <PageHead title={quiz.title} description={quiz.description} />
                <StartQuizComponent onStart={startQuiz} />
            </main>
        );
    }

    return (
        <main className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <Link
                to="/quizzes"
                className={buttonClass({
                    intent: "tertiary",
                    icon: "left",
                })}
            >
                <RiArrowLeftLine size={16} />
                <span>Back to Quizzes</span>
            </Link>
            <PageHead title={quiz.title} description={quiz.description} />
            <div className="flex items-center justify-between">
                <div className="mr-4 h-2.5 w-full flex-grow rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                        className="h-2.5 rounded-full bg-blue-600"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="text-lg font-bold">
                    Time: {formatTime(timeRemaining)}
                </div>
            </div>
            <div>
                <h1>{quiz.questions[currentQuestion].text}</h1>
            </div>
            {quiz.questions[currentQuestion] && (
                <div>
                    <ul className="grid grid-cols-2 gap-2">
                        {quiz.questions[currentQuestion].options.map(
                            (option) => (
                                <li key={option.id}>
                                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2 bg-slate-100 px-4 py-4 text-center text-lg">
                                        <input
                                            hidden={true}
                                            type="radio"
                                            name="option"
                                            value={option.id}
                                            checked={
                                                answers[currentQuestion] ===
                                                option.id
                                            }
                                            onChange={() =>
                                                handleOptionChange(option.id)
                                            }
                                        />
                                        {option.text}
                                    </label>
                                </li>
                            ),
                        )}
                    </ul>
                </div>
            )}
            <div className="grid w-full grid-cols-2 gap-4">
                <button
                    className={buttonClass({
                        intent: "tertiary",
                        size: "medium",
                    })}
                    disabled={isPrevDisabled}
                    onClick={() => {
                        setSelectedOption(answers[currentQuestion - 1] || "");
                        setCurrentQuestion((prev) => prev - 1);
                    }}
                >
                    <span className={buttonInnerRing({ intent: "tertiary" })} />
                    Previous
                </button>
                <button
                    className={buttonClass({
                        intent: "secondary",
                        size: "medium",
                    })}
                    disabled={isNextDisabled}
                    onClick={() => {
                        setSelectedOption(answers[currentQuestion + 1] || "");
                        setCurrentQuestion((prev) => prev + 1);
                    }}
                >
                    <span
                        className={buttonInnerRing({ intent: "secondary" })}
                    />
                    Next
                </button>
            </div>
        </main>
    );
};
