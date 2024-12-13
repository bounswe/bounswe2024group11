import * as Ariakit from "@ariakit/react";
import { Button } from "@ariakit/react";
import { RiAddLine, RiArrowLeftLine, RiCheckLine } from "@remixicon/react";
import { Dispatch, SetStateAction, useState } from "react";
import { Form } from "react-router-dom";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { inputClass, labelClass } from "../../components/input";
import { NewQuizHead } from "./NewQuizHead";
import { NewQuizQuestion } from "./NewQuizQuestion";
import { QuizCreate, QuizQuestionCreate } from "./Quiz.schema";

const getQuestionType = (type: number) => {
    switch (type) {
        case 1:
            return "English to Turkish";
        case 2:
            return "Turkish to English";
        case 3:
            return "English word to Sense";
        default:
            return "Unknown";
    }
};

export const NewQuiz = () => {
    const [quiz, setQuiz] = useState<QuizCreate>({
        title: "",
        description: "",
        tags: [],
        type: 1,
        questions: [],
    });

    const [view, setView] = useState<"details" | "questions">("details");

    const [settledIndices, setSettledIndices] = useState<Set<number>>(
        new Set(),
    );

    const [questionCount, setQuestionCount] = useState(1);

    const setQuizField = (field: keyof QuizCreate, value: any) => {
        setQuiz({ ...quiz, [field]: value });
    };

    const addQuestion = (question: QuizQuestionCreate) => {
        setQuiz({
            ...quiz,
            questions: [...quiz.questions, question],
        });
    };

    return (
        <div
            className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12"
            role="main"
        >
            <NewQuizHead />
            <main className="flex flex-col items-center gap-12">
                <Form
                    className="flex w-full max-w-lg flex-col gap-4 self-center"
                    method="POST"
                >
                    <input
                        type="hidden"
                        name="quiz"
                        value={JSON.stringify(quiz)}
                    />
                    {view === "details" && (
                        <>
                            <QuizDetails
                                setQuizField={setQuizField}
                                quiz={quiz}
                                setSettledIndices={setSettledIndices}
                                addQuestion={addQuestion}
                                questionCount={questionCount}
                                setQuestionCount={setQuestionCount}
                            />{" "}
                            <Button
                                className={buttonClass({
                                    intent: "primary",
                                    icon: "left",
                                })}
                                onClick={() => setView("questions")}
                            >
                                <RiCheckLine size={16} />
                                <span
                                    className={buttonInnerRing({
                                        intent: "primary",
                                    })}
                                />
                                Add Questions
                            </Button>
                        </>
                    )}
                    {view === "questions" && (
                        <QuizQuestions
                            quiz={quiz}
                            addQuestion={addQuestion}
                            setSettledIndices={setSettledIndices}
                            onBack={() => setView("details")}
                        />
                    )}
                </Form>
            </main>
        </div>
    );
};

type QuizDetailsProps = {
    setQuizField: (field: keyof QuizCreate, value: any) => void;
    quiz: QuizCreate;
    setSettledIndices: Dispatch<SetStateAction<Set<number>>>;
    addQuestion: (question: QuizQuestionCreate) => void;
    questionCount: number;
    setQuestionCount: Dispatch<SetStateAction<number>>;
};

const QuizDetails = ({
    setQuizField,
    quiz,
    setSettledIndices,
    addQuestion,
    questionCount,
    setQuestionCount,
}: QuizDetailsProps) => {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-lg font-medium">Quiz Details</h2>
            <fieldset className="flex flex-col gap-2 rounded-2 bg-slate-100 p-4 ring ring-slate-200">
                <label className={labelClass()}>
                    Title
                    <input
                        className={inputClass()}
                        value={quiz.title}
                        onChange={(e) => setQuizField("title", e.target.value)}
                        maxLength={255}
                        required
                        placeholder="Cars, Video Games, etc."
                    />
                </label>
                <label className={labelClass()}>
                    Description
                    <textarea
                        className={inputClass()}
                        value={quiz.description}
                        onChange={(e) =>
                            setQuizField("description", e.target.value)
                        }
                        required
                        placeholder="Essential knowledge to understand the driving force behind the automotive industry."
                    />
                </label>
                <label className={labelClass()}>
                    Type
                    <select
                        className={inputClass()}
                        value={quiz.type}
                        onChange={(e) => {
                            setQuizField("type", Number(e.target.value));
                            setQuestionCount(1);
                        }}
                    >
                        {[1, 2, 3].map((type) => (
                            <option key={type} value={type}>
                                {getQuestionType(type)}
                            </option>
                        ))}
                    </select>
                </label>
            </fieldset>
        </div>
    );
};

