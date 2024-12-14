import {
    Separator,
    Tooltip,
    TooltipAnchor,
    TooltipProvider,
} from "@ariakit/react";
import {
    RiArrowRightLine,
    RiDashboard3Line,
    RiGroup2Line,
} from "@remixicon/react";
import { cva } from "cva";
import { Link } from "react-router-dom";
import { buttonClass, buttonInnerRing } from "../components/button";
import { Quiz } from "../routes/Quiz/Quiz.schema";
import { getRelativeTime } from "../utils";

type QuizCardProps = {
    quiz: Quiz;
    onTagClick: (tag: string) => void;
    quiz_key: string;
};

const difficultyText = cva([
    "flex items-center gap-1 rounded-1 rounded-2 bg-slate-100 px-1 py-1 pr-2 text-xs font-medium uppercase text-slate-800",
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
                5: [
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

export const QuizCard = ({ quiz, onTagClick, quiz_key }: QuizCardProps) => {
    return (
        <div
            key={quiz_key}
            aria-label={quiz.title}
            className="relative flex max-w-xl flex-col gap-4 rounded-2 bg-white px-6 py-6 shadow-none ring ring-slate-200 transition-all duration-200"
        >
            <div className="flex flex-1 items-start gap-4">
                <div className="flex flex-1 flex-col self-stretch">
                    <div className="flex items-center gap-1 pb-2">
                        <span className={difficultyText()}>
                            <RiDashboard3Line size={16} />
                            {quiz.difficulty === 1 && "Easy"}
                            {quiz.difficulty === 2 && "Medium"}
                            {quiz.difficulty === 3 && "Hard"}
                        </span>
                    </div>

                    <h3 className="pb-1 font-display text-2xl font-medium">
                        {quiz.title}
                    </h3>
                    <p className="text-md line-clamp-2 flex-1 text-balance leading-6 text-slate-500">
                        {quiz.description}
                    </p>
                </div>
                <TooltipProvider>
                    <TooltipAnchor
                        render={
                            <span
                                tabIndex={0}
                                aria-label={`Rated by ${quiz.rating.count}`}
                                className={scoreClass({
                                    score: scoreToInteger(
                                        quiz.rating.score || 0,
                                    ),
                                })}
                            >
                                {quiz.rating.score}
                            </span>
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
            <div className="flex flex-wrap gap-2 tracking-wider">
                {quiz.tags.map(({ name, linked_data_id }) => {
                    return (
                        <Link
                            key={linked_data_id}
                            onClick={(e) => {
                                e.preventDefault();
                                onTagClick(linked_data_id);
                            }}
                            to="#"
                            className="touch-hitbox relative flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-[500] text-slate-950 transition-all hover:bg-slate-200"
                        >
                            {name.toLocaleUpperCase()}
                        </Link>
                    );
                })}
            </div>
            <Separator className="border-slate-200" />
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-1">
                    <Link
                        to={`/profile/${quiz.author.username}/`}
                        className="text-slate-500 underline-offset-2 transition-all hover:text-slate-900"
                    >
                        <div className="flex items-center gap-2 self-start text-sm">
                            <p>@{quiz.author.username}</p>
                        </div>
                    </Link>
                    <p className="text-xs text-slate-500">
                        {getRelativeTime(new Date(quiz.created_at))}
                    </p>
                </div>
                <div className="flex flex-1 items-end justify-between gap-4 pt-2">
                    <div className="flex items-center gap-1">
                        <RiGroup2Line className="text-slate-500" size={18} />
                        <span className="text-sm text-slate-700">
                            {quiz.num_taken}
                        </span>
                    </div>
                    <div className="flex flex-1 items-center justify-end gap-2">
                        {quiz.is_taken && (
                            <Link
                                to={`${quiz.id}/review`}
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
                                    aria-hidden="true"
                                />
                                <span>Review</span>
                            </Link>
                        )}
                        <Link
                            to={String(quiz.id)}
                            className={buttonClass({
                                intent: quiz.is_taken ? "secondary" : "primary",
                                size: "medium",
                                icon: "right",
                            })}
                        >
                            <span
                                className={buttonInnerRing({
                                    intent: quiz.is_taken
                                        ? "secondary"
                                        : "primary",
                                })}
                                aria-hidden="true"
                            />
                            <span>
                                {quiz.is_taken ? "Re-attempt" : "Take Quiz"}
                            </span>
                            <RiArrowRightLine size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
