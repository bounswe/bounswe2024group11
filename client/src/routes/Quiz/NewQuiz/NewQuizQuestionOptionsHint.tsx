import * as Ariakit from "@ariakit/react";
import { RiLightbulbFlashLine } from "@remixicon/react";
import { cva } from "cva";
import { useState } from "react";
import { SWRResponse } from "swr";
import { array, InferInput, object, string } from "valibot";
import { buttonClass, buttonInnerRing } from "../../../components/button";
import { CustomHintInput } from "./NewQuizQuestionOptionsHintCustom";
import { useQuizStore } from "./state"; // Assuming this is the correct path

export const hintsSchema = object({
    synonyms: array(string()),
    definitions: array(string()),
    examples: array(string()),
    images: array(string()),
});

const hintKeyToTitle = {
    synonyms: "Synonyms",
    definitions: "Definitions",
    examples: "Examples",
    images: "Images",
};

type Hints = InferInput<typeof hintsSchema>;
type HintType = keyof typeof hintKeyToTitle;

interface HintItemProps {
    type: HintType;
    text: string;
    isSelected: boolean;
    onSelect: () => void;
}

const hintOptionClass = cva(
    "rounded-md flex w-full items-center gap-2 rounded-1 px-3 py-2 text-left transition-all",
    {
        variants: {
            selected: {
                true: "bg-slate-800 text-white",
                false: "text-slate-800 hover:bg-slate-100",
            },
        },
    },
);

const HintItem = ({ type, text, isSelected, onSelect }: HintItemProps) => {
    return (
        <button
            className={hintOptionClass({ selected: isSelected })}
            type="button"
            onClick={(e) => {
                e.preventDefault;
                onSelect();
            }}
        >
            <span className="flex flex-1 items-center gap-2">
                {type === "images" ? (
                    <img
                        src={text}
                        alt="Hint image"
                        className="h-32 rounded-1 object-cover"
                    />
                ) : (
                    <span>{text}</span>
                )}
            </span>
            <div className="h-8 w-8"></div>
        </button>
    );
};

export const Hints = ({
    hints,
    questionIndex,
}: {
    hints: SWRResponse<Hints>;
    questionIndex: number;
}) => {
    const { quiz, updateQuestion } = useQuizStore();
    const currentQuestion = quiz.questions[questionIndex];
    const selectedHint = currentQuestion.hints?.[0];

    const [isListOpen, setIsListOpen] = useState(false);

    if (!hints) return null;
    if (hints.isLoading) return <div>Loading hints...</div>;
    if (hints.error) return <div>Error loading hints: {hints.error}</div>;

    const hintsData = hints.data;
    if (!hintsData) return null;
    if (Object.values(hintsData).every((value) => value.length === 0))
        return null;

    const handleHintSelect = (type: HintType, text: string) => {
        const newHint = { type, text };
        updateQuestion(questionIndex, {
            hints: [newHint],
        });
    };

    const clearHint = () => {
        updateQuestion(questionIndex, {
            hints: [],
        });
    };

    return (
        <div className="flex flex-1 flex-col gap-2 rounded-2 bg-slate-100 px-2 py-2">
            <Ariakit.DisclosureProvider
                open={isListOpen}
                setOpen={setIsListOpen}
            >
                <div className="flex items-center gap-2">
                    <Ariakit.Disclosure className="flex h-12 flex-1 items-center gap-2 rounded-1 px-2 py-2 text-base text-cyan-800 transition-all hover:bg-slate-200">
                        <RiLightbulbFlashLine size={20} />
                        <span className="flex-1 text-start font-medium text-cyan-900">
                            Available Hints
                        </span>
                        {selectedHint && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    clearHint();
                                }}
                                className={buttonClass({
                                    intent: "destructive",
                                    size: "small",
                                })}
                            >
                                <span
                                    className={buttonInnerRing({
                                        intent: "destructive",
                                    })}
                                    aria-hidden="true"
                                />
                                Clear Hint
                            </button>
                        )}
                    </Ariakit.Disclosure>
                </div>
                <Ariakit.DisclosureContent className="flex max-h-80 max-w-full flex-1 flex-col gap-4 overflow-auto rounded-2 bg-white p-4">
                    {Object.entries(hintsData)
                        .filter(([_, value]) => value.length > 0)
                        .map(([key, value]) => {
                            if (value.length === 0) return null;
                            const hintType = key as HintType;

                            return (
                                <div className="flex flex-col gap-2" key={key}>
                                    <h3 className="text-sm uppercase tracking-widest text-slate-600">
                                        {hintKeyToTitle[hintType]}
                                    </h3>
                                    <ul className="flex max-w-full flex-col gap-1">
                                        {value.map((item: string) => (
                                            <li key={item}>
                                                <HintItem
                                                    type={hintType}
                                                    text={item}
                                                    isSelected={
                                                        selectedHint?.type ===
                                                            hintType &&
                                                        selectedHint?.text ===
                                                            item
                                                    }
                                                    onSelect={() => {
                                                        setIsListOpen(false);
                                                        handleHintSelect(
                                                            hintType,
                                                            item,
                                                        );
                                                    }}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                    <CustomHintInput
                                        hintType={hintType}
                                        selectedHint={selectedHint}
                                        onHintSelect={handleHintSelect}
                                    />
                                    <Ariakit.Separator className="my-2 border-slate-200" />
                                </div>
                            );
                        })}
                </Ariakit.DisclosureContent>
            </Ariakit.DisclosureProvider>
        </div>
    );
};
