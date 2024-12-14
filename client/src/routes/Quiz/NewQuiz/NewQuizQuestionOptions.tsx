import { Button, Separator } from "@ariakit/react";
import { cva } from "cva";
import { useEffect, useState } from "react";
import { Discuss } from "react-loader-spinner";
import useSWR from "swr";
import apiClient from "../../../api";
import { InfoBox } from "../../../components/info-box";
import { inputClass, labelClass } from "../../../components/input";
import { questionTypeToQuestion } from "../Quiz.utils";
import { useQuizStore } from "./state";

interface OptionsViewProps {
    index: number;
    onQuestionReset: (id: number) => void;
}

const difficultyBarClass = cva("h-full", {
    variants: {
        difficulty: {
            10: "w-[15%] bg-green-500",
            20: "w-[50%] bg-yellow-500",
            30: "w-[85%] bg-red-500",
        },
    },
});

const difficultyTextClass = cva(
    "text-center text-xs font-medium uppercase tracking-widest",
    {
        variants: {
            difficulty: {
                10: "text-green-800",
                20: "text-yellow-800",
                30: "text-red-800",
            },
        },
    },
);

const difficultyText = (difficulty: number) => {
    switch (difficulty) {
        case 10:
            return "Easy";
        case 20:
            return "Medium";
        case 30:
            return "Hard";
        default:
            return "Unknown";
    }
};

const loadingTextList = [
    "Loading possible answers...",
    "We're looking if we have any hints...",
    "Hold on, we're fetching the answers...",
];

const OptionsLoading = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex(
                (prevIndex) => (prevIndex + 1) % loadingTextList.length,
            );
        }, 2000);

        return () => clearInterval(interval); // Cleanup the interval on unmount
    }, []);

    return (
        <div className="flex flex-col items-center gap-2 py-4">
            <Discuss height={32} colors={["#64748b", "#64748b"]} />
            <span className="text-base text-slate-500">
                {loadingTextList[currentTextIndex]}
            </span>
        </div>
    );
};

