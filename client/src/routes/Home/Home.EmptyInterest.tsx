import { Button } from "@ariakit/react";
import { RiAddLine, RiErrorWarningLine, RiPenNibLine } from "@remixicon/react";
import { useState } from "react";
import { Discuss } from "react-loader-spinner";
import { useFetcher } from "react-router-dom";
import { buttonClass } from "../../components/button";
import { inputClass, labelClass } from "../../components/input";
import { useTaggingSearch } from "../../hooks/tagging";
import { Tag } from "../Forum/Forum.schema";
import { interestAction } from "./Home.data";

export const HomeEmptyInterest = () => {
    const interestFetcher = useFetcher<typeof interestAction>();
    const [search, setSearch] = useState("");
    const { data, isLoading, error, debouncedSearch } =
        useTaggingSearch(search);

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
        <div className="flex w-full max-w-xl flex-col items-center gap-4 self-center py-6 text-center">
            <div className="rounded-full bg-slate-100 p-5">
                <RiPenNibLine className="h-7 text-slate-400" size={32} />
            </div>
            <div className="flex flex-col items-center gap-4">
                <p className="text-base text-slate-600">
                    We have no idea what you are interested in. <br />
                    Add tags and we'll customize your feed for you.
                </p>
            </div>
            <div className="mt-2 self-stretch">
                <fieldset className="flex w-full flex-col items-stretch gap-2 text-start">
                    <label
                        className={labelClass({
                            className: "flex-1",
                        })}
                    >
                        Search for tags
                        <input
                            type="text"
                            className={inputClass()}
                            placeholder="automobile, fashion, tech, sports"
                            required
                            aria-label="Search for tags"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </label>
                </fieldset>
                <div className="mt-4 h-64 overflow-auto rounded-2 bg-slate-100 ring ring-slate-200">
                    {isLoading && (
                        <div className="flex h-full flex-col items-center justify-center gap-2">
                            <Discuss
                                wrapperClass="h-12 w-12 text-slate-500"
                                colors={["#64748b", "#64748b"]}
                            />
                        </div>
                    )}
                    {error && (
                        <div className="flex h-full flex-col items-center justify-center gap-2 px-4">
                            <div className="p-2">
                                <RiErrorWarningLine
                                    size={24}
                                    className="text-red-900"
                                />
                            </div>
                            <span className="text-balance pb-4 text-sm text-red-900">
                                We can not find topics for your search at the
                                moment. Mind giving a break and trying it again
                                later?
                            </span>
                        </div>
                    )}
                    {!isLoading && (
                        <div className="flex flex-col items-start gap-2">
                            {[
                                { title: "Nouns", options: nounOptions },
                                {
                                    title: "Adjectives",
                                    options: adjectiveOptions,
                                },
                                { title: "Adverbs", options: adverbOptions },
                                { title: "Verbs", options: verbOptions },
                            ].map(({ title, options }) => {
                                if (options.length === 0)
                                    return (
                                        <span className="text-sm text-slate-600">
                                            No {title.toLowerCase()} found.
                                        </span>
                                    );
                                return (
                                    <div
                                        key={title}
                                        className="flex flex-col gap-3 rounded-2 p-2 ring-1 ring-slate-200"
                                    >
                                        <span className="text-sm font-medium">
                                            {title}
                                        </span>
                                        <div
                                            className="flex flex-col gap-2"
                                            role="listbox"
                                            aria-label={`Available ${title.toLowerCase()}`}
                                        >
                                            {options.map((tag) => (
                                                <interestFetcher.Form
                                                    data-linked-id={
                                                        tag.linked_data_id
                                                    }
                                                    key={tag.linked_data_id}
                                                    role="option"
                                                    tabIndex={0}
                                                >
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div className="flex flex-1 flex-col items-start gap-2 text-start">
                                                            <span className="text-base font-medium">
                                                                {tag.name}
                                                            </span>
                                                            <span className="text-start text-xs opacity-80">
                                                                {
                                                                    tag.description
                                                                }
                                                            </span>
                                                        </div>
                                                        <Button
                                                            className={buttonClass(
                                                                {
                                                                    intent: "ghost",
                                                                    icon: "only",
                                                                    rounded:
                                                                        "full",
                                                                    className:
                                                                        "flex-none",
                                                                },
                                                            )}
                                                        >
                                                            <RiAddLine
                                                                size={16}
                                                            />
                                                            <span className="sr-only">
                                                                Add
                                                            </span>
                                                        </Button>
                                                    </div>
                                                </interestFetcher.Form>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
