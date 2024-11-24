import * as Ariakit from "@ariakit/react";
import { RiLightbulbFlashLine } from "@remixicon/react";
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

const StartQuizComponent = ({
    quiz,
    onStart,
}: {
    quiz: QuizDetails;
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
            <span
                className={buttonInnerRing({ intent: "secondary" })}
                aria-hidden="true"
            />
            Start Quiz
        </button>
    </div>
);

const EndQuizComponent = ({
    correctAnswers,
    totalQuestions,
    quizId,
}: {
    correctAnswers: number;
    totalQuestions: number;
    quizId: number;
}) => {
    const { logged_in, user } =
        useRouteLoaderData<typeof homeLoader>("home-main");
    return (
        <div className="flex flex-col items-center gap-8">
            <h2 className="max-w-lg text-balance text-center font-display text-3xl font-medium text-slate-900">
                {correctAnswers > totalQuestions / 2
                    ? `Great job ${logged_in ? user.username : "buddy"}!`
                    : `Quiz Completed!`}
            </h2>
            <div className="text-xl">
                <p>Correct Answers: {correctAnswers}</p>
                <p>Wrong Answers: {totalQuestions - correctAnswers}</p>
            </div>
            <Link
                className={buttonClass({ intent: "primary", size: "medium" })}
                to={`/quizzes/${quizId}/review`}
            >
                <span
                    className={buttonInnerRing({ intent: "primary" })}
                    aria-hidden="true"
                />
                Review Quiz
            </Link>
            <Link
                to={`/quizzes`}
                className={buttonClass({ intent: "primary", size: "medium" })}
            >
                <span
                    className={buttonInnerRing({ intent: "primary" })}
                    aria-hidden="true"
                />
                See All Quizzes
            </Link>
        </div>
    );
};

export const TakeQuizPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [_, setSelectedOption] = useState("");
    const quiz = useLoaderData<typeof quizLoader>();
    const solvedQuiz = useActionData<typeof takeQuizAction>();
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [hints, setHints] = useState<Record<number, boolean>>({});
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [isQuizEnded, setIsQuizEnded] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [hintText, setHintText] = useState("");

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (hints[currentQuestion]) {
            setHintOpen(true);
            setHintText(quiz.questions[currentQuestion].hints[0]?.text || "");
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
        setSelectedOption(optionId);
        const updatedAnswers = { ...answers, [currentQuestion]: optionId };
        setAnswers(updatedAnswers);
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
    const [hintOpen, setHintOpen] = useState(false);
    const showHint = (questionIndex: number) => {
        const hint = quiz.questions[questionIndex].hints;
        const hinttext = hint[0]?.text || "";
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
            <main className="container flex max-w-screen-sm flex-col items-stretch gap-8 py-12">
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
                    <div>{formatTime(timeRemaining)} mins left</div>
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
                    {quiz.questions[currentQuestion].question_text}
                </div>
                {quiz.questions[currentQuestion].hints.length > 0 && (
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
                                        Using a hint in a question will decrease
                                        the points earned by 50%.
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
                                            answers[currentQuestion] ===
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
                                                answers[currentQuestion] ===
                                                String(choice.id)
                                            }
                                            onChange={() =>
                                                handleOptionChange(
                                                    String(choice.id),
                                                )
                                            }
                                        />
                                        {choice.choice_text}
                                    </label>
                                </li>
                            ),
                        )}
                    </ul>
                </div>
            )}
            <div className="grid w-full grid-cols-2 gap-4">
                <button
                    tabIndex={0}
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
                    <span
                        className={buttonInnerRing({ intent: "tertiary" })}
                        aria-hidden="true"
                    />
                    Previous
                </button>
                {currentQuestion === quiz.questions.length - 1 ? (
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
                ) : (
                    <button
                        className={buttonClass({
                            intent: "secondary",
                            size: "medium",
                        })}
                        disabled={isNextDisabled}
                        onClick={() => {
                            setSelectedOption(
                                answers[currentQuestion + 1] || "",
                            );
                            setCurrentQuestion((prev) => prev + 1);
                        }}
                    >
                        <span
                            className={buttonInnerRing({ intent: "secondary" })}
                            aria-hidden="true"
                        />
                        Next
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
