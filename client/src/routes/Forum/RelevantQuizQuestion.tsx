import { Button } from "@ariakit/react";
import { RiDeleteBinLine } from "@remixicon/react";
import { cva } from "cva";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { labelClass } from "../../components/input";
import { QuizQuestion } from "../Quiz/Quiz.schema";

const relevantOptionClass = cva(
    [
        "flex",
        "items-center",
        "justify-center",
        "gap-2",
        "rounded-2",
        "p-2",
        "text-center",
        "text-xs",
        "ring-1",
        "ring-slate-200",
        "font-medium",
    ],
    {
        variants: {
            selected: {
                true: "bg-green-700 text-white",
                false: "bg-slate-100 text-slate-900",
            },
            disabled: {
                true: "cursor-not-allowed opacity-50",
                false: "",
            },
        },
    },
);

export const RelevantQuiz = ({
    quizQuestion,
    onQuizRemoval,
}: {
    quizQuestion: QuizQuestion;
    onQuizRemoval?: () => void;
}) => {
    return (
        <div className="flex flex-col gap-4 rounded-4 bg-slate-100 p-4 text-sm ring-1 ring-slate-100">
            <div className="flex items-center justify-between gap-2">
                <span className={labelClass()}>
                    {quizQuestion.question_text}
                </span>
                {onQuizRemoval && (
                    <Button
                        className={buttonClass({ intent: "destructive" })}
                        onClick={onQuizRemoval}
                        aria-label="Remove Relevant Quiz"
                    >
                        <span
                            className={buttonInnerRing({
                                intent: "destructive",
                            })}
                            aria-hidden="true"
                        />
                        <RiDeleteBinLine size={16} />
                    </Button>
                )}
            </div>
            <div className="grid grid-cols-2 gap-2">
                {quizQuestion.choices.map((choice) => (
                    <div
                        key={choice.id}
                        className={relevantOptionClass({
                            selected: choice.is_correct,
                        })}
                    >
                        {choice.choice_text}
                        {choice.is_correct && (
                            <svg
                                className="text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width={16}
                                height={16}
                                fill="currentColor"
                            >
                                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"></path>
                            </svg>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