export const NewQuizQuestionOptions = ({
    index,
    onQuestionReset,
}: OptionsViewProps) => {
    const [showInfo, setShowInfo] = useState(
        localStorage.getItem("quiz-info-shown") !== "true",
    );

    const { quiz, updateQuestion, setCorrectAnswer } = useQuizStore();
    const [showConfusion, setShowConfusion] = useState(
        quiz.type === 3 &&
            localStorage.getItem("quiz-confusion-shown") !== "true",
    );
    const currentQuestion = quiz.questions[index];
    const tag = currentQuestion.question_tag;
    const handleInfoClose = () => {
        setShowInfo(false);
        localStorage.setItem("quiz-info-shown", "true");
    };
    const handleConfusionClose = () => {
        setShowConfusion(false);
        localStorage.setItem("quiz-confusion-shown", "true");
    };
    const linked_data_id = tag?.linked_data_id.replace("bn:", "");

    const translation = useSWR(
        quiz.type === 3 ? null : `translation-${linked_data_id}`,
        () => {
            return apiClient
                .get("/get-translation/", {
                    params: {
                        id: linked_data_id,
                        type: "type" + quiz.type,
                    },
                })
                .then((res) => res.data);
        },
    );

    const difficulty = useSWR(`difficulty-${linked_data_id}`, () => {
        return apiClient
            .get("/get-difficulty/", {
                params: {
                    keyword: tag?.name,
                },
            })
            .then((res) => res.data);
    });

    const hint = useSWR(`hint-${linked_data_id}`, () => {
        return apiClient
            .get("/hint/", {
                params: {
                    synset_id: linked_data_id,
                    target_lang: quiz.type === 2 ? "tr" : "en",
                    word: tag?.name,
                },
            })
            .then((res) => res.data);
    });

    const difficultyNumber = difficulty.data?.question_point || 10;
    const possibleAnswers = translation.data?.translations || [];

    useEffect(() => {
        console.log("setting correct answer");

        if (
            possibleAnswers.length > 0 &&
            !currentQuestion.choices[0].choice_text
        ) {
            setCorrectAnswer(index, possibleAnswers[0]);
        }
    }, [possibleAnswers]);

    if (translation.isLoading || difficulty.isLoading) {
        return <OptionsLoading />;
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-8">
                        <div className="flex flex-1 flex-col items-start gap-4">
                            <span className="flex flex-col items-start gap-1 self-stretch">
                                <span
                                    className={difficultyTextClass({
                                        difficulty: difficultyNumber,
                                    })}
                                >
                                    {difficultyText(difficultyNumber)}
                                </span>
                                <span className="flex h-0.5 w-full self-stretch rounded-3 bg-slate-100">
                                    <span
                                        className={difficultyBarClass({
                                            difficulty: difficultyNumber,
                                        })}
                                    />
                                </span>
                            </span>
                            <span className="flex-1 text-2xl font-medium text-slate-800">
                                {questionTypeToQuestion(
                                    quiz.type,
                                    tag?.name || "",
                                )}
                            </span>
                        </div>
                        <Button
                            className="rounded-1 px-3 py-2 text-xs font-semibold text-orange-700 underline-offset-2 transition-all hover:bg-orange-100"
                            onClick={() => {
                                onQuestionReset(index);
                            }}
                        >
                            <span>Change</span>
                        </Button>
                    </div>

                    {showConfusion && (
                        <InfoBox
                            show={showConfusion}
                            onClose={handleConfusionClose}
                            message="We recommend avoiding words that can function as multiple parts of speech, as this may cause confusion."
                        />
                    )}
                </div>
                {possibleAnswers.length === 0 && quiz.type !== 3 && (
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col rounded-2 bg-orange-100 px-3 py-2">
                            <span className="text-sm font-medium text-orange-950">
                                We couldn't find any answers.
                            </span>
                            <span className="text-sm text-orange-950/70">
                                Don't sweat, you can still type in your own
                                answer.
                            </span>
                        </div>
                        <label className={labelClass()}>
                            <span>Type your answer</span>
                            <input
                                defaultValue={
                                    currentQuestion.choices[0].choice_text
                                }
                                type="text"
                                className={inputClass()}
                                onChange={(e) => {
                                    setCorrectAnswer(index, e.target.value);
                                }}
                            />
                        </label>
                    </div>
                )}
                {possibleAnswers.length > 0 && (
                    <div>
                        <label className={labelClass()}>
                            Select Correct Option
                            <select
                                defaultValue={
                                    currentQuestion.choices[0].choice_text
                                }
                                className={inputClass()}
                                onChange={(e) => {
                                    setCorrectAnswer(index, e.target.value);
                                }}
                            >
                                {possibleAnswers.map((translation: any) => (
                                    <option
                                        key={translation}
                                        value={translation}
                                    >
                                        {translation}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                )}
                <Separator className="my-2 border-slate-200" />

                <div className="flex flex-col gap-3">
                    {currentQuestion.choices.map((choice, i) => (
                        <label
                            data-choice-id={choice.id}
                            key={choice.id}
                            className={labelClass()}
                        >
                            <span>
                                {choice.is_correct
                                    ? "Correct Option"
                                    : "Option " + (i + 1)}
                            </span>
                            <input
                                className={inputClass()}
                                type="text"
                                readOnly={
                                    choice.is_correct ||
                                    quiz.type === 3 ||
                                    (i === 0 && possibleAnswers.length !== 0)
                                }
                                value={choice.choice_text}
                                disabled={
                                    choice.is_correct ||
                                    quiz.type === 3 ||
                                    (i === 0 && possibleAnswers.length !== 0)
                                }
                                onChange={(e) => {
                                    if (i === 0) return;
                                    return updateQuestion(index, {
                                        choices: currentQuestion.choices.map(
                                            (c, j) =>
                                                i === j
                                                    ? {
                                                          ...c,
                                                          choice_text:
                                                              e.target.value,
                                                      }
                                                    : c,
                                        ),
                                    });
                                }}
                            />
                        </label>
                    ))}
                </div>
                <InfoBox
                    show={showInfo}
                    onClose={handleInfoClose}
                    message="We'll shuffle the options for you when you create the quiz."
                />
            </div>
            <Separator className="border-slate-200" />
        </div>
    );
};
