import { Button } from "@ariakit/react";
import { RiCloseFill, RiErrorWarningLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import { Discuss } from "react-loader-spinner";
import { inputClass, labelClass } from "../../../components/input";
import { useTaggingSearch } from "../../../hooks/tagging";
import { logger } from "../../../utils";
import { Tag } from "../../Forum/Forum.schema";
import { tagOptionClass } from "../../Forum/NewForum";
import { getQuestionType } from "./NewQuiz";
import { useQuizStore } from "./state";

export const NewQuizDetails = () => {
    const [search, setSearch] = useState("");

    const { quiz, setQuizField, removeTag, setType, addTag } = useQuizStore();
    const { data, error, isLoading, debouncedSearch } = useTaggingSearch(
        search,
        quiz,
    );

    useEffect(() => {
        logger.log("effect", quiz.type);
    }, [quiz.type]);

    const nounOptions: Tag[] =
        data?.NOUN?.map((word) => {
            return {
                name: debouncedSearch,
                linked_data_id: word.id,
                description: word.description,
            };
        }) || [];
    const verbOptions: Tag[] =
        data?.VERB?.map((word) => {
            return {
                name: debouncedSearch,
                linked_data_id: word.id,
                description: word.description,
            };
        }) || [];
    const adjectiveOptions: Tag[] =
        data?.ADJ?.map((word) => {
            return {
                name: debouncedSearch,
                linked_data_id: word.id,
                description: word.description,
            };
        }) || [];
    const adverbOptions: Tag[] =
        data?.ADV?.map((word) => {
            return {
                name: debouncedSearch,
                linked_data_id: word.id,
                description: word.description,
            };
        }) || [];

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-lg font-medium">Quiz Details</h2>
            <fieldset className="flex flex-col gap-2 rounded-2 bg-slate-100 p-4 ring ring-slate-200">
                <label className={labelClass()}>
                    Title
                    <input
                        className={inputClass()}
                        value={quiz.title}
                        onChange={(e) => setQuizField("title", e.target.value)}
                        maxLength={255}
                        required
                        placeholder="Cars, Video Games, etc."
                    />
                </label>
                <label className={labelClass()}>
                    Description
                    <textarea
                        className={inputClass()}
                        value={quiz.description}
                        onChange={(e) =>
                            setQuizField("description", e.target.value)
                        }
                        required
                        placeholder="Essential knowledge to understand the driving force behind the automotive industry."
                    />
                </label>
                <label className={labelClass()}>
                    Type
                    <select
                        className={inputClass()}
                        value={quiz.type.toString()}
                        onChange={(e) => {
                            setType(Number(e.target.value));
                            setSearch("");
                        }}
                    >
                        {[1, 2, 3].map((type) => (
                            <option key={type} value={type}>
                                {getQuestionType(type)}
                            </option>
                        ))}
                    </select>
                </label>
                <label className={labelClass()}>
                    Search For Tag
                    <input
                        className={inputClass()}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        required
                        placeholder={quiz.type === 2 ? "fren" : "gearbox"}
                    />
                </label>
                <div
                    key={quiz.title}
                    className="flex flex-col gap-2"
                    role="region"
                    aria-label="Selected tags"
                >
                    <div className="flex gap-2">
                        {quiz.tags.map((tag) => (
                            <div
                                key={tag.linked_data_id}
                                className="flex items-center gap-1 rounded-2 bg-cyan-700 py-0.5 pl-3 pr-1 text-sm font-medium text-white"
                            >
                                <span>{tag.name}</span>
                                <Button
                                    className="rounded-full p-2 text-white transition-all hover:bg-cyan-800 hover:text-cyan-100"
                                    onClick={() =>
                                        removeTag(tag.linked_data_id)
                                    }
                                    aria-label={`Remove ${tag.name} tag`}
                                >
                                    <RiCloseFill size={16} aria-hidden="true" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
                {isLoading && (
                    <div className="flex items-center gap-2">
                        <Discuss
                            wrapperClass="h-8 w-8 text-slate-500"
                            colors={["#64748b", "#64748b"]}
                        />
                    </div>
                )}
                {error && (
                    <div className="flex items-center gap-2">
                        <RiErrorWarningLine
                            size={18}
                            className="text-red-500"
                        />
                        <span className="text-sm text-red-500">
                            An error occurred while fetching tags. Unfortunately
                            you need to proceed without tags.
                        </span>
                    </div>
                )}
                {!isLoading && (
                    <div className="flex flex-col gap-2">
                        {[
                            { title: "Nouns", options: nounOptions },
                            {
                                title: "Adjectives",
                                options: adjectiveOptions,
                            },
                            { title: "Adverbs", options: adverbOptions },
                            { title: "Verbs", options: verbOptions },
                        ].map(({ title, options }) => {
                            if (options.length === 0) return null;
                            return (
                                <div
                                    key={title}
                                    className="flex flex-col gap-3 rounded-2 bg-white p-2 ring-1 ring-slate-200"
                                >
                                    <span className="text-sm font-medium">
                                        {title}
                                    </span>
                                    <div
                                        className="flex max-h-48 flex-col gap-2 overflow-auto"
                                        role="listbox"
                                        aria-label={`Available ${title.toLowerCase()}`}
                                    >
                                        {options.map((tag) => (
                                            <div
                                                key={tag.linked_data_id}
                                                onClick={() => {
                                                    const alreadySelected =
                                                        quiz.tags.some(
                                                            (t) =>
                                                                t.linked_data_id ===
                                                                tag.linked_data_id,
                                                        );
                                                    if (alreadySelected) {
                                                        removeTag(
                                                            tag.linked_data_id,
                                                        );
                                                    } else {
                                                        addTag(tag);
                                                    }
                                                }}
                                                className={tagOptionClass({
                                                    selected: quiz.tags.some(
                                                        (t) =>
                                                            t.linked_data_id ===
                                                            tag.linked_data_id,
                                                    ),
                                                })}
                                                role="option"
                                                aria-selected={quiz.tags.some(
                                                    (t) =>
                                                        t.linked_data_id ===
                                                        tag.linked_data_id,
                                                )}
                                                tabIndex={0}
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
                )}
            </fieldset>
        </div>
    );
};
