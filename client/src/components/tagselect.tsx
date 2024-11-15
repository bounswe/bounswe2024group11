export interface AutocompleteTagProps {
    initialTags?: Tag[];
    availableTags: Tag[];
    onTagsChange?: (tags: Tag[]) => void;
    placeholder?: string;
}

// AutocompleteTag.tsx
import React, { ChangeEvent, useCallback, useState } from "react";
import { Tag } from "../types/post";
import { inputClass } from "./input";

const AutocompleteTag: React.FC<AutocompleteTagProps> = ({
    initialTags = [],
    availableTags = [],
    onTagsChange,
    placeholder = "Type to search for tags...",
}) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<Tag[]>(initialTags);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Filter options based on input value and exclude already selected tags
    const filteredOptions = availableTags.filter(
        (option) =>
            option.name.toLowerCase().includes(inputValue.toLowerCase()) &&
            !selectedTags.some((tag) => tag.id === option.id),
    );

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setIsOpen(true);
    };

    const handleOptionClick = useCallback(
        (option: Tag) => {
            const newTags = [...selectedTags, option];
            setSelectedTags(newTags);
            setInputValue("");
            setIsOpen(false);
            onTagsChange?.(newTags);
            (document.activeElement as HTMLElement).blur();
        },
        [selectedTags, onTagsChange],
    );

    const removeTag = useCallback(
        (tagId: string) => {
            const newTags = selectedTags.filter((tag) => tag.id !== tagId);
            setSelectedTags(newTags);
            onTagsChange?.(newTags);
        },
        [selectedTags, onTagsChange],
    );

    // Handle click outside to close dropdown
    const handleClickOutside = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <div className="w-full">
            <input
                type="hidden"
                name="tags"
                value={selectedTags.map((tag) => tag.id).join(",")}
            />
            <div className="mb-2 flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                    <div
                        key={tag.id}
                        className="rounded-md flex items-center gap-1 rounded-2 bg-slate-200 px-2 py-1"
                    >
                        <span>{tag.name}</span>
                        <button
                            type="button"
                            onClick={() => removeTag(tag.id)}
                            className="bg-slate-200"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
            <div className="relative">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => {
                        handleClickOutside();
                    }}
                    className={`${inputClass()} w-full`}
                    placeholder={placeholder}
                />
                {isOpen && filteredOptions.length > 0 && (
                    <div className="rounded-md absolute z-10 mt-1 max-h-60 w-full overflow-auto border bg-white shadow-lg">
                        {filteredOptions.map((option) => (
                            <div
                                key={option.id}
                                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                onClick={() => handleOptionClick(option)}
                                onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                            >
                                {option.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AutocompleteTag;
