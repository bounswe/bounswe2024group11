import * as Ariakit from "@ariakit/react";
import { RiCloseFill, RiSearchLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import { Discuss } from "react-loader-spinner";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { useDebounce } from "use-debounce";
import apiClient, { SWR_SETTINGS } from "../api";
import { inputClass } from "./input";

type Dict = {
    NOUN: { id: string; description: string; word: string }[];
    VERB: { id: string; description: string; word: string }[];
    ADJ: { id: string; description: string; word: string }[];
    ADV: { id: string; description: string; word: string }[];
};

type SelectedTag = {
    id: string;
    word: string;
    description: string;
};

export const TagSearch = ({
    inputRef,
    onTagSelect,
}: {
    inputRef: React.RefObject<HTMLInputElement>;
    onTagSelect: (
        item: { id: string; description: string; word: string } | null,
    ) => void;
}) => {
    const [query, setQuery] = useState("");
    const [debouncedQuery] = useDebounce(query, 500);
    const [dictionary, setDictionary] = useState<Dict | null>(null);
    const [selectedTag, setSelectedTag] = useState<SelectedTag | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const { data, isLoading } = useSWR(
        !selectedTag ? `tagging-${debouncedQuery}` : null,
        () =>
            apiClient
                .get("/tagging/", {
                    params: {
                        word: debouncedQuery,
                        lang: "en",
                    },
                })
                .then((res) => res.data as Dict),
        SWR_SETTINGS,
    );

    useEffect(() => {
        if (data) {
            setDictionary(data);
        }
    }, [data]);

    const suggestions = dictionary
        ? Object.entries(dictionary).flatMap(([type, items]) =>
              items.map((item) => ({
                  ...item,
                  type,
              })),
          )
        : [];

    const handleSelect = (item: {
        id: string;
        description: string;
        word: string;
        type: string;
    }) => {
        setSelectedTag({
            id: item.id,
            word: item.word,
            description: item.description,
        });
        onTagSelect({
            id: item.id,
            description: item.description,
            word: item.word,
        });
        setQuery("");
        setDictionary(null);
        setIsOpen(false);
    };

    const handleClear = () => {
        setSelectedTag(null);
        setQuery("");
        setDictionary(null);
        onTagSelect(null);
        inputRef.current?.focus();
    };

    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        if (!searchParams.get("linked_data_id")) {
            setQuery("");
            setDictionary(null);
            setSelectedTag(null);
            setIsOpen(false);
        }
    }, [searchParams]);

    return (
        <div className="relative w-screen max-w-md">
            <Ariakit.ComboboxProvider open={isOpen} setOpen={setIsOpen}>
                <div className="flex flex-col gap-1">
                    <div className="flex h-12 items-end">
                        {selectedTag ? (
                            <div className="flex h-full flex-col items-end gap-2">
                                <div className="flex h-full items-end">
                                    <div className="flex flex-1 items-center gap-2 rounded-full bg-cyan-100 py-0.5 pl-4 pr-0.5 text-lg font-medium text-cyan-900">
                                        <span className="text-base">
                                            {selectedTag.word}
                                        </span>
                                        <Ariakit.Button
                                            onClick={handleClear}
                                            className="rounded-full p-2 transition-all hover:scale-105 hover:bg-cyan-800 hover:text-white"
                                        >
                                            <RiCloseFill size={16} />
                                        </Ariakit.Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex w-full items-center gap-2">
                                    <Ariakit.Combobox
                                        ref={inputRef}
                                        value={query}
                                        onChange={(e) => {
                                            setQuery(e.target.value);
                                            if (e.target.value.length > 2) {
                                                setIsOpen(true);
                                            }
                                        }}
                                        onFocus={() => setIsOpen(true)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Escape") {
                                                setIsOpen(false);
                                                inputRef.current?.blur();
                                            }
                                        }}
                                        className={inputClass({
                                            className: "mt-auto w-full",
                                        })}
                                        placeholder="automobile, sports, food, geography..."
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <Ariakit.ComboboxPopover
                        gutter={4}
                        sameWidth
                        className="absolute top-full z-50 mt-1 max-h-64 w-full overflow-auto rounded-2 bg-white shadow-lg ring-1 ring-slate-200"
                    >
                        <Ariakit.ComboboxList className="p-2">
                            {isLoading ? (
                                <div className="flex items-center justify-center p-4">
                                    <Discuss
                                        wrapperClass="h-8 w-8"
                                        colors={["#64748b", "#64748b"]}
                                    />
                                </div>
                            ) : suggestions.length === 0 && debouncedQuery ? (
                                <div className="flex flex-col items-center gap-4 py-8">
                                    <div className="rounded-full bg-slate-50 p-5 text-slate-400">
                                        <RiSearchLine size={24} />
                                    </div>
                                    <span className="max-w-72 text-balance text-center text-sm text-slate-500">
                                        We did our best, but we couldn't find
                                        any results for your search.
                                    </span>
                                </div>
                            ) : (
                                suggestions.map((item) => (
                                    <Ariakit.ComboboxItem
                                        key={item.id}
                                        className="rounded group flex cursor-pointer items-center gap-3 rounded-1 p-3 text-sm hover:bg-slate-100"
                                        onClick={() => handleSelect(item)}
                                    >
                                        <span className="rounded w-12 bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                                            {item.type}
                                        </span>
                                        <div className="flex flex-1 flex-col">
                                            <span className="text-base font-medium text-slate-800">
                                                {debouncedQuery}
                                            </span>
                                            <span className="line-clamp-2 text-slate-500">
                                                {item.description}
                                            </span>
                                        </div>
                                    </Ariakit.ComboboxItem>
                                ))
                            )}
                        </Ariakit.ComboboxList>
                    </Ariakit.ComboboxPopover>
                </div>
            </Ariakit.ComboboxProvider>
        </div>
    );
};

export default TagSearch;
