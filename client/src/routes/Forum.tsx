import { useLoaderData, useRouteLoaderData } from "react-router-typesafe";
import { ForumCard } from "../components/forum-card";
import { PageHead } from "../components/page-head";
import { logger } from "../utils";
import { forumLoader } from "./Forum.data";
import { homeLoader } from "./Home.data";

export const Forum = () => {
    const data = useLoaderData<typeof forumLoader>();
    const { user, logged_in } =
        useRouteLoaderData<typeof homeLoader>("home-main");
    const description = logged_in
        ? `This is your time to shine ${user.full_name}`
        : "Test your knowledge of various topics. Log in to track your progress.";

    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <PageHead title="Forum" description={description} />
            <main className="items-stretch justify-stretch">
                <div className="flex w-full flex-col items-center gap-6">
                    {data.posts.map((post) => (
                        <ForumCard
                            key={post.id}
                            post={post}
                            onClick={() => logger.log(post.id)}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};
