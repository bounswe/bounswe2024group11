import { RiArrowLeftLine } from "@remixicon/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";
import { buttonClass, buttonInnerRing } from "../components/button";
import { quizLoader } from "./Quiz.data";

export const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const quiz = useLoaderData<typeof quizLoader>();

    const handleOptionChange = (optionId: string) => {
        setSelectedOption(optionId);
        const updatedQuiz = { ...quiz };
        updatedQuiz.questions[currentQuestion].selected_option_id = optionId;

        // If you need to do something with updatedQuiz, like saving it, you can handle that here
    };
    const isPrevDisabled = currentQuestion === 0;
    const isNextDisabled =
        currentQuestion === quiz.questions.length - 1 || selectedOption === "";

    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <div className="flex flex-1 flex-col items-start gap-1">
                <Link
                    to="/quizzes"
                    className={buttonClass({
                        intent: "tertiary",
                        icon: "left",
                    })}
                >
                    <RiArrowLeftLine size={16} />
                    <span>Back to Quizzes</span>
                </Link>
                <h1 className="font-display text-3xl font-medium">
                    {quiz.title}
                </h1>
                <p className="text-slate-500">{quiz.description}</p>
            </div>
            <div>
                <h1>{quiz.questions[currentQuestion].text}</h1>
            </div>
            {quiz.questions[currentQuestion] && (
                <div>
                    <ul className="grid grid-cols-2 gap-2">
                        {quiz.questions[currentQuestion].options.map(
                            (option) => (
                                <li key={option.id}>
                                    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2 bg-slate-100 px-4 py-4 text-center text-lg">
                                        <input
                                            hidden={true}
                                            type="radio"
                                            name="option"
                                            value={option.id}
                                            checked={
                                                selectedOption === option.id
                                            }
                                            onChange={() =>
                                                handleOptionChange(option.id)
                                            }
                                        />
                                        {option.text}
                                    </label>
                                </li>
                            ),
                        )}
                    </ul>
                </div>
            )}
            <div className="grid w-full grid-cols-2 gap-4">
                <button
                    className={buttonClass({
                        intent: "tertiary",
                        size: "medium",
                    })}
                    disabled={isPrevDisabled}
                    onClick={() => {
                        setSelectedOption("");
                        setCurrentQuestion(
                            (currentQuestion) => currentQuestion - 1,
                        );
                    }}
                >
                    <span className={buttonInnerRing({ intent: "tertiary" })} />
                    Previous
                </button>
                <button
                    className={buttonClass({
                        intent: "secondary",
                        size: "medium",
                    })}
                    disabled={isNextDisabled}
                    onClick={() => {
                        setSelectedOption("");
                        setCurrentQuestion(
                            (currentQuestion) => currentQuestion + 1,
                        );
                    }}
                >
                    <span
                        className={buttonInnerRing({ intent: "secondary" })}
                    />
                    Next
                </button>
            </div>
        </div>
    );
};
