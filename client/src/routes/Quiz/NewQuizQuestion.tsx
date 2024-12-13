import { useState } from "react";
import { useTaggingSearch } from "../../hooks/tagging";
import { Tag } from "../Forum/Forum.schema";
import { getPlaceholder } from "./NewQuiz-utils";
import { OptionsView } from "./OptionsView";
import { QuizCreate, QuizQuestionCreate } from "./Quiz.schema";
import { WordSelectionView } from "./WordSelectionView";

type NewQuizQuestionProps = {
    qIndex: number;
    quiz: QuizCreate;
    onSettle: (question: QuizQuestionCreate) => void;
    onUnsettle: (id: number) => void;
    addQuestion: (question: QuizQuestionCreate) => void;
};

export const NewQuizQuestion = ({
    qIndex,
    quiz,
    onSettle,
    onUnsettle,
}: NewQuizQuestionProps) => {
    const [search, setSearch] = useState("");
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
                <OptionsView
                    quiz={quiz}
                    tag={tag}
                    qIndex={qIndex}
                    onReset={handleReset}
                    onSettle={onSettle}
                    sense={sense}
                    onUnsettle={onUnsettle}
                />
            )}
        </fieldset>
    );
};
