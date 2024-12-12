import { Button } from "@ariakit/react";
import { RiInformation2Fill } from "@remixicon/react";
import { useState } from "react";
import { Discuss } from "react-loader-spinner";
import useSWR from "swr";
import apiClient from "../../api";
import { inputClass, labelClass } from "../../components/input";
import { QuizCreate, QuizQuestionCreate } from "./Quiz.schema";

const getQuestionQueryLabel = (type: number) => {
    switch (type) {
        case 1:
            return "Search for an English word";
        case 2:
            return "Search for a Turkish word";
        case 3:
            return "Search for an English word";
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

type NewQuizQuestionProps = {
    qIndex: number;
    quiz: QuizCreate;
    onSettle: (question: QuizQuestionCreate) => void;
    onUnsettle: (question: QuizQuestionCreate) => void;
    addQuestion: (question: QuizQuestionCreate) => void;
};

export const NewQuizQuestion = ({
    qIndex,
    quiz,
    onSettle,
    onUnsettle,
}: NewQuizQuestionProps) => {
    const [showInfo, setShowInfo] = useState(
        localStorage.getItem("quiz-info-shown") !== "true",
    );
    const [search, setSearch] = useState("");
    const { data, error, isLoading } = useSWR(`/tagging/${search}`, () => {
        return apiClient.get("/tagging2/", {
            params: {
                word: search,
                lang: quiz.type === 2 ? "tr" : "en",
            },
        });
    });
    const [wrongAnswers, setWrongAnswers] = useState<
        { id: number; word: string }[]
    >([
        {
            id: 0,
            word: "",
        },
        {
            id: 1,
            word: "",
        },
        {
            id: 2,
            word: "",
        },
    ]);
    return (
        <fieldset
            key={qIndex}
            className="relative flex flex-col gap-2 rounded-2 p-4 ring ring-slate-200"
        >
            <legend className="bg-white px-2 text-sm uppercase tracking-widest text-slate-700">
                Question {qIndex + 1}
            </legend>

            <div className="flex gap-2">
                <label
                    className={labelClass({
                        className: "flex-1",
                    })}
                >
                    {getQuestionQueryLabel(quiz.type)}
                    <input
                        className={inputClass()}
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        required
                        placeholder={getPlaceholder(quiz.type)}
                    />
                </label>
            </div>
            <div>
                <div className={labelClass()}>Choices</div>
                {isLoading && (
                    <div>
                        <Discuss
                            wrapperClass="h-8 w-8 text-slate-500"
                            colors={["#64748b", "#64748b"]}
                        />
                    </div>
                )}

                <div className="flex flex-col gap-2">
                    {wrongAnswers.map((wrongAnswer, id) => (
                        <label className={labelClass()}>
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
            </div>
            {showInfo && (
                <div className="flex items-center gap-2 rounded-2 bg-yellow-50 px-3 py-2 text-sm text-slate-500">
                    <RiInformation2Fill size={16} className="text-yellow-800" />
                    <span className="flex-1 text-sm text-yellow-800">
                        We'll shuffle the options for you when you create the
                        quiz.
                    </span>
                    <Button
                        className="rounded-2 px-3 py-2 text-sm font-semibold text-yellow-700 hover:text-yellow-900"
                        aria-label="Close the information box"
                        onClick={() => {
                            setShowInfo(false);
                            localStorage.setItem("quiz-info-shown", "true");
                        }}
                    >
                        OK
                    </Button>
                </div>
            )}
        </fieldset>
    );
};
