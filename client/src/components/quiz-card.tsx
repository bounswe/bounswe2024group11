import {
    Separator,
    Tooltip,
    TooltipAnchor,
    TooltipProvider,
} from "@ariakit/react";
import { RiArrowRightLine } from "@remixicon/react";
import { cva } from "cva";
import { Link } from "react-router-dom";
import { Avatar } from "../components/avatar";
import { button, buttonInnerRing } from "../components/button";
import { Quiz } from "../routes/Quizzes.data";
import { getRelativeTime } from "../utils";

type QuizCardProps = {
    quiz: Quiz;
};

const scoreClass = cva(
    ["rounded-2", "px-2", "py-0.5", "text-lg", "font-semibold"],
    {
        variants: {
            score: {
                0: ["text-red-800", "bg-red-50", "hover:bg-red-100"],
                1: ["text-red-800", "bg-red-50", "hover:bg-red-100"],
                2: ["text-amber-800", "bg-amber-50", "hover:bg-amber-100"],
                3: ["text-sky-800", "bg-sky-50", "hover:bg-sky-100"],
                4: [
                    "text-emerald-800",
                    "bg-emerald-50",
                    "hover:bg-emerald-100",
                ],
            },
        },
        defaultVariants: {
            score: 0,
        },
    },
);

const scoreToInteger = (score: number) =>
    Math.floor(score) as 0 | 1 | 2 | 3 | 4;

export const QuizCard = ({ quiz }: QuizCardProps) => {
    return (
        <div
            aria-label={quiz.title}
            className="flex max-w-lg flex-col gap-4 rounded-2 bg-white px-8 py-6 shadow-none ring ring-slate-200 transition-all duration-200 hover:shadow-lg"
        >
            <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-2xl font-medium">
                        {quiz.title}
                    </h3>
                    <div className="flex flex-col items-end">
                        <TooltipProvider>
                            <TooltipAnchor
                                render={
                                    <a
                                        href="#"
                                        className={scoreClass({
                                            score: scoreToInteger(
                                                quiz.rating.score,
                                            ),
                                        })}
                                    >
                                        {quiz.rating.score.toFixed(1)}
                                    </a>
                                }
                            ></TooltipAnchor>
                            <Tooltip>
                                <div className="rounded-md left-0 rounded-2 bg-slate-700 p-2 px-2 py-1 text-sm text-slate-300 shadow-sm ring-1 ring-slate-800">
                                    Rated by{" "}
                                    <span className="font-medium text-white">
                                        {quiz.rating.count}
                                    </span>{" "}
                                    people
                                </div>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <p className="text-md flex-1 leading-7 text-slate-500">
                    {quiz.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                    {quiz.tags.map(({ name }) => {
                        return (
                            <Link
                                to="#"
                                className="touch-hitbox relative flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-[500] text-slate-950 transition-all hover:bg-slate-200"
                            >
                                {name.toLocaleUpperCase()}
                            </Link>
                        );
                    })}
                </div>
            </div>

            <Separator className="border-slate-200" />
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 self-start text-sm">
                    <Avatar author={quiz.author} size={24} />
                    <p>{quiz.author.username}</p>
                </div>

                <p className="text-sm text-slate-500">
                    {getRelativeTime(new Date(quiz.created_at))}
                </p>
                <div>
                    {quiz.is_taken ? (
                        <button
                            className={button({
                                intent: "secondary",
                                size: "medium",
                                icon: "right",
                            })}
                        >
                            <span
                                className={buttonInnerRing({
                                    intent: "secondary",
                                })}
                            />
                            <span>Re-attempt</span>
                            <RiArrowRightLine size={16} />
                        </button>
                    ) : (
                        <button
                            className={button({
                                intent: "primary",
                                size: "medium",
                                icon: "right",
                            })}
                        >
                            <span
                                className={buttonInnerRing({
                                    intent: "primary",
                                })}
                            />
                            <span>Take Quiz</span>
                            <RiArrowRightLine size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
