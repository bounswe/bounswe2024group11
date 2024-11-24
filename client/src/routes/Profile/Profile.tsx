import { useLoaderData, useRouteLoaderData } from "react-router-typesafe";
import { Avatar } from "../../components/avatar";
import { ForumQuestionCard } from "../../components/forum-card";
import { homeLoader } from "../Home/Home.data";
import { profileLoader } from "./Profile.data";

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
        <div className="container flex max-w-screen-md flex-col items-stretch gap-8 py-12">
            <div className="flex flex-col items-start">
                <Avatar author={author} size={80} />
                <h2 className="pt-2 text-lg font-semibold">
                    {user?.full_name}
                </h2>
                <p className="text-sm text-slate-500">{user?.username}</p>
            </div>
            <div className="flex w-full flex-row justify-between">
                <div>Badges</div>
                <div>700 Points</div>
            </div>
            <div className="grid w-full grid-cols-1 flex-col items-center gap-8 md:grid-cols-2">
                {posts.map((post) => (
                    <ForumQuestionCard
                        onTagClick={() => {}}
                        key={post.id}
                        question={post}
                    />
                ))}
            </div>
        </div>
    );
};