type QuizQuestionProps = {
    quiz: QuizCreate;
    addQuestion: (question: QuizQuestionCreate) => void;
    setSettledIndices: Dispatch<SetStateAction<Set<number>>>;
    onBack: () => void;
};

const QuizQuestions = ({
    quiz,
    addQuestion,
    setSettledIndices,
    onBack,
}: QuizQuestionProps) => {
    const [questionCount, setQuestionCount] = useState(1);
    const [open, setOpen] = useState(false);
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: questionCount }).map((_, index) => (
                <NewQuizQuestion
                    qIndex={index}
                    quiz={quiz}
                    addQuestion={addQuestion}
                    onSettle={() => {
                        setSettledIndices((prev) => {
                            const newSet = new Set(prev);
                            newSet.add(index);
                            return newSet;
                        });
                    }}
                    onUnsettle={() => {
                        setSettledIndices((prev) => {
                            const newSet = new Set(prev);
                            newSet.delete(index);
                            return newSet;
                        });
                    }}
                />
            ))}
            <div className="grid grid-cols-3 gap-2">
                <Ariakit.PopoverProvider>
                    <Ariakit.PopoverDisclosure
                        className={buttonClass({
                            intent: "tertiary",
                            icon: "left",
                            className: "flex-1",
                        })}
                        onClick={() => setOpen(true)}
                    >
                        <RiArrowLeftLine size={16} />
                        Quiz Details
                    </Ariakit.PopoverDisclosure>
                    <Ariakit.Popover className="flex max-w-sm flex-col gap-4 rounded-3 bg-slate-100 p-3 text-white">
                        <Ariakit.PopoverArrow className="arrow" />
                        <div className="flex flex-col gap-1">
                            <Ariakit.PopoverHeading className="text-base font-medium text-slate-800">
                                Return to quiz details?
                            </Ariakit.PopoverHeading>
                            <Ariakit.PopoverDescription className="text-sm text-slate-500">
                                Returning to quiz details will delete all
                                currently added questions
                            </Ariakit.PopoverDescription>
                        </div>
                        <div className="flex justify-stretch gap-2">
                            <Ariakit.Button
                                onClick={() => setOpen(false)}
                                className={buttonClass({
                                    intent: "tertiary",
                                    className: "flex-1",
                                })}
                            >
                                Cancel
                            </Ariakit.Button>
                            <Ariakit.Button
                                onClick={() => onBack()}
                                className={buttonClass({
                                    intent: "destructive",
                                    className: "flex-1",
                                })}
                            >
                                Go Back
                            </Ariakit.Button>
                        </div>
                    </Ariakit.Popover>
                </Ariakit.PopoverProvider>

                <Button
                    type="button"
                    onClick={() => setQuestionCount((prev) => prev + 1)}
                    className={buttonClass({
                        intent: "secondary",
                        className: "flex-1",
                        icon: "left",
                    })}
                >
                    <RiAddLine size={16} />
                    New Question
                    <span
                        className={buttonInnerRing({
                            intent: "secondary",
                        })}
                    ></span>
                </Button>

                <Button
                    type="submit"
                    className={buttonClass({ intent: "primary", icon: "left" })}
                >
                    <RiCheckLine size={16} />
                    Create Quiz
                    <span
                        className={buttonInnerRing({
                            intent: "primary",
                        })}
                    ></span>
                </Button>
            </div>
        </div>
    );
};

export default NewQuiz;
