import * as Ariakit from "@ariakit/react";
import { Button, Separator } from "@ariakit/react";
import { RiLightbulbFlashLine } from "@remixicon/react";
import { cva } from "cva";
import { useEffect, useState } from "react";
import { Discuss } from "react-loader-spinner";
import useSWR from "swr";
import { safeParse } from "valibot";
import apiClient, { SWR_SETTINGS } from "../../../api";
import { buttonClass } from "../../../components/button";
import { InfoBox } from "../../../components/info-box";
import { inputClass, labelClass } from "../../../components/input";
import { questionTypeToQuestion } from "../Quiz.utils";
import { Hints, hintsSchema } from "./NewQuizQuestionOptionsHint";
import { useQuizStore } from "./state";

type OptionsViewProps = {
    index: number;
    onQuestionReset: (id: number) => void;
};

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

    const { quiz, updateQuestion, setCorrectAnswer, setQuestionPoints } =
        useQuizStore();
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

    const translationResponse = useSWR(
        quiz.type === 3 && !!linked_data_id
            ? null
            : `translation-${linked_data_id}`,
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
        SWR_SETTINGS,
    );

    const difficultyResponse = useSWR(
        linked_data_id ? `difficulty-${linked_data_id}` : null,
        () => {
            return apiClient
                .get("/get-difficulty/", {
                    params: {
                        keyword: tag?.name,
                    },
                })
                .then((res) => res.data);
        },
        SWR_SETTINGS,
    );

    const hints = useSWR(
        linked_data_id ? `hint-${linked_data_id}` : null,
        () => {
            return apiClient
                .get("/hint/", {
                    params: {
                        synset_id: linked_data_id,
                        target_lang: quiz.type === 2 ? "tr" : "en",
                        word: tag?.name,
                    },
                })
                .then((res) => {
                    const {
                        issues,
                        output: hints,
                        success,
                    } = safeParse(hintsSchema, res.data);
                    if (!success) {
                        console.error(issues);
                        throw new Error("Failed to parse hints response.");
                    }
                    return hints;
                });
        },
        SWR_SETTINGS,
    );

    const difficultyNumber = difficultyResponse.data?.question_point || 10;
    const possibleAnswers = translationResponse.data?.translations || [];

    useEffect(() => {
        if (
            possibleAnswers.length > 0 &&
            !currentQuestion.choices[0].choice_text
        ) {
            setCorrectAnswer(index, possibleAnswers[0]);
        }

        if (
            difficultyNumber &&
            currentQuestion.question_point !== difficultyNumber
        ) {
            setQuestionPoints(index, difficultyNumber);
        }
    }, [possibleAnswers, difficultyNumber]);

    if (translationResponse.isLoading || difficultyResponse.isLoading) {
        return <OptionsLoading />;
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-1 flex-col gap-4">
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
                        <div className="flex flex-col items-end gap-1.5">
                            <Button
                                className="rounded-1 px-3 py-2 text-xs font-semibold text-orange-700 underline-offset-2 transition-all hover:bg-orange-100"
                                onClick={() => {
                                    onQuestionReset(index);
                                }}
                            >
                                <span>Change</span>
                            </Button>
                            {quiz.questions[index].hints &&
                                quiz.questions[index].hints.length > 0 && (
                                    <>
                                        <Ariakit.MenuProvider placement="bottom-end">
                                            <Ariakit.MenuButton
                                                className={buttonClass({
                                                    intent: "secondary",
                                                    size: "medium",
                                                })}
                                            >
                                                <RiLightbulbFlashLine
                                                    size={16}
                                                />
                                            </Ariakit.MenuButton>
                                            <Ariakit.Menu className="top-0 w-full max-w-lg rounded-2 bg-slate-800 p-3 text-sm text-white">
                                                {quiz.questions[index].hints[0]
                                                    .type === "images" ? (
                                                    <img
                                                        src={
                                                            quiz.questions[
                                                                index
                                                            ].hints[0].text
                                                        }
                                                        alt="Hint image"
                                                        className="h-32 w-32 object-cover"
                                                    />
                                                ) : (
                                                    <span>
                                                        {
                                                            quiz.questions[
                                                                index
                                                            ].hints[0].text
                                                        }
                                                    </span>
                                                )}
                                            </Ariakit.Menu>
                                        </Ariakit.MenuProvider>
                                    </>
                                )}
                        </div>
                    </div>
                </div>
                {possibleAnswers.length === 0 && (
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col rounded-2 bg-orange-100 px-3 py-2">
                            <span className="text-sm font-medium text-orange-950">
                                We don't have a canned answer for this one
                            </span>
                            <span className="text-sm text-orange-950/70">
                                Go ahead and type in your own answer.
                            </span>
                        </div>
                        <label className={labelClass()}>
                            <span>Type correct answer</span>
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
                                    : "Incorrect Option"}
                            </span>
                            <input
                                className={inputClass()}
                                type="text"
                                readOnly={
                                    choice.is_correct ||
                                    (i === 0 && possibleAnswers.length !== 0)
                                }
                                value={choice.choice_text}
                                disabled={
                                    choice.is_correct ||
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
                <Separator className="border-slate-200" />

                <Hints hints={hints} questionIndex={index} />
            </div>
            <Separator className="border-slate-200" />
        </div>
    );
};
