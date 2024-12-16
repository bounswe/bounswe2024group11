import { Button } from "@ariakit/react";
import { useState } from "react";
import { buttonClass } from "../../components/button";
import { QuizCard } from "../../components/quiz-card";
import { QuizDetails } from "../Quiz/Quiz.schema";
import { INITIAL_DISPLAY_COUNT, LOAD_MORE_COUNT } from "./Home";
import { HomeEmptySection } from "./HomeEmptySection";

export const HomeQuizFeed = ({
    quizzes,
    title,
}: {
    quizzes: QuizDetails[];
    title: string;
}) => {
    const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
    const displayedQuizzes = quizzes.slice(0, displayCount);
    const hasMore = displayCount < quizzes.length;

    if (quizzes.length === 0)
        return (
            <HomeEmptySection
                title={title}
                description="Although we have tried hard enough, we couldn't find any quizzes in this category."
            />
        );

    return (
        <section className="flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-medium text-slate-900">
                <span>{title}</span>
                <span className="rounded-2 bg-slate-100 px-2 py-1 text-base font-regular text-slate-700">
                    {displayedQuizzes.length}
                </span>
            </h2>
            <div className="grid w-full grid-cols-1 flex-col items-center gap-10 md:grid-cols-2">
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
                        Load More
                    </Button>
                </div>
            )}
        </section>
    );
};
