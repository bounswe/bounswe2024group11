import * as Ariakit from "@ariakit/react";
import { cva } from "cva";
import { useLoaderData } from "react-router-typesafe";
import { PageHead } from "../../components/page-head";
import { Achievement } from "./Achievement.schema";
import { achievementsLoader } from "./Achievements.data";

const getImageSrcFromSlug = (slug: string) => {
    return `/badges/${slug}.svg`;
};

const badgeClass = cva(
    "flex flex-row items-center gap-2 rounded-2 px-2 py-1 transition-all hover:bg-slate-200",
    {
        variants: {
            earned: {
                true: "bg-slate-100 opacity-100 ring ring-slate-200 ring-offset-1",
                false: "opacity-50 hover:opacity-100",
            },
        },
    },
);

const snakeToTitle = (snake: string) => {
    return snake.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const AchievementBadge = ({
    achievement,
    is_earned,
}: {
    achievement: Achievement;
    is_earned: boolean;
}) => {
    return (
        <div className="flex flex-col" role="article">
            <Ariakit.HovercardProvider placement="bottom-start">
                <Ariakit.HovercardAnchor
                    className={badgeClass({ earned: is_earned })}
                    aria-label={`${achievement.title} achievement ${is_earned ? "earned" : "not earned yet"}`}
                >
                    <span className="select-none text-2xl">
                        <img
                            width={96}
                            height={96}
                            src={getImageSrcFromSlug(achievement.slug)}
                            alt=""
                            role="presentation"
                            className="h-16 w-16"
                        />
                    </span>
                    <span className="text-sm font-medium text-slate-700">
                        {achievement.title}
                    </span>
                </Ariakit.HovercardAnchor>
                <Ariakit.Hovercard
                    gutter={16}
                    className="z-50 rounded-2 bg-slate-900 p-4 pr-6 text-white shadow-md"
                    role="tooltip"
                >
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
                        <div className="text-center">
                            <Ariakit.HovercardHeading className="text-md font-medium">
                                {achievement.title}
                            </Ariakit.HovercardHeading>
                            <p className="text-sm text-slate-400">
                                {achievement.description}
                            </p>
                        </div>
                    </div>
                </Ariakit.Hovercard>
            </Ariakit.HovercardProvider>
        </div>
    );
};

export const Achievements = () => {
    const achievements = useLoaderData<typeof achievementsLoader>();
    const allCategories = [
        ...new Set(
            achievements.map((achievement) => achievement.item.category),
        ),
    ];
    return (
        <main className="container flex max-w-screen-xl flex-col gap-10 py-10">
            <PageHead
                title="Achievements"
                description="Here are all of the badges you can get by using Turquiz"
            />
            <nav
                aria-label="Achievement categories"
                className="flex flex-col gap-10 border-rose-50"
            >
                {allCategories.map((category) => {
                    const categoryAchievements = achievements.filter(
                        (achievement) => achievement.item.category === category,
                    );
                    return (
                        <section
                            key={category}
                            className="flex flex-col gap-6"
                            aria-labelledby={`category-${category}`}
                        >
                            <h2
                                id={`category-${category}`}
                                className="text-lg font-medium text-slate-900"
                            >
                                {snakeToTitle(category)}
                            </h2>
                            <ul
                                className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
                                role="list"
                            >
                                {categoryAchievements.map((achievement) => (
                                    <li key={achievement.item.slug}>
                                        <AchievementBadge
                                            achievement={achievement.item}
                                            is_earned={achievement.is_earned}
                                        />
                                    </li>
                                ))}
                            </ul>
                            <hr className="mb-2 mt-4 border-slate-200" />
                        </section>
                    );
                })}
            </nav>
        </main>
    );
};
