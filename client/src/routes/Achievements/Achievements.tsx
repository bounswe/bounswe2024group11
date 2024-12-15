import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-typesafe";
import { PageHead } from "../../components/page-head";
import { snakeToTitle } from "../../utils";
import { AchievementLoading } from "../_loading";
import { achievementsLoader } from "./Achievements.data";
import { AchievementBadge } from "./Badge";

export const Achievements = () => {
    const { achievementsData } = useLoaderData<typeof achievementsLoader>();

    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <PageHead
                title="Achievements"
                description="Here are all of the badges you can get by using Turquiz"
            />

            <Suspense fallback={<AchievementLoading />}>
                <Await resolve={achievementsData}>
                    {(achievements) => {
                        const allCategories = [
                            ...new Set(
                                achievements.map(
                                    (achievement) => achievement.item.category,
                                ),
                            ),
                        ];

                        return (
                            <nav
                                aria-label="Achievement categories"
                                className="flex flex-col gap-10 border-rose-50"
                            >
                                {allCategories.map((category) => {
                                    const categoryAchievements =
                                        achievements.filter(
                                            (achievement) =>
                                                achievement.item.category ===
                                                category,
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
                                                {categoryAchievements.map(
                                                    (achievement) => (
                                                        <li
                                                            key={
                                                                achievement.item
                                                                    .slug
                                                            }
                                                        >
                                                            <AchievementBadge
                                                                achievement={
                                                                    achievement.item
                                                                }
                                                                is_earned={
                                                                    achievement.is_earned
                                                                }
                                                                is_on_profile={
                                                                    false
                                                                }
                                                            />
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                            <hr className="mb-2 mt-4 border-slate-200" />
                                        </section>
                                    );
                                })}
                            </nav>
                        );
                    }}
                </Await>
            </Suspense>
        </div>
    );
};
