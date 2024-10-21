import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-typesafe";
import { buttonClass, buttonInnerRing } from "../components/button";
import { PageHead } from "../components/page-head";
import { quizLoader } from "./Quiz.data";
import { Quiz } from "./Quizzes.data";

const StartQuizComponent = ({
    quiz,
    onStart,
}: {
    quiz: Quiz & { questions: { id: number; text: string }[] };
    onStart: () => void;
}) => (
    <div
        className="flex flex-col justify-center gap-8"
        role="region"
        aria-labelledby="start-quiz-heading"
    >
        <div className="flex flex-col gap-2">
            <h1
                id="start-quiz-heading"
                className="font-display text-3xl font-medium text-slate-900"
            >
                Ready to start the quiz?
            </h1>
            <p className="text-slate-600">
                The quiz consists of {quiz.questions.length} questions. You can
                move the next or previous question using the buttons below. will
                be provided 10 minutes to complete the quiz.
            </p>
        </div>
        <button
            className={buttonClass({ intent: "secondary", size: "medium" })}
            onClick={onStart}
            aria-describedby="start-quiz-heading"
        >
            <span className={buttonInnerRing({ intent: "secondary" })} />
            Start Quiz
        </button>
    </div>
);

export const QuizPage = () => {
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
            <main className="container flex max-w-screen-sm flex-col items-stretch gap-8 py-12">
                <StartQuizComponent quiz={quiz} onStart={startQuiz} />
            </main>
        );
    }

    return (
        <main className="container flex max-w-screen-sm flex-col items-stretch gap-8 py-12">
            <PageHead title={quiz.title} description={quiz.description} />
            <div className="flex flex-col items-stretch gap-3">
                <div className="h-2 w-full flex-grow rounded-full bg-slate-200">
                    <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="flex flex-1 items-center justify-between gap-1">
                    <div>
                        {currentQuestion + 1} / {quiz.questions.length}
                    </div>
                    <div>{formatTime(timeRemaining)} mins left</div>
                </div>
            </div>
            <div>
                <a
                    tabIndex={0}
                    id="question"
                    autoFocus={true}
                    aria-description="Question"
                    className="font-display text-lg font-medium tracking-tight"
                >
                    {quiz.questions[currentQuestion].text}
                </a>
            </div>
            {quiz.questions[currentQuestion] && (
                <div>
                    <ul
                        className="grid grid-cols-2 gap-2"
                        role="radiogroup"
                        aria-labelledby={`question-${currentQuestion}`}
                    >
                        {quiz.questions[currentQuestion].options.map(
                            (option, _) => (
                                <li key={option.id}>
                                    <label
                                        className={`flex cursor-pointer items-center justify-center gap-2 rounded-2 px-4 py-3 text-center text-lg transition-colors duration-200 ${
                                            answers[currentQuestion] ===
                                            option.id
                                                ? "bg-cyan-700 text-white"
                                                : "bg-slate-100 text-slate-950 hover:bg-slate-200"
                                        }`}
                                        aria-describedby="question"
                                        lang="tr"
                                    >
                                        <input
                                            className="sr-only"
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
