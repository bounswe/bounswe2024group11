import * as Ariakit from "@ariakit/react";
import { RiCloseFill } from "@remixicon/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useDebounce } from "use-debounce";
import apiClient, { SWR_SETTINGS } from "../api";
import { inputClass, labelClass } from "./input";

type Dict = {
    NOUN: { id: string; description: string }[];
    VERB: { id: string; description: string }[];
    ADJ: { id: string; description: string }[];
    ADV: { id: string; description: string }[];
};

type SelectedTag = {
    id: string;
    title: string;
    description: string;
};

export const TagSearch = ({
    inputRef,
    onTagSelect,
}: {
    inputRef: React.RefObject<HTMLInputElement>;
    onTagSelect: (item: { id: string; description: string } | null) => void;
}) => {
    const [query, setQuery] = useState("");
    const [debouncedQuery] = useDebounce(query, 500);
    const [dictionary, setDictionary] = useState<Dict | null>(null);
    const [selectedTag, setSelectedTag] = useState<SelectedTag | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const { data, isLoading } = useSWR(
        debouncedQuery && !selectedTag ? `tagging-${debouncedQuery}` : null,
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
        type: string;
    }) => {
        setSelectedTag({
            id: item.id,
            title: debouncedQuery,
            description: item.description,
        });
        onTagSelect({
            id: item.id,
            description: item.description,
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

    return (
        <Ariakit.ComboboxProvider open={isOpen}>
            <div className="relative flex w-screen max-w-80 flex-col gap-1">
                <div className="h-20">
                    {selectedTag ? (
                        <div className="flex flex-col items-start gap-2">
                            <span className={labelClass({})}>Results for</span>
                            <div className="flex flex-1 items-center gap-2 rounded-full border border-slate-200 bg-cyan-900 py-0.5 pl-4 pr-0.5 text-lg font-medium text-white">
                                <span className="text-base">
                                    {selectedTag.title}
                                </span>
                                <Ariakit.Button
                                    onClick={handleClear}
                                    className="rounded-full p-2 transition-all hover:scale-105 hover:bg-cyan-950"
                                >
                                    <RiCloseFill size={16} />
                                </Ariakit.Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Ariakit.ComboboxLabel
                                className={labelClass({ className: "py-2" })}
                            >
                                Search Category
                            </Ariakit.ComboboxLabel>
                            <div className="flex w-full items-center gap-2">
                                <Ariakit.Combobox
                                    ref={inputRef}
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setIsOpen(true);
                                    }}
                                    onFocus={() => setIsOpen(true)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Escape") {
                                            setIsOpen(false);
                                            inputRef.current?.blur();
                                        }
                                    }}
                                    className={inputClass({
                                        className: "w-full",
                                    })}
                                    placeholder="automobile, sports, food"
                                />
                            </div>
                        </>
                    )}
                </div>

                <Ariakit.ComboboxPopover
                    gutter={4}
                    className="rounded-md absolute z-50 max-h-64 w-full max-w-lg overflow-auto rounded-2 bg-white shadow-lg ring ring-slate-200"
                >
                    <Ariakit.ComboboxList className="flex flex-col gap-2 overflow-auto px-2 py-2">
                        {isLoading ? (
                            <div className="w-full px-4 py-2 text-sm text-slate-500">
                                Loading...
                            </div>
                        ) : suggestions.length === 0 && debouncedQuery ? (
                            <div className="px-4 py-2 text-sm text-slate-500">
                                No results found
                            </div>
                        ) : (
                            suggestions.map((item) => (
                                <Ariakit.ComboboxItem
                                    key={item.id}
                                    className="group flex cursor-pointer items-center justify-between gap-3 overflow-hidden rounded-1 px-2 py-2 text-sm transition-colors duration-100 hover:bg-slate-200"
                                    onClick={() => handleSelect(item)}
                                >
                                    <span className="text-xstext-slate-700 w-12 rounded-1 bg-slate-100 px-2 py-1 text-xs font-medium">
                                        {item.type}
                                    </span>
                                    <div className="flex flex-1 flex-col items-start text-start">
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
    );
};

export default TagSearch;
