export type AutocompleteTagProps = {
    initialTags?: Tag[];
    availableTags: Tag[];
    onTagsChange?: (tags: Tag[]) => void;
    placeholder?: string;
};

// AutocompleteTag.tsx
import { Button } from "@ariakit/react";
import React, {
    ChangeEvent,
    KeyboardEvent,
    RefObject,
    useCallback,
    useRef,
    useState,
} from "react";
import { Tag } from "../routes/Forum/Forum.schema";
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
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

    const inputRef: RefObject<HTMLInputElement> = useRef(null);
    const optionsRef: RefObject<HTMLDivElement> = useRef(null);

    // Filter options based on input value and exclude already selected tags
    const filteredOptions: Tag[] = availableTags.filter(
        (option: Tag) =>
            option.name.toLowerCase().includes(inputValue.toLowerCase()) &&
            !selectedTags.some(
                (tag: Tag) => tag.linked_data_id === option.linked_data_id,
            ),
    );

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value);
        setIsOpen(true);
        setHighlightedIndex(-1);
    };

    const handleOptionClick = useCallback(
        (option: Tag): void => {
            const newTags: Tag[] = [...selectedTags, option];
            setSelectedTags(newTags);
            setInputValue("");
            setIsOpen(false);
            setHighlightedIndex(-1);
            onTagsChange?.(newTags);
            inputRef.current?.blur();
        },
        [selectedTags, onTagsChange],
    );

    const removeTag = useCallback(
        (tagId: string): void => {
            const newTags: Tag[] = selectedTags.filter(
                (tag) => tag.linked_data_id !== tagId,
            );
            setSelectedTags(newTags);
            onTagsChange?.(newTags);
        },
        [selectedTags, onTagsChange],
    );

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (!isOpen || filteredOptions.length === 0) return;

        switch (e.key) {
            case "ArrowDown": {
                e.preventDefault();
                setHighlightedIndex((prev) =>
                    prev < filteredOptions.length - 1 ? prev + 1 : 0,
                );
                break;
            }
            case "ArrowUp": {
                e.preventDefault();
                setHighlightedIndex((prev) =>
                    prev > 0 ? prev - 1 : filteredOptions.length - 1,
                );
                break;
            }
            case "Enter": {
                e.preventDefault();
                if (highlightedIndex >= 0) {
                    handleOptionClick(filteredOptions[highlightedIndex]);
                }
                break;
            }
            case "Escape": {
                e.preventDefault();
                setIsOpen(false);
                setHighlightedIndex(-1);
                break;
            }
            case "Tab": {
                if (highlightedIndex >= 0) {
                    e.preventDefault();
                    handleOptionClick(filteredOptions[highlightedIndex]);
                }
                break;
            }
        }
    };

    // Handle click outside to close dropdown
    const handleClickOutside = useCallback((): void => {
        setIsOpen(false);
        setHighlightedIndex(-1);
    }, []);

    return (
        <div className="w-full">
            <input
                type="hidden"
                name="tags"
                value={selectedTags.map((tag) => tag.linked_data_id).join(",")}
            />
            <div className="mb-2 flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                    <Button
                        aria-label={tag.name}
                        key={tag.linked_data_id}
                        className="rounded-md flex items-center gap-1 rounded-2 bg-slate-200 px-2 py-1"
                    >
                        <span>{tag.name}</span>
                        <button
                            type="button"
                            onClick={() => removeTag(tag.linked_data_id)}
                            className="bg-slate-200"
                            aria-label={`Remove ${tag.name}`}
                        >
                            ×
                        </button>
                    </Button>
                ))}
            </div>
            <div className="relative">
                <input
                    ref={inputRef}
                    aria-label="Add tag"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => {
                        setTimeout(handleClickOutside, 200);
                    }}
                    className={`${inputClass()} w-full`}
                    placeholder={placeholder}
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-controls="tag-listbox"
                    aria-activedescendant={
                        highlightedIndex >= 0
                            ? `option-${filteredOptions[highlightedIndex].linked_data_id}`
                            : undefined
                    }
                />
                {isOpen && filteredOptions.length > 0 && (
                    <div
                        ref={optionsRef}
                        className="rounded-md absolute z-10 mt-1 max-h-60 w-full overflow-auto border bg-white shadow-lg"
                        role="listbox"
                        id="tag-listbox"
                    >
                        {filteredOptions.map((option, index) => (
                            <div
                                id={`option-${option.linked_data_id}`}
                                key={option.linked_data_id}
                                role="option"
                                aria-selected={index === highlightedIndex}
                                className={`cursor-pointer px-4 py-2 ${
                                    index === highlightedIndex
                                        ? "bg-blue-100"
                                        : "hover:bg-gray-100"
                                }`}
                                onClick={() => handleOptionClick(option)}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                onMouseDown={(e) => e.preventDefault()}
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
