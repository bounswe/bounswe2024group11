import * as Ariakit from "@ariakit/react";
import { cva } from "cva";
import { Achievement } from "./Achievement.schema";

const getImageSrcFromSlug = (slug: string) => {
    return `/badges/${slug}.svg`;
};

const badgeClass = cva(
    "flex flex-row items-center gap-1 rounded-2 px-1 py-1 transition-all hover:bg-slate-200",
    {
        variants: {
            earned: {
                true: "bg-slate-100 opacity-100 ring ring-slate-200 ring-offset-1",
                false: "grayscale hover:opacity-100 hover:grayscale-0",
            },
        },
    },
);

export const AchievementBadge = ({
    achievement,
    is_earned,
    is_on_profile = true,
}: {
    achievement: Achievement;
    is_earned: boolean;
    is_on_profile?: boolean;
}) => {
    return (
        <div className="flex flex-col" role="definition">
            <Ariakit.PopoverProvider placement="bottom">
                <Ariakit.PopoverDisclosure
                    className={badgeClass({ earned: is_earned })}
                    aria-label={`${achievement.title} achievement ${is_earned ? "earned" : "not earned yet"}`}
                >
                    <span className="select-none text-2xl">
                        <img
                            width={64}
                            height={64}
                            src={getImageSrcFromSlug(achievement.slug)}
                            alt=""
                            role="presentation"
                            className="h-14 w-14"
                        />
                    </span>
                    {!is_on_profile && (
                        <span className="select-none pr-2 text-sm font-medium text-slate-700">
                            {achievement.title}
                        </span>
                    )}
                </Ariakit.PopoverDisclosure>
                <Ariakit.Popover
                    gutter={8}
                    className="relative z-50 origin-top rounded-2 bg-slate-900 p-4 pr-6 text-white shadow-md"
                    role="tooltip"
                >
                    <div className="absolute inset-1 rounded-1 ring ring-slate-700"></div>
                    <div className="flex w-80 flex-col items-center gap-2">
                        <span className="select-none text-2xl">
                            <img
                                className="h-32 w-32"
                                width={48}
                                height={48}
                                src={getImageSrcFromSlug(achievement.slug)}
                                alt=""
                                role="presentation"
                            />
                        </span>
                        <div className="flex w-full flex-col gap-4 text-center">
                            <div>
                                <Ariakit.HovercardHeading className="text-lg font-medium">
                                    {achievement.title}
                                </Ariakit.HovercardHeading>
                                <p className="text-base text-slate-400">
                                    {achievement.description}
                                </p>
                            </div>
                            {is_earned && (
                                <span className="rounded-1 bg-slate-700 py-1 text-sm text-slate-300">
                                    Earned on{" "}
                                    <span className="font-medium text-white">
                                        {new Date().toLocaleDateString()}
                                    </span>
                                </span>
                            )}
                        </div>
                    </div>
                </Ariakit.Popover>
            </Ariakit.PopoverProvider>
        </div>
    );
};
