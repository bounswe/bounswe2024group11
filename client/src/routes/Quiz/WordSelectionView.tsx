import { Discuss } from "react-loader-spinner";
import { inputClass, labelClass } from "../../components/input";
import { Tag } from "../Forum/Forum.schema";
import { tagOptionClass } from "../Forum/NewForum";

const indexToSense = ["NOUN", "VERB", "ADJ", "ADV"] as const;

interface WordSelectionViewProps {
    search: string;
    setSearch: (value: string) => void;
    isLoading: boolean;
    nounOptions: Tag[];
    adjectiveOptions: Tag[];
    adverbOptions: Tag[];
    verbOptions: Tag[];
    setCorrectAnswer: (tag: Tag) => void;
    setView: (view: "word" | "options") => void;
    setSense: (sense: "NOUN" | "VERB" | "ADJ" | "ADV") => void;
    placeholder: string;
}

export const WordSelectionView = ({
    search,
    setSearch,
    isLoading,
    nounOptions,
    adjectiveOptions,
    adverbOptions,
    verbOptions,
    setCorrectAnswer,
    setView,
    setSense,
    placeholder,
}: WordSelectionViewProps) => {
    const sections = [
        { title: "Nouns", options: nounOptions },
        { title: "Adjectives", options: adjectiveOptions },
        { title: "Adverbs", options: adverbOptions },
        { title: "Verbs", options: verbOptions },
    ];

    return (
        <div className="flex flex-col gap-2">
            <label className={labelClass({ className: "flex-1" })}>
                <input
                    className={inputClass()}
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    required
                    placeholder={placeholder}
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
                                            setCorrectAnswer(tag);
                                            setView("options");
                                            setSearch("");
                                            setSense(indexToSense[i]);
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
