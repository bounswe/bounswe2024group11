import { Separator } from "@ariakit/react";
import { RiAddLine } from "@remixicon/react";
import { useState } from "react";
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

const getQuestionQueryLabel = (type: number) => {
    switch (type) {
        case 1:
            return "English word";
        case 2:
            return "Turkish word";
        case 3:
            return "English word";
        default:
            return "Unknown";
    }
};

const getPlaceholder = (type: number) => {
    switch (type) {
        case 1:
            return "cast";
        case 2:
            return "mertebe";
        case 3:
            return "clique";
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
                <Form className="w-full max-w-lg self-center" method="POST">
                    <input
                        type="hidden"
                        name="quiz"
                        value={JSON.stringify(quiz)}
                    />
                    <div className="flex flex-col gap-4">
                        <h2 className="text-lg font-medium">Quiz Details</h2>
                        <fieldset className="flex flex-col gap-2 rounded-2 bg-slate-100 p-4 ring ring-slate-200">
                            <label className={labelClass()}>
                                Title
                                <input
                                    className={inputClass()}
                                    value={quiz.title}
                                    onChange={(e) =>
                                        setQuizField("title", e.target.value)
                                    }
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
                                        setQuizField(
                                            "description",
                                            e.target.value,
                                        )
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
                                    onChange={(e) =>
                                        setQuizField(
                                            "type",
                                            Number(e.target.value),
                                        )
                                    }
                                >
                                    {[1, 2, 3].map((type) => (
                                        <option key={type} value={type}>
                                            {getQuestionType(type)}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </fieldset>
                        <Separator className="my-4" />
                        {Array.from({ length: questionCount }).map(
                            (_, index) => (
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
                            ),
                        )}
                        <div className="flex justify-stretch gap-4">
                            <button
                                type="button"
                                onClick={() =>
                                    setQuestionCount((prev) => prev + 1)
                                }
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
                            </button>

                            <button
                                type="submit"
                                className={buttonClass({ intent: "primary" })}
                            >
                                Create Quiz
                                <span
                                    className={buttonInnerRing({
                                        intent: "primary",
                                    })}
                                ></span>
                            </button>
                        </div>
                    </div>
                </Form>
            </main>
        </div>
    );
};

export default NewQuiz;
