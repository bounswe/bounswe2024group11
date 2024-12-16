import { Button } from "@ariakit/react";
import { RiArrowRightLine, RiErrorWarningLine } from "@remixicon/react";
import { useState } from "react";
import { Form } from "react-router-dom";
import { buttonClass, buttonInnerRing } from "../../../components/button";
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
            return "English word to sense";
        default:
            return "Unknown";
    }
};

export const NewQuiz = () => {
    const { quiz, getValidationErrors, getQuizForSubmission } = useQuizStore();
    const [view, setView] = useState<"details" | "questions">("details");

    return (
        <div
            className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12"
            role="main"
        >
            <NewQuizHead />

            <main className="grid grid-cols-8 items-start gap-4">
                <div className="col-span-8 md:col-span-2"></div>
                <Form
                    className="col-span-8 flex w-full flex-col gap-6 self-start md:col-span-4"
                    method="POST"
                >
                    <input
                        type="hidden"
                        name="quiz"
                        value={JSON.stringify(getQuizForSubmission())}
                    />
                    <header className="flex justify-between gap-4">
                        <h2 className="text-lg font-medium">
                            {view === "details" && "Quiz Details"}
                            {view === "questions" && (
                                <span className="flex gap-3">
                                    Questions{" "}
                                    <span className="flex items-center rounded-1 bg-slate-50 px-2 text-sm ring ring-slate-200">
                                        {quiz.questions.length}
                                    </span>
                                </span>
                            )}
                        </h2>
                        <span className="py-0.5 text-right text-sm text-slate-500">
                            <span className="text-base font-medium text-slate-700">
                                {view === "details" ? "1" : "2"}
                            </span>{" "}
                            / 2
                        </span>
                    </header>
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
                                Set Questions
                            </Button>
                        </>
                    )}
                    {view === "questions" && (
                        <NewQuizQuestions onBack={() => setView("details")} />
                    )}
                </Form>
                {view === "questions" && getValidationErrors().length > 0 && (
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
                                        className="flex items-start gap-1.5 py-2"
                                        tabIndex={0}
                                    >
                                        <RiErrorWarningLine
                                            size={16}
                                            className="h-5 flex-shrink-0 text-red-950"
                                            aria-hidden="true"
                                        />
                                        <span className="text-sm font-medium text-red-950/70">
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
