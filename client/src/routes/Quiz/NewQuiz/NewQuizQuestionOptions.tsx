import { Button, Separator } from "@ariakit/react";
import { useState } from "react";
import { InfoBox } from "../../../components/info-box";
import { inputClass, labelClass } from "../../../components/input";
import { questionTypeToQuestion } from "../Quiz.utils";
import { useQuizStore } from "./state";

interface OptionsViewProps {
    index: number;
    onQuestionReset: (id: number) => void;
}

export const NewQuizQuestionOptions = ({
    index,
    onQuestionReset,
}: OptionsViewProps) => {
    const [showInfo, setShowInfo] = useState(
        localStorage.getItem("quiz-info-shown") !== "true",
    );
    const { quiz, updateQuestion } = useQuizStore();
    const currentQuestion = quiz.questions[index];
    const tag = currentQuestion.question_tag;
    const handleInfoClose = () => {
        setShowInfo(false);
        localStorage.setItem("quiz-info-shown", "true");
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <div className="flex items-start gap-2">
                    <span className="flex-1 text-2xl font-medium text-slate-800">
                        {questionTypeToQuestion(quiz.type, tag?.name || "")}
                    </span>
                    <Button
                        className="rounded-1 px-3 py-2 text-sm font-semibold text-orange-700 underline-offset-2 transition-all hover:bg-orange-100"
                        onClick={() => {
                            onQuestionReset(index);
                        }}
                    >
                        <span>Change</span>
                    </Button>
                </div>

                {/* <label className={labelClass()}>
                    Correct Option
                    <select className={inputClass()}>
                        {data?.translations?.map((translation: any) => (
                            <option key={translation} value={translation}>
                                {translation}
                            </option>
                        ))}
                    </select>
                </label> */}
                <div className="flex flex-col gap-2">
                    {currentQuestion.choices.map((choice, i) => (
                        <label
                            data-choice-id={choice.id}
                            key={choice.id}
                            className={labelClass()}
                        >
                            {choice.is_correct ? (
                                <span className="text-sm font-medium text-slate-800">
                                    Correct Option
                                </span>
                            ) : (
                                <span className="text-sm font-medium text-slate-600">
                                    Option {i + 1}
                                </span>
                            )}

                            <input
                                className={inputClass()}
                                type="text"
                                value={choice.choice_text}
                                disabled={choice.is_correct}
                                onChange={(e) =>
                                    updateQuestion(index, {
                                        choices: currentQuestion.choices.map(
                                            (c, j) =>
                                                j === i
                                                    ? {
                                                          ...c,
                                                          choice_text:
                                                              e.target.value,
                                                      }
                                                    : c,
                                        ),
                                    })
                                }
                            />
                        </label>
                    ))}
                </div>
                <InfoBox show={showInfo} onClose={handleInfoClose} />
            </div>
            <Separator className="border-slate-200" />
        </div>
    );
};
