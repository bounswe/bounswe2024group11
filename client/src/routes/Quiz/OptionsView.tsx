import { Button } from "@ariakit/react";
import { useState } from "react";
import { InfoBox } from "../../components/info-box";
import { inputClass, labelClass } from "../../components/input";
import { Tag } from "../Forum/Forum.schema";
import { QuizCreate } from "./Quiz.schema";
import { questionTypeToQuestion } from "./Quiz.utils";

interface OptionsViewProps {
    quiz: QuizCreate;
    tag?: Tag;
    wrongAnswers: { id: number; word: string }[];
    setWrongAnswers: (
        updater: (
            prev: { id: number; word: string }[],
        ) => { id: number; word: string }[],
    ) => void;
    onReset: () => void;
}

export const OptionsView = ({
    quiz,
    tag,
    wrongAnswers,
    setWrongAnswers,
    onReset,
}: OptionsViewProps) => {
    const [showInfo, setShowInfo] = useState(
        localStorage.getItem("quiz-info-shown") !== "true",
    );
    const handleInfoClose = () => {
        setShowInfo(false);
        localStorage.setItem("quiz-info-shown", "true");
    };
    return (
        <div>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <span className="flex-1 text-lg font-medium text-slate-800">
                        {questionTypeToQuestion(quiz.type, tag?.name || "")}
                    </span>
                    <Button
                        className="text-sm font-semibold text-red-700 underline-offset-2 hover:underline"
                        onClick={onReset}
                    >
                        <span>Change</span>
                    </Button>
                </div>
                <label className={labelClass()}>
                    Correct Option
                    <input
                        className={inputClass()}
                        type="text"
                        value={tag?.name}
                        disabled
                    />
                </label>
                {wrongAnswers.map((wrongAnswer, id) => (
                    <label key={wrongAnswer.id} className={labelClass()}>
                        Incorrect Option {id + 1}
                        <input
                            className={inputClass()}
                            type="text"
                            value={wrongAnswers[id].word}
                            onChange={(e) =>
                                setWrongAnswers((prev) => {
                                    const newWrongAnswers = [...prev];
                                    newWrongAnswers[id].word = e.target.value;
                                    return newWrongAnswers;
                                })
                            }
                        />
                    </label>
                ))}
            </div>
            <InfoBox show={showInfo} onClose={handleInfoClose} />
        </div>
    );
};
