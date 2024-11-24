import * as Ariakit from "@ariakit/react";
import { useLoaderData, useRouteLoaderData } from "react-router-typesafe";
import { Avatar } from "../../components/avatar";
import { ForumQuestionCard } from "../../components/forum-card";
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
    const data = useLoaderData<typeof profileLoader>();
    const posts = data.results.map((post) => ({
        ...post,
        is_bookmarked: 1,
    }));
    const { user, logged_in } =
        useRouteLoaderData<typeof homeLoader>("home-main");
    const author = {
        avatar: "https://api.dicebear.com/9.x/avataaars/webp?accessories=eyepatch,kurt,prescription01&seed=David%20Bush",
        full_name: user?.full_name || "",
        username: user?.username || "",
    };
    return (
        <main className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <header className="flex flex-row items-center gap-4">
                <Avatar author={author} size={96} />
                <div>
                    <h1 className="pt-2 text-2xl font-semibold">
                        {user?.full_name}
                    </h1>
                    <p className="text-lg text-slate-500" aria-label="Username">
                        @{user?.username}
                    </p>
                </div>
            </header>
            <section className="z-20 flex w-full flex-row items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h2 className="font-medium">Achievements</h2>
                    <ul
                        className="flex flex-row gap-4"
                        role="list"
                        aria-label="User achievements"
                    >
                        <li>
                            <Badge
                                icon="🏆"
                                title="Accuracy Monster"
                                description="Solve 10 quizzes with 100% accuracy."
                            />
                        </li>
                        <li>
                            <Badge
                                icon="🏅"
                                title="Linker"
                                description="Refer to a quiz question in a forum post."
                            />
                        </li>
                        <li>
                            <Badge
                                icon="🎖️"
                                title="The Popular Guy"
                                description="Get 100 upvotes on a forum post."
                            />
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-2">
                    <span
                        className="rounded-2 bg-cyan-100 px-4 py-1 text-center text-lg font-medium text-cyan-900"
                        role="status"
                        aria-label="User score"
                    >
                        700
                    </span>
                </div>
            </section>
            <hr aria-hidden="true" />
            <section
                aria-label="User posts"
                className="grid w-full grid-cols-1 flex-col items-center gap-8 md:grid-cols-2"
            >
                {posts.map((post) => (
                    <ForumQuestionCard
                        onTagClick={() => {}}
                        key={post.id}
                        question={post}
                    />
                ))}
            </section>
        </main>
    );
};
