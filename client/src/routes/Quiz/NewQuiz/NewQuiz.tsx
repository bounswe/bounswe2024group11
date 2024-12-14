import { Button } from "@ariakit/react";
import { RiArrowRightLine, RiErrorWarningLine } from "@remixicon/react";
import { useState } from "react";
import { Form } from "react-router-dom";
import { buttonClass, buttonInnerRing } from "../../../components/button";
import { logger } from "../../../utils";
import { NewQuizDetails } from "./NewQuizDetails";
import { NewQuizHead } from "./NewQuizHead";
import { NewQuizQuestions } from "./NewQuizQuestion";
import { useQuizStore } from "./state";

export const getQuestionType = (type: number) => {
    switch (type) {
        case 1:
            return "English to Turkish";
        case 2:
            return "Turkish to English";
        case 3:
            return "English word to part of speech";
        default:
            return "Unknown";
    }
};

export const NewQuiz = () => {
    const { quiz, getValidationErrors } = useQuizStore();
    const [view, setView] = useState<"details" | "questions">("details");
    logger.log("quiz errors", getValidationErrors());
    logger.log("quiz", quiz);

    return (
        <div
            className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12"
            role="main"
        >
            <NewQuizHead />

            <main className="grid grid-cols-8 items-start gap-4">
                <div className="col-span-8 md:col-span-2"></div>
                <Form
                    className="col-span-8 flex w-full flex-col gap-4 self-start md:col-span-4"
                    method="POST"
                >
                    <input
                        type="hidden"
                        name="quiz"
                        value={JSON.stringify(quiz)}
                    />
                    {view === "details" && (
                        <>
                            <NewQuizDetails />
                            <Button
                                className={buttonClass({
                                    intent: "primary",
                                    icon: "left",
                                })}
                                onClick={() => setView("questions")}
                            >
                                <RiArrowRightLine size={16} />
                                <span
                                    className={buttonInnerRing({
                                        intent: "primary",
                                    })}
                                />
                                Add Questions
                            </Button>
                        </>
                    )}
                    {view === "questions" && (
                        <NewQuizQuestions onBack={() => setView("details")} />
                    )}
                </Form>
                {view === "questions" && (
                    <div
                        className="relative col-span-8 h-full rounded-4 p-2 md:col-span-2"
                        role="alert"
                        aria-live="polite"
                    >
                        <div className="sticky top-20 flex flex-col gap-4 rounded-2 bg-red-50 p-4 text-red-950 ring ring-red-100">
                            <div className="flex flex-col">
                                <h2
                                    className="text-lg font-medium"
                                    tabIndex={0}
                                >
                                    Hold Your Horses! 🐎
                                </h2>
                                <p
                                    className="text-sm leading-6 text-red-950/70"
                                    tabIndex={0}
                                >
                                    Looks like we're missing some details. No
                                    biggie, let's fix this together!
                                </p>
                            </div>

                            <hr
                                className="border-red-950/10"
                                aria-hidden="true"
                            />

                            <ul aria-label="List of validation errors">
                                {getValidationErrors().map((error, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start gap-2 py-2"
                                        tabIndex={0}
                                    >
                                        <RiErrorWarningLine
                                            size={16}
                                            className="h-5 flex-shrink-0 text-red-950"
                                            aria-hidden="true"
                                        />
                                        <span className="text-sm text-red-950/70">
                                            {error}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
