import { Button, Separator } from "@ariakit/react";
import {
    RiAddLine,
    RiArrowDownLine,
    RiArrowLeftLine,
    RiArrowUpLine,
    RiCheckLine,
    RiDeleteBinLine,
} from "@remixicon/react";
import { useState } from "react";
import { buttonClass, buttonInnerRing } from "../../../components/button";
import { NewQuizQuestionOptions } from "./NewQuizQuestionOptions";
import {
    createInitialChoices,
    createInitialQuestion,
    useQuizStore,
} from "./state";
import { WordSelectionView } from "./WordSelectionView";

type NewQuizQuestionProps = {
    index: number;
};

type NewQuizQuestionsProps = {
    onBack: () => void;
};

export const NewQuizQuestions = ({ onBack }: NewQuizQuestionsProps) => {
    const { quiz, addQuestion, getValidationErrors } = useQuizStore();
    return (
        <div className="flex flex-col gap-6">
            {Array.from({ length: quiz.questions.length }).map((_, index) => (
                <NewQuizQuestion
                    data-question-id={quiz.questions[index].id}
                    key={quiz.questions[index].id}
                    index={index}
                />
            ))}
            <Separator className="border-slate-200" />
            <div className="grid grid-cols-3 gap-2">
                <Button
                    className={buttonClass({
                        intent: "tertiary",
                        icon: "left",
                        className: "flex-1",
                    })}
                    onClick={() => onBack()}
                >
                    <RiArrowLeftLine size={16} />
                    Quiz Details
                </Button>

                <Button
                    type="button"
                    onClick={() => addQuestion(createInitialQuestion())}
                    className={buttonClass({
                        intent: "secondary",
                        className: "flex-1",
                        icon: "left",
                    })}
                >
                    <RiAddLine size={16} />
                    Add Question
                    <span
                        className={buttonInnerRing({
                            intent: "secondary",
                        })}
                    ></span>
                </Button>
                <Button
                    type="submit"
                    className={buttonClass({
                        intent: "primary",
                        icon: "left",
                    })}
                    disabled={getValidationErrors().length > 0}
                    onClick={() => {}}
                >
                    <RiCheckLine size={16} />
                    Submit Quiz
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

export const NewQuizQuestion = ({ index }: NewQuizQuestionProps) => {
    const {
        quiz,
        deleteQuestion,
        reorderQuestions,
        setCorrectAnswer,
        updateQuestion,
    } = useQuizStore();
    const alreadyFilled = quiz.questions[index].question_tag !== null;
    const [view, setView] = useState<"word" | "options">(
        alreadyFilled ? "options" : "word",
    );
    const isFirstQuestion = index === 0;
    const isLastQuestion = index === quiz.questions.length - 1;

    return (
        <fieldset
            key={index}
            className="relative flex flex-col gap-2 rounded-2 p-4 ring ring-slate-200"
        >
            <legend className="-ml-4 bg-slate-100 px-3 text-sm uppercase tracking-widest text-slate-700 ring ring-slate-200">
                Question {index + 1}
            </legend>

            {view === "word" && (
                <WordSelectionView
                    index={index}
                    onChange={() => setView("options")}
                />
            )}

            {view === "options" && (
                <NewQuizQuestionOptions
                    index={index}
                    onQuestionReset={() => {
                        setView("word");
                        setCorrectAnswer(index, "");
                        updateQuestion(index, {
                            question_text: "",
                            choices: createInitialChoices(),
                        });
                    }}
                />
            )}
            <div className="flex gap-2">
                <div className="flex-1">
                    <Button
                        className={buttonClass({
                            intent: "tertiary",
                            size: "medium",
                            icon: "left",
                            className: "w-full",
                        })}
                        disabled={isFirstQuestion}
                        onClick={() => reorderQuestions(index, index - 1)}
                    >
                        <RiArrowUpLine size={16} />
                        <span>Move Up</span>
                    </Button>
                </div>
                <div className="flex-1">
                    <Button
                        className={buttonClass({
                            intent: "tertiary",
                            size: "medium",
                            icon: "left",
                            className: "w-full",
                        })}
                        disabled={isLastQuestion}
                        onClick={() => reorderQuestions(index, index + 1)}
                    >
                        <RiArrowDownLine size={16} />
                        <span>Move Down</span>
                    </Button>
                </div>
                <div className="flex-1">
                    <Button
                        className={buttonClass({
                            intent: "destructive",
                            size: "medium",
                            icon: "left",
                            className: "w-full",
                        })}
                        disabled={quiz.questions.length === 1}
                        onClick={() => deleteQuestion(index)}
                    >
                        <span
                            className={buttonInnerRing({
                                intent: "destructive",
                            })}
                        />
                        <RiDeleteBinLine size={16} />
                        <span>Delete</span>
                    </Button>
                </div>
            </div>
        </fieldset>
    );
};
