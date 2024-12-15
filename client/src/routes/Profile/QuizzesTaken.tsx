import { Button } from "@ariakit/react";
import { useState } from "react";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { QuizCard } from "../../components/quiz-card";
import { QuizDetails } from "../Quiz/Quiz.schema";

const INITIAL_DISPLAY_COUNT = 6;
const LOAD_MORE_COUNT = 6;

export const QuizzesTaken = ({ quizzes }: { quizzes: QuizDetails[] }) => {
    const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);

    const displayedQuizzes = quizzes.slice(0, displayCount);
    const hasMore = displayCount < quizzes.length;

    return (
        <section aria-label="Quizzes taken" className="flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-medium text-slate-900">
                <span>Quizzes Taken</span>
                <span className="rounded-2 bg-slate-100 px-2 py-1 text-base font-regular text-slate-700">
                    {quizzes.length}
                </span>
            </h2>
            <div className="grid w-full grid-cols-1 flex-col items-center gap-8 md:grid-cols-2">
                {displayedQuizzes.map((quiz) => (
                    <QuizCard
                        key={quiz.id}
                        quiz_key={String(quiz.id)}
                        quiz={quiz}
                        onTagClick={() => {}}
                    />
                ))}
            </div>
            {hasMore && (
                <div className="mt-4 flex justify-center">
                    <Button
                        onClick={() =>
                            setDisplayCount((prev) => prev + LOAD_MORE_COUNT)
                        }
                        className={buttonClass({
                            intent: "primary",
                            size: "medium",
                        })}
                    >
                        <span
                            className={buttonInnerRing({
                                intent: "primary",
                            })}
                            aria-hidden="true"
                        />
                        Load More
                    </Button>
                </div>
            )}
        </section>
    );
};
