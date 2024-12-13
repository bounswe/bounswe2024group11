import { RiInformation2Fill } from "@remixicon/react";
import { useState } from "react";
import { Discuss } from "react-loader-spinner";
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
    const { quiz, updateQuestion } = useQuizStore();
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
        { title: "Nouns", options: nounOptions },
        { title: "Adjectives", options: adjectiveOptions },
        { title: "Adverbs", options: adverbOptions },
        { title: "Verbs", options: verbOptions },
    ];

    const noData = sections.every(({ options }) => options.length === 0);
    return (
        <div className="flex flex-col gap-2">
            <label className={labelClass({ className: "flex-1" })}>
                <span className="text-sm font-medium">
                    Enter a question word
                </span>
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
            {!isLoading && debouncedSearch && noData && (
                <div className="flex items-center gap-2 rounded-2 bg-yellow-50 px-3 py-2 text-sm text-slate-500">
                    <RiInformation2Fill size={16} className="text-yellow-800" />
                    <span>No data found.</span>
                </div>
            )}
            <div className="flex flex-col gap-2">
                {sections.map(({ title, options }, i) => {
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
                                    <div
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
                                        <span className="text-xs opacity-80">
                                            {tag.description}
                                        </span>
                                    </div>
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
