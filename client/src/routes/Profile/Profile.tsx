import * as Ariakit from "@ariakit/react";
import { Button } from "@ariakit/react";
import { useParams } from "react-router-dom";
import { useLoaderData, useRouteLoaderData } from "react-router-typesafe";
import { Avatar } from "../../components/avatar";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { ForumQuestionCard } from "../../components/forum-card";
import { AchievementBadge } from "../Achievements/Achievements";
import { homeLoader } from "../Home/Home.data";
import { profileLoader } from "./Profile.data";

const Badge = ({
    icon,
    title,
    description,
}: {
    icon: string;
    title: string;
    description: string;
}) => {
    return (
        <Ariakit.HovercardProvider placement="bottom-start">
            <Ariakit.HovercardAnchor className="flex flex-row items-center gap-3 rounded-2 bg-slate-50 px-5 py-3 transition-all hover:bg-slate-200">
                <span aria-hidden="true" className="select-none text-2xl">
                    {icon}
                </span>
            </Ariakit.HovercardAnchor>
            <Ariakit.Hovercard
                gutter={16}
                className="rounded-2 bg-slate-900 p-4 pr-6 text-white shadow-md"
            >
                <div className="flex items-center gap-2">
                    <span
                        aria-hidden="true"
                        className="flex aspect-1 items-center justify-center rounded-full bg-slate-800 px-4 py-1 text-center text-xl"
                    >
                        {icon}
                    </span>
                    <div>
                        <Ariakit.HovercardHeading className="text-md font-medium">
                            {title}
                        </Ariakit.HovercardHeading>
                        <p className="text-sm text-slate-400">{description}</p>
                    </div>
                </div>
            </Ariakit.Hovercard>
        </Ariakit.HovercardProvider>
    );
};

export const Profile = () => {
    const {
        bookmarked_forums,
        full_name,
        avatar,
        achievements,
        score,
        quizzes_taken,
    } = useLoaderData<typeof profileLoader>();
    const { username } = useParams<{ username: string }>();
    const { user, logged_in } =
        useRouteLoaderData<typeof homeLoader>("home-main");
    const author = {
        avatar: avatar,
        full_name: full_name || "",
        username: username || "",
    };
    return (
        <main className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <header className="flex flex-row items-center gap-4">
                <Avatar author={author} size={96} />
                <div className="flex-1">
                    <h1 className="pt-2 text-2xl font-semibold">{full_name}</h1>
                    <p className="text-lg text-slate-500" aria-label="Username">
                        @{username}
                    </p>
                </div>
                {user?.username !== username && (
                    <Button
                        className={buttonClass({
                            intent: "secondary",
                            size: "medium",
                        })}
                    >
                        <span
                            className={buttonInnerRing({ intent: "secondary" })}
                        />
                        <span>Follow</span>
                    </Button>
                )}
            </header>
            <section className="z-20 flex w-full flex-row items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h2 className="font-medium">Achievements</h2>
                    <ul
                        className="flex flex-row gap-4"
                        role="list"
                        aria-label="User achievements"
                    >
                        {achievements
                            .filter((a) => a.earned_at !== null)
                            .map((a) => (
                                <li key={a.achievement.slug}>
                                    <AchievementBadge
                                        achievement={a.achievement}
                                        is_earned={true}
                                    />
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="flex flex-col gap-2">
                    <span
                        className="rounded-2 bg-cyan-100 px-4 py-1 text-center text-lg font-medium text-cyan-900"
                        role="status"
                        aria-label="User score"
                    >
                        {score}
                    </span>
                </div>
            </section>
            <Ariakit.Separator className="my-4" />
            <section aria-label="User posts" className="flex flex-col gap-4">
                <h2 className="flex items-center gap-2 text-lg font-medium text-slate-900">
                    <span>Bookmarked Forum Questions</span>
                    <span className="rounded-2 bg-slate-100 px-2 py-1 text-base font-regular text-slate-700">
                        {bookmarked_forums.length}
                    </span>
                </h2>
                <div className="grid w-full grid-cols-1 flex-col items-center gap-8 md:grid-cols-2">
                    {bookmarked_forums.map((post) => (
                        <ForumQuestionCard
                            onTagClick={() => {}}
                            key={post.id}
                            question={post}
                        />
                    ))}
                </div>
            </section>
            <Ariakit.Separator className="my-4" />
            <section aria-label="User posts" className="flex flex-col gap-4">
                <h2 className="flex items-center gap-2 text-lg font-medium text-slate-900">
                    <span>Quizzes Taken</span>
                    <span className="rounded-2 bg-slate-100 px-2 py-1 text-base font-regular text-slate-700">
                        {bookmarked_forums.length}
                    </span>
                </h2>
                <div className="grid w-full grid-cols-1 flex-col items-center gap-8 md:grid-cols-2">
                    {/* {quizzes_taken.map((quiz) => (
                        <QuizCard
                            key={quiz.id}
                            quiz={quiz}
                            onTagClick={() => {}}
                        />
                    ))} */}
                </div>
            </section>
        </main>
    );
};
