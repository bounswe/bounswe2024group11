import * as Ariakit from "@ariakit/react";
import { RiLightbulbFlashLine } from "@remixicon/react";
import { Suspense, useEffect, useRef, useState } from "react";
import { Form } from "react-router-dom";
import { Await, useActionData, useLoaderData } from "react-router-typesafe";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { PageHead } from "../../components/page-head";
import { Voiceover } from "../../components/voiceover";
import { useSound } from "../../contexts/SoundContext";
import { QuizLoading } from "../_loading";
import { HintType } from "./NewQuiz/NewQuizQuestionOptionsHint";
import { quizLoader, takeQuizAction } from "./Quiz.data";
import { EndQuiz } from "./Quiz.End";
import { StartQuiz } from "./Quiz.Start";
import { questionTypeToQuestion } from "./Quiz.utils";
import { choiceButton } from "./QuizChoice";

export const TakeQuizPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const solvedQuiz = useActionData<typeof takeQuizAction>();
    const dialogRef = useRef<HTMLAnchorElement>(null);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [hints, setHints] = useState<Record<number, boolean>>({});
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [isQuizEnded, setIsQuizEnded] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [hintText, setHintText] = useState("");
    const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
    const { playSound } = useSound();
    const ref = useRef<HTMLDivElement>(null);

    const quiz = useLoaderData<typeof quizLoader>();
    const hintType = quiz.questions[currentQuestion]?.hints?.[0]?.type;

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

        const correctOption = quiz.questions[currentQuestion].choices.find(
            (o) => o.is_correct === true,
        );
        if (correctOption && String(correctOption.id) === selectedOption) {
            playSound("true");
        } else {
            playSound("false");
        }

        setShowAnswer(true);
    };

    const progress =
        (Object.keys(answers).length / quiz.questions.length) * 100;

    const [hintOpen, setHintOpen] = useState(false);
    const showHint = (questionIndex: number) => {
        const hint = quiz.questions[questionIndex].hints;

        const hinttext = hint?.[0]?.text || "";
        if (hinttext === "") {
        } else {
            const updatedHints = { ...hints, [questionIndex]: true };
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
        const successful = correct >= quiz.questions.length * 0.7;
        if (successful) {
            playSound("success");
        }
        setCorrectAnswers(correct);
    };

    if (!isQuizStarted) {
        return (
            <main className="container flex max-w-screen-xl flex-col items-center gap-12 py-12">
                <StartQuiz quiz={quiz} onStart={startQuiz} />
            </main>
        );
    }

    if (isQuizEnded) {
        return (
            <main className="container flex max-w-screen-sm flex-col items-stretch gap-8 py-12">
                <EndQuiz
                    correctAnswers={correctAnswers}
                    totalQuestions={quiz.questions.length}
                    quizId={quiz.id}
                />
            </main>
        );
    }

    return (
        <main className="container flex max-w-screen-sm flex-col items-stretch gap-8 py-12">
            <Suspense fallback={<QuizLoading />}>
                <Await
                    resolve={quiz}
                    children={(quiz) => {
                        return (
                            <>
                                <PageHead
                                    title={quiz.title}
                                    description={quiz.description}
                                />
                                <div className="flex flex-col items-stretch gap-3">
                                    <div className="h-2 w-full flex-grow rounded-full bg-slate-200">
                                        <div
                                            className="h-2 rounded-full bg-cyan-600"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex flex-1 items-center justify-between gap-1">
                                        <div>
                                            {currentQuestion + 1} /{" "}
                                            {quiz.questions.length}
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
                                            quiz.questions[currentQuestion]
                                                .question_text,
                                        )}
                                    </div>
                                    <div>
                                        {(quiz.type === 1 ||
                                            quiz.type === 3) && (
                                            <Voiceover
                                                text={
                                                    quiz.questions[
                                                        currentQuestion
                                                    ].question_text
                                                }
                                            />
                                        )}
                                    </div>
                                    {!showAnswer &&
                                        quiz.questions[currentQuestion].hints
                                            ?.length !== 0 && (
                                            <div>
                                                <Ariakit.PopoverProvider
                                                    open={isDisclaimerOpen}
                                                    setOpen={
                                                        setIsDisclaimerOpen
                                                    }
                                                    placement="bottom-end"
                                                >
                                                    <Ariakit.PopoverDisclosure
                                                        className={buttonClass({
                                                            intent: "primary",
                                                            size: "medium",
                                                            icon: "only",
                                                        })}
                                                    >
                                                        <span
                                                            className={buttonInnerRing(
                                                                {
                                                                    intent: "primary",
                                                                },
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                        <RiLightbulbFlashLine
                                                            size={18}
                                                        />
                                                    </Ariakit.PopoverDisclosure>
                                                    <Ariakit.Popover className="z-50 my-2 flex w-80 flex-col gap-4 rounded-2 bg-white p-4 text-slate-700 shadow-md ring-1 ring-slate-100">
                                                        <div className="flex flex-col gap-1">
                                                            <Ariakit.PopoverHeading className="text-md font-medium">
                                                                Using hint for
                                                                the question{" "}
                                                                {currentQuestion +
                                                                    1}
                                                            </Ariakit.PopoverHeading>
                                                            <Ariakit.PopoverDescription className="text-sm text-slate-600">
                                                                Using a hint in
                                                                a question will
                                                                decrease the
                                                                points earned by
                                                                50%.
                                                            </Ariakit.PopoverDescription>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Ariakit.Button
                                                                onClick={() =>
                                                                    setIsDisclaimerOpen(
                                                                        false,
                                                                    )
                                                                }
                                                                className={buttonClass(
                                                                    {
                                                                        intent: "tertiary",
                                                                        size: "medium",
                                                                        className:
                                                                            "flex-1",
                                                                    },
                                                                )}
                                                            >
                                                                Cancel
                                                            </Ariakit.Button>
                                                            <Ariakit.Button
                                                                onClick={() =>
                                                                    showHint(
                                                                        currentQuestion,
                                                                    )
                                                                }
                                                                className={buttonClass(
                                                                    {
                                                                        intent: "secondary",
                                                                        size: "medium",
                                                                        className:
                                                                            "flex-1",
                                                                    },
                                                                )}
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
                                            {quiz.questions[
                                                currentQuestion
                                            ].choices.map((choice) => {
                                                const isCorrectChoice =
                                                    choice.is_correct;
                                                const isSelectedChoice =
                                                    selectedOption ===
                                                    String(choice.id);

                                                return (
                                                    <li key={choice.id}>
                                                        <label
                                                            className={choiceButton(
                                                                {
                                                                    isCorrect:
                                                                        choice.is_correct,
                                                                    isSelected:
                                                                        isSelectedChoice,
                                                                    showAnswer,
                                                                    className:
                                                                        "flex-1",
                                                                },
                                                            )}
                                                            aria-describedby="question"
                                                            lang={
                                                                quiz.type === 2
                                                                    ? "tr"
                                                                    : "en"
                                                            }
                                                        >
                                                            <input
                                                                className="sr-only"
                                                                type="radio"
                                                                name="option"
                                                                value={
                                                                    choice.id
                                                                }
                                                                checked={
                                                                    isSelectedChoice
                                                                }
                                                                onChange={() =>
                                                                    handleOptionChange(
                                                                        String(
                                                                            choice.id,
                                                                        ),
                                                                    )
                                                                }
                                                                disabled={
                                                                    showAnswer
                                                                }
                                                            />

                                                            <span className="flex-1">
                                                                {
                                                                    choice.choice_text
                                                                }
                                                            </span>
                                                            {quiz.type == 2 && (
                                                                <Voiceover
                                                                    text={
                                                                        choice.choice_text
                                                                    }
                                                                />
                                                            )}
                                                        </label>
                                                    </li>
                                                );
                                            })}
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
                                        disabled={currentQuestion === 0}
                                        onClick={() => {
                                            setSelectedOption(
                                                answers[currentQuestion - 1] ||
                                                    "",
                                            );
                                            setShowAnswer(true);
                                            setCurrentQuestion(
                                                (prev) => prev - 1,
                                            );
                                        }}
                                    >
                                        <span
                                            className={buttonInnerRing({
                                                intent: "tertiary",
                                            })}
                                            aria-hidden="true"
                                        />
                                        Previous
                                    </button>
                                    {currentQuestion ===
                                        quiz.questions.length - 1 &&
                                    showAnswer ? (
                                        <Form
                                            method="POST"
                                            action={`/quizzes/${quiz.id}`}
                                        >
                                            <input
                                                type="hidden"
                                                name="answers"
                                                value={JSON.stringify(
                                                    prepareAnswers(),
                                                )}
                                            />
                                            <input
                                                type="hidden"
                                                name="quizId"
                                                value={quiz.id}
                                            />
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
                                                className={buttonInnerRing({
                                                    intent: "secondary",
                                                })}
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
                                                className={buttonInnerRing({
                                                    intent: "primary",
                                                })}
                                                aria-hidden="true"
                                            />
                                            Check Answer
                                        </button>
                                    )}
                                </div>
                                {hintOpen && (
                                    <Hint
                                        type={hintType as HintType}
                                        text={hintText}
                                    />
                                )}
                            </>
                        );
                    }}
                ></Await>
            </Suspense>
        </main>
    );
};

const Hint = ({ text, type }: { type: HintType; text: string }) => {
    return (
        <div className="flex flex-col gap-2 rounded-2 bg-orange-200 p-4 text-orange-900 ring-1 ring-orange-500/50">
            <div className="flex items-center gap-2">
                <RiLightbulbFlashLine size={24} />
            </div>
            <span className="flex flex-1 items-center gap-2">
                {type === "images" ? (
                    <img
                        src={text}
                        alt="Hint image"
                        className="h-32 rounded-1 object-cover"
                    />
                ) : (
                    <span>{text}</span>
                )}
            </span>
        </div>
    );
};
