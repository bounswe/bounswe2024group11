import {
    Hovercard,
    HovercardAnchor,
    HovercardHeading,
    HovercardProvider,
    Separator,
    Tooltip,
    TooltipAnchor,
    TooltipProvider,
} from "@ariakit/react";
import { RiArrowRightLine, RiDashboard3Line } from "@remixicon/react";
import { cva } from "cva";
import { Link } from "react-router-dom";
import { Avatar } from "../components/avatar";
import { buttonClass, buttonInnerRing } from "../components/button";
import { Quiz } from "../routes/Quizzes.data";
import { getRelativeTime } from "../utils";

type QuizCardProps = {
    quiz: Quiz;
};

const difficultyText = cva([
    "flex items-center gap-1 rounded-1 rounded-2 bg-slate-100 px-1 py-1 pr-2 text-xs font-medium text-slate-800",
]);

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
                5: ["text-cyan-800", "bg-cyan-50", "hover:bg-cyan-100"],
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
            className="relative flex max-w-xl flex-col gap-4 rounded-2 bg-white px-6 py-6 shadow-none ring ring-slate-200 transition-all duration-200"
        >
            <div className="flex flex-1 items-start gap-4">
                <div className="flex flex-1 flex-col self-stretch">
                    <div className="flex items-center gap-1 pb-2">
                        <span className={difficultyText()}>
                            <RiDashboard3Line size={16} />
                            {quiz.difficulty.toLocaleUpperCase()}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <h3 className="font-display text-2xl font-medium">
                            {quiz.title}
                        </h3>
                    </div>
                    <p className="text-md line-clamp-2 flex-1 text-balance leading-6 text-slate-500">
                        {quiz.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-4 tracking-wider">
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
                <TooltipProvider>
                    <TooltipAnchor
                        render={
                            <a
                                href="#"
                                className={scoreClass({
                                    score: scoreToInteger(quiz.rating.score),
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

            <Separator className="border-slate-200" />
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-1">
                    <HovercardProvider placement="top-start">
                        <HovercardAnchor
                            href="#"
                            className="underline-offset-2 hover:text-slate-700"
                        >
                            <div className="flex items-center gap-2 self-start text-sm text-slate-600">
                                <p>@{quiz.author.username}</p>
                            </div>
                        </HovercardAnchor>
                        <Hovercard className="relative bottom-2 z-50 flex w-full max-w-sm items-start justify-between gap-4 rounded-2 bg-slate-50 px-3 py-3 shadow-lg ring ring-slate-200">
                            <div className="flex flex-col items-start">
                                <Avatar author={quiz.author} size={40} />
                                <HovercardHeading className="text-md pt-2 font-medium">
                                    {quiz.author.full_name}
                                </HovercardHeading>
                                <p className="text-sm text-slate-500">
                                    {quiz.author.username}
                                </p>
                            </div>
                            <Link
                                to="#"
                                className={buttonClass({ intent: "secondary" })}
                            >
                                <span
                                    className={buttonInnerRing({
                                        intent: "secondary",
                                    })}
                                />
                                Follow
                            </Link>
                        </Hovercard>
                    </HovercardProvider>
                    <p className="text-xs text-slate-500">
                        {getRelativeTime(new Date(quiz.created_at))}
                    </p>
                </div>
                <div className="flex flex-1 items-center justify-end gap-2 pt-2">
                    {quiz.is_taken && (
                        <Link
                            to={quiz.id}
                            className={buttonClass({
                                intent: "tertiary",
                                size: "medium",
                                icon: "right",
                            })}
                        >
                            <span
                                className={buttonInnerRing({
                                    intent: "tertiary",
                                })}
                            />
                            <span>Review</span>
                        </Link>
                    )}
                    <Link
                        to={quiz.id}
                        className={buttonClass({
                            intent: quiz.is_taken ? "secondary" : "primary",
                            size: "medium",
                            icon: "right",
                        })}
                    >
                        <span
                            className={buttonInnerRing({
                                intent: quiz.is_taken ? "secondary" : "primary",
                            })}
                        />
                        <span>
                            {quiz.is_taken ? "Re-attempt" : "Take Quiz"}
                        </span>
                        <RiArrowRightLine size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
};
