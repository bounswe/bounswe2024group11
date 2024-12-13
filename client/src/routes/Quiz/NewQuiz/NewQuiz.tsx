import { Button } from "@ariakit/react";
import { RiArrowRightLine } from "@remixicon/react";
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
            return "English word to Sense";
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
            <main className="flex flex-col items-center gap-12">
                <Form
                    className="flex w-full max-w-lg flex-col gap-4 self-center"
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
            </main>
        </div>
    );
};
