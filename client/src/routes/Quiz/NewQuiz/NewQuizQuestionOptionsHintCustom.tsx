import { useState } from "react";
import { inputClass, labelClass } from "../../../components/input";

interface CustomHintInputProps {
    hintType: "examples" | "synonyms" | "definitions" | "images";
    selectedHint?: { type: string; text: string };
    onHintSelect: (
        type: "examples" | "synonyms" | "definitions" | "images",
        text: string,
    ) => void;
}

const hintValidators = {
    images: (value: string) => {
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    },
    examples: (value: string) => value.length >= 3,
    synonyms: (value: string) => value.length >= 2,
    definitions: (value: string) => value.length >= 5,
};

export const CustomHintInput = ({
    hintType,
    selectedHint,
    onHintSelect,
}: CustomHintInputProps) => {
    const [inputValue, setInputValue] = useState(
        selectedHint?.type === hintType ? selectedHint.text : "",
    );
    const [error, setError] = useState<string | null>(null);

    const validateAndUpdateHint = (value: string) => {
        setInputValue(value);

        if (!value) {
            setError(null);
            return;
        }

        const isValid = hintValidators[hintType](value);

        if (!isValid) {
            setError(
                hintType === "images"
                    ? "Please enter a valid URL"
                    : `Hint must be at least ${
                          hintType === "examples"
                              ? "3"
                              : hintType === "synonyms"
                                ? "2"
                                : "5"
                      } characters long`,
            );
            return;
        }

        setError(null);
        onHintSelect(hintType, value);
    };

    const handleBlur = () => {
        if (inputValue && !error) {
            onHintSelect(hintType, inputValue);
        }
    };

    return (
        <div className="flex flex-col gap-1">
            <label className={labelClass({ wrapper: true })}>
                Custom Hint
                <input
                    type="text"
                    placeholder={
                        hintType === "images"
                            ? "Enter image URL"
                            : `Add custom ${hintType.slice(0, -1)}`
                    }
                    className={inputClass({ invalid: !!error })}
                    value={inputValue}
                    onChange={(e) => validateAndUpdateHint(e.target.value)}
                    onBlur={handleBlur}
                />
            </label>
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
};
