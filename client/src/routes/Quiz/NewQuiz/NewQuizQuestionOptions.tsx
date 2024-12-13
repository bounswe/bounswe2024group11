import { Button } from "@ariakit/react";
import { useState } from "react";
import useSWR from "swr";
import apiClient from "../../../api";
import { InfoBox } from "../../../components/info-box";
import { inputClass, labelClass } from "../../../components/input";
import { questionTypeToQuestion } from "../Quiz.utils";
import { useQuizStore } from "./state";

interface OptionsViewProps {
    qIndex: number;
    sense: "NOUN" | "VERB" | "ADJ" | "ADV";
    onReset: (id: number) => void;
}

export const NewQuizQuestionOptions = ({
    qIndex,
    sense,
    onReset,
}: OptionsViewProps) => {
    const [showInfo, setShowInfo] = useState(
        localStorage.getItem("quiz-info-shown") !== "true",
    );
    const { quiz } = useQuizStore();
    const tag = quiz.questions[qIndex].question_tag;
    const handleInfoClose = () => {
        setShowInfo(false);
        localStorage.setItem("quiz-info-shown", "true");
    };

    const allSenses: ("NOUN" | "VERB" | "ADJ" | "ADV")[] = [
        "NOUN",
        "VERB",
        "ADJ",
        "ADV",
    ];
    const otherSenses = allSenses.filter((s) => s !== sense);

    const [wrongAnswers, setWrongAnswers] = useState<
        { id: number; word: string }[]
    >(
        quiz.type === 3
            ? otherSenses.map((s, idx) => ({ id: idx, word: s }))
            : [
                  { id: 0, word: "" },
                  { id: 1, word: "" },
                  { id: 2, word: "" },
              ],
    );

    const { data, error, isLoading } = useSWR("translation", () => {
        if (quiz.type === 3) {
            return { translations: [sense] };
        }
        return apiClient
            .get("/get-translation/", {
                params: {
                    id: tag?.linked_data_id.replace("bn:", ""),
                    type: "type" + quiz.type,
                },
            })
            .then((res) => res.data);
    });

    const [correctAnswer, setCorrectAnswer] = useState<string>("");

    console.log("data", data);

    const difficultyQuery = useSWR(
        correctAnswer ? `difficulty-${tag?.name}` : null,
        () => {
            const keyword = quiz.type === 2 ? correctAnswer : tag?.name;
            return apiClient
                .get("/get-difficulty/", {
                    params: {
                        keyword,
                    },
                })
                .then((res) => res.data);
        },
    );

    return (
        <div>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <span className="flex-1 text-lg font-medium text-slate-800">
                        {questionTypeToQuestion(quiz.type, tag?.name || "")}
                    </span>
                    <Button
                        className="text-sm font-semibold text-red-700 underline-offset-2 hover:underline"
                        onClick={() => {
                            onReset(qIndex);
                        }}
                    >
                        <span>Change</span>
                    </Button>
                </div>
                <label className={labelClass()}>
                    Correct Option
                    <select className={inputClass()}>
                        {data?.translations?.map((translation) => (
                            <option key={translation} value={translation}>
                                {translation}
                            </option>
                        ))}
                    </select>
                </label>
                {quiz.type !== 3 &&
                    wrongAnswers.map((wrongAnswer, id) => (
                        <label key={wrongAnswer.id} className={labelClass()}>
                            Incorrect Option {id + 1}
                            <input
                                className={inputClass()}
                                type="text"
                                value={wrongAnswers[id].word}
                                onChange={(e) =>
                                    setWrongAnswers((prev) => {
                                        const newWrongAnswers = [...prev];
                                        newWrongAnswers[id].word =
                                            e.target.value;
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
