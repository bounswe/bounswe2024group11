import { Button } from "@ariakit/react";
import {
    RiAddLine,
    RiEmotionHappyLine,
    RiErrorWarningLine,
} from "@remixicon/react";
import { useState } from "react";
import { Discuss } from "react-loader-spinner";
import { useFetcher } from "react-router-dom";
import { buttonClass } from "../../components/button";
import { inputClass, labelClass } from "../../components/input";
import { useTaggingSearch } from "../../hooks/tagging";
import { Tag } from "../Forum/Forum.schema";
import { addInterestAction } from "../Profile/Profile.data";

export const AddInterestBlock = () => {
    const interestFetcher = useFetcher<typeof addInterestAction>();
    const [search, setSearch] = useState("");
    const { data, isLoading, error, debouncedSearch } =
        useTaggingSearch(search);

    const nounOptions: Tag[] =
        data?.NOUN?.map((word) => {
            return {
                name: word.word,
                linked_data_id: word.id,
                description: word.description,
            };
        }) || [];
    const verbOptions: Tag[] =
        data?.VERB?.map((word) => {
            return {
                name: word.word,
                linked_data_id: word.id,
                description: word.description,
            };
        }) || [];
    const adjectiveOptions: Tag[] =
        data?.ADJ?.map((word) => {
            return {
                name: word.word,
                linked_data_id: word.id,
                description: word.description,
            };
        }) || [];
    const adverbOptions: Tag[] =
        data?.ADV?.map((word) => {
            return {
                name: word.word,
                linked_data_id: word.id,
                description: word.description,
            };
        }) || [];
    const idle =
        nounOptions.length + verbOptions.length + adverbOptions.length === 0;
    return (
        <div className="flex w-full flex-col items-start gap-1 self-center pb-6 pt-2 text-center">
            <div className="mt-2 max-w-lg self-stretch">
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
                    {!isLoading && idle && (
                        <div className="flex h-full flex-col items-center justify-center gap-2">
                            <span className="flex flex-col items-center gap-2 text-sm text-slate-500">
                                <RiEmotionHappyLine />
                                We will show some cool tags once you start
                                typing
                            </span>
                        </div>
                    )}
                    {isLoading && (
                        <div className="flex h-full flex-col items-center justify-center gap-2">
                            <Discuss
                                wrapperClass="h-8 w-8 text-slate-500"
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
                        <div className="flex flex-col items-stretch gap-4 px-4 py-4">
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
                                        className="flex flex-1 flex-col gap-3 rounded-2 p-2"
                                    >
                                        <span className="text-xs font-medium uppercase tracking-wider text-slate-600">
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
                                                    method="post"
                                                    action={`/interest/add/${tag.linked_data_id}/`}
                                                    key={tag.linked_data_id}
                                                    role="option"
                                                    tabIndex={0}
                                                >
                                                    <input
                                                        type="hidden"
                                                        name="linked_data_id"
                                                        value={
                                                            tag.linked_data_id
                                                        }
                                                    />
                                                    <input
                                                        type="hidden"
                                                        name="name"
                                                        value={tag.name}
                                                    />
                                                    <input
                                                        type="hidden"
                                                        name="description"
                                                        value={tag.description}
                                                    />
                                                    <div className="flex items-center justify-between gap-6">
                                                        <div className="flex flex-1 flex-col items-start text-start">
                                                            <span className="text-lg font-medium">
                                                                {tag.name}
                                                            </span>
                                                            <span className="line-clamp-3 text-start text-xs leading-5 opacity-80">
                                                                {
                                                                    tag.description
                                                                }
                                                            </span>
                                                        </div>
                                                        <Button
                                                            type="submit"
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
                                        <hr className="mt-4 ring-slate-200" />
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
