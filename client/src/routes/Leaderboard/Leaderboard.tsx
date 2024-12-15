import { Suspense } from "react";
import { Link } from "react-router-dom";
import {
    Await,
    useLoaderData,
    useRouteLoaderData,
} from "react-router-typesafe";
import { Avatar } from "../../components/avatar";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { PageHead } from "../../components/page-head";
import { LeaderboardLoading } from "../_loading";
import { homeLoader } from "../Home/Home.data";
import { leaderboardLoader } from "./Leaderboard.data";

export const Leaderboard = () => {
    const { leaderboardData } = useLoaderData<typeof leaderboardLoader>();

    const { logged_in } = useRouteLoaderData<typeof homeLoader>("home-main");

    const description = logged_in
        ? "Hey mate, let's see where you stand. Why are you lazy? Go and do some exercise."
        : "Log in to compete with others and see where you rank.";

    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <Suspense fallback={<LeaderboardLoading></LeaderboardLoading>}>
                <Await
                    resolve={leaderboardData}
                    children={(data) => {
                        return (
                            <>
                                <PageHead
                                    title="Leaderboard"
                                    description={description}
                                />
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-slate-100">
                                            <th className="min-w-32 border px-4 py-3 text-center">
                                                Rank
                                            </th>
                                            <th className="min-w-32 border px-4 py-3 text-start">
                                                User
                                            </th>
                                            <th className="min-w-32 border px-4 py-3 text-end">
                                                Turq Points
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((player, rank) => (
                                            <tr
                                                key={rank}
                                                className="text-lg font-medium text-slate-700 transition-all hover:bg-slate-100"
                                            >
                                                <td className="w-12 border p-2 text-center">
                                                    {rank + 1}
                                                </td>
                                                <td className="border px-6 py-4">
                                                    <Link
                                                        to={`/profile/${player.user_info.username}`}
                                                        className="flex flex-row items-center gap-4"
                                                    >
                                                        <Avatar
                                                            author={
                                                                player.user_info
                                                            }
                                                            size={48}
                                                        />
                                                        <div className="flex w-full max-w-48 flex-col items-start">
                                                            <span className="font-medium text-slate-900">
                                                                {
                                                                    player
                                                                        .user_info
                                                                        .full_name
                                                                }
                                                            </span>
                                                            <p className="text-sm text-slate-500">
                                                                @
                                                                {
                                                                    player
                                                                        .user_info
                                                                        .username
                                                                }
                                                            </p>
                                                        </div>
                                                        {rank === 0 && (
                                                            <span className="text-4xl font-medium text-cyan-900">
                                                                🥇{" "}
                                                            </span>
                                                        )}
                                                        {rank === 1 && (
                                                            <span className="text-4xl font-medium text-slate-900">
                                                                🥈{" "}
                                                            </span>
                                                        )}
                                                        {rank === 2 && (
                                                            <span className="text-saddlebrown text-4xl font-medium">
                                                                🥉{" "}
                                                            </span>
                                                        )}
                                                    </Link>
                                                </td>
                                                <td className="w-40 border p-2 text-end">
                                                    {player.score}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="flex justify-center">
                                    <Link
                                        to="/achievements"
                                        className={buttonClass({
                                            intent: "secondary",
                                        })}
                                    >
                                        <span
                                            className={buttonInnerRing({
                                                intent: "secondary",
                                            })}
                                        />
                                        <span>See Achievements</span>
                                    </Link>
                                </div>
                            </>
                        );
                    }}
                />
            </Suspense>
        </div>
    );
};
