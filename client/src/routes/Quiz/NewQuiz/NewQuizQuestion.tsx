import { Button } from "@ariakit/react";
import { RiAddLine, RiArrowLeftLine, RiCheckLine } from "@remixicon/react";
import { useState } from "react";
import { buttonClass, buttonInnerRing } from "../../../components/button";
import { useTaggingSearch } from "../../../hooks/tagging";
import { Tag } from "../../Forum/Forum.schema";
import { getPlaceholder } from "./NewQuiz-utils";
import { NewQuizQuestionOptions } from "./NewQuizQuestionOptions";
import { useQuizStore } from "./state";
import { WordSelectionView } from "./WordSelectionView";

type NewQuizQuestionProps = {
    qIndex: number;
};

type NewQuizQuestionsProps = {
    onBack: () => void;
};

export const NewQuizQuestions = ({ onBack }: NewQuizQuestionsProps) => {
    const [questionCount, setQuestionCount] = useState(1);
    const [open, setOpen] = useState(false);
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: questionCount }).map((_, index) => (
                <NewQuizQuestion qIndex={index} />
            ))}
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

export const NewQuizQuestion = ({ qIndex }: NewQuizQuestionProps) => {
    const [search, setSearch] = useState("");
    const { quiz, addQuestion, updateQuestion } = useQuizStore();
    const { data, error, isLoading, debouncedSearch } = useTaggingSearch(
        search,
        quiz,
    );
    const [view, setView] = useState<"word" | "options">("word");
    const [tag, setCorrectAnswer] = useState<Tag>();
    const [sense, setSense] = useState<"NOUN" | "VERB" | "ADJ" | "ADV">("NOUN");

    const nounOptions: Tag[] =
        data?.NOUN?.map((word) => ({
            name: search,
            linked_data_id: word.id,
            description: word.description,
        })) || [];
    const verbOptions: Tag[] =
        data?.VERB?.map((word) => ({
            name: search,
            linked_data_id: word.id,
            description: word.description,
        })) || [];
    const adjectiveOptions: Tag[] =
        data?.ADJ?.map((word) => ({
            name: search,
            linked_data_id: word.id,
            description: word.description,
        })) || [];
    const adverbOptions: Tag[] =
        data?.ADV?.map((word) => ({
            name: search,
            linked_data_id: word.id,
            description: word.description,
        })) || [];

    const handleReset = () => {
        setCorrectAnswer(undefined);
        setView("word");
        setSense("NOUN");
    };

    return (
        <fieldset
            key={qIndex}
            className="relative flex flex-col gap-2 rounded-2 p-4 ring ring-slate-200"
        >
            <legend className="bg-white px-2 text-sm uppercase tracking-widest text-slate-700">
                Question {qIndex + 1}
            </legend>

            {view === "word" && (
                <WordSelectionView
                    search={search}
                    setSearch={setSearch}
                    isLoading={isLoading}
                    nounOptions={nounOptions}
                    adjectiveOptions={adjectiveOptions}
                    adverbOptions={adverbOptions}
                    verbOptions={verbOptions}
                    setSense={setSense}
                    setCorrectAnswer={setCorrectAnswer}
                    setView={setView}
                    placeholder={getPlaceholder(quiz.type)}
                />
            )}

            {view === "options" && (
                <NewQuizQuestionOptions
                    qIndex={qIndex}
                    onReset={handleReset}
                    sense={sense}
                />
            )}
        </fieldset>
    );
};
