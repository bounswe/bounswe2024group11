import { useState } from "react";
import { useLoaderData } from "react-router-typesafe";
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
        <div className="container items-center flex flex-col py-20">
            <div>
                <h1>{quiz.questions[currentQuestion].text}</h1>
            </div>
            {quiz.questions[currentQuestion] && (
                <div>
                    <ul>
                        {quiz.questions[currentQuestion].options.map(
                            (option) => (
                                <li key={option.id}>
                                    <label>
                                        <input
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
            <button
                style={{
                    position: "fixed",
                    bottom: "20px",
                    left: "20px",
                    width: "100px",
                    borderRadius: "4px",
                    color: "white",
                    backgroundColor: "darkred",
                    height: "40px",
                }}
                disabled={isPrevDisabled}
                onClick={() => {
                    setSelectedOption("");
                    setCurrentQuestion(
                        (currentQuestion) => currentQuestion - 1,
                    );
                }}
            >
                Previous
            </button>
            <button
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    width: "100px",
                    borderRadius: "4px",
                    color: "white",
                    backgroundColor: "green",
                    height: "40px",
                }}
                disabled={isNextDisabled}
                onClick={() => {
                    setSelectedOption("");
                    setCurrentQuestion(
                        (currentQuestion) => currentQuestion + 1,
                    );
                }}
            >
                Next
            </button>
        </div>
    );
};
