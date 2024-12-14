import { useState } from "react";
import { Discuss } from "react-loader-spinner";
import { InfoBox } from "../../../components/info-box";
import { inputClass, labelClass } from "../../../components/input";
import { useTaggingSearch } from "../../../hooks/tagging";
import { Tag } from "../../Forum/Forum.schema";
import { tagOptionClass } from "../../Forum/NewForum";
import { getPlaceholder } from "./NewQuiz-utils";
import { useQuizStore } from "./state";

const indexToSense = ["NOUN", "VERB", "ADJ", "ADV"] as const;

interface WordSelectionViewProps {
    index: number;
    onChange: () => void;
}

export const WordSelectionView = ({
    index,
    onChange,
}: WordSelectionViewProps) => {
    const [search, setSearch] = useState("");
    const { quiz, updateQuestion, setCorrectAnswer } = useQuizStore();
    const { data, error, isLoading, debouncedSearch } = useTaggingSearch(
        search,
        quiz,
    );
    const nounOptions: Tag[] =
        data?.NOUN?.map((word) => ({
            name: debouncedSearch,
            linked_data_id: word.id,
            description: word.description,
        })) || [];
    const verbOptions: Tag[] =
        data?.VERB?.map((word) => ({
            name: debouncedSearch,
            linked_data_id: word.id,
            description: word.description,
        })) || [];
    const adjectiveOptions: Tag[] =
        data?.ADJ?.map((word) => ({
            name: debouncedSearch,
            linked_data_id: word.id,
            description: word.description,
        })) || [];
    const adverbOptions: Tag[] =
        data?.ADV?.map((word) => ({
            name: debouncedSearch,
            linked_data_id: word.id,
            description: word.description,
        })) || [];
    const sections = [
        { title: "Nouns", options: nounOptions, sense: "NOUN" as const },
        {
            title: "Adjectives",
            options: adjectiveOptions,
            sense: "ADJ" as const,
        },
        { title: "Adverbs", options: adverbOptions, sense: "ADV" as const },
        { title: "Verbs", options: verbOptions, sense: "VERB" as const },
    ];

    const noData = sections.every(({ options }) => options.length === 0);
    return (
        <div className="flex flex-col gap-2">
            <label className={labelClass({ className: "flex-1" })}>
                <span className="text-sm font-medium">Enter a word</span>
                <input
                    className={inputClass()}
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    required
                    placeholder={getPlaceholder(quiz.type)}
                />
            </label>
            {isLoading && (
                <div>
                    <Discuss
                        wrapperClass="h-8 w-8 text-slate-500"
                        colors={["#64748b", "#64748b"]}
                    />
                </div>
            )}
            <InfoBox
                show={!isLoading && Boolean(debouncedSearch) && noData}
                message=" We couldn't find any words to match your search."
            />
            <div className="flex flex-col gap-2">
                {sections.map(({ title, options, sense }, i) => {
                    if (options.length === 0) return null;
                    return (
                        <div
                            key={title}
                            className="flex flex-col gap-3 rounded-2 p-2 ring-1 ring-slate-200"
                        >
                            <span className="text-sm font-medium">{title}</span>
                            <div
                                className="flex max-h-48 flex-col gap-2 overflow-auto"
                                role="listbox"
                                aria-label={`Available ${title.toLowerCase()}`}
                            >
                                {options.map((tag) => (
                                    <button
                                        key={tag.linked_data_id}
                                        className={tagOptionClass({})}
                                        role="option"
                                        tabIndex={0}
                                        onClick={() => {
                                            onChange();
                                            updateQuestion(index, {
                                                question_tag: tag,
                                            });
                                        }}
                                    >
                                        <span className="text-base font-medium">
                                            {tag.name}
                                        </span>
                                        <span className="text-start text-xs opacity-80">
                                            {tag.description}
                                        </span>
                                    </button>
                                ))}
                                {options.length === 0 && (
                                    <span className="text-xs text-slate-500">
                                        No {title.toLowerCase()} found.
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
