import { useState } from "react";
import { Avatar } from "../components/avatar";
import { PageHead } from "../components/page-head";

export const Leaderboard = () => {
    const [leaderboardType, setLeaderboardType] = useState("quiz");

    const quizLeaderboardData = [
        {
            rank: 1,
            player: {
                full_name: "Ümit Can Evleksiz",
                username: "umitev_07",
                avatar: "https://randomuser.me/api/portraits/men/2.jpg",
            },
            points: 1000,
        },
        {
            rank: 2,
            player: {
                full_name: "Ümit Can Evleksiz",
                username: "umitev_07",
                avatar: "https://randomuser.me/api/portraits/men/2.jpg",
            },
            points: 950,
        },
        {
            rank: 3,
            player: {
                full_name: "Ümit Can Evleksiz",
                username: "umitev_07",
                avatar: "https://randomuser.me/api/portraits/men/2.jpg",
            },
            points: 900,
        },
        {
            rank: 4,
            player: {
                full_name: "Ümit Can Evleksiz",
                username: "umitev_07",
                avatar: "https://randomuser.me/api/portraits/men/2.jpg",
            },
            points: 850,
        },
        {
            rank: 5,
            player: {
                full_name: "Ümit Can Evleksiz",
                username: "umitev_07",
                avatar: "https://randomuser.me/api/portraits/men/2.jpg",
            },
            points: 800,
        },
    ];

    const forumLeaderboardData = [
        {
            rank: 1,
            player: {
                full_name: "Ümit Can Evleksiz",
                username: "umitev_07",
                avatar: "https://randomuser.me/api/portraits/men/2.jpg",
            },
            points: 500,
        },
        {
            rank: 2,
            player: {
                full_name: "Ümit Can Evleksiz",
                username: "umitev_07",
                avatar: "https://randomuser.me/api/portraits/men/2.jpg",
            },
            points: 450,
        },
        {
            rank: 3,
            player: {
                full_name: "Ümit Can Evleksiz",
                username: "umitev_07",
                avatar: "https://randomuser.me/api/portraits/men/2.jpg",
            },
            points: 400,
        },
        {
            rank: 4,
            player: {
                full_name: "Ümit Can Evleksiz",
                username: "umitev_07",
                avatar: "https://randomuser.me/api/portraits/men/2.jpg",
            },
            points: 350,
        },
        {
            rank: 5,
            player: {
                full_name: "Ümit Can Evleksiz",
                username: "umitev_07",
                avatar: "https://randomuser.me/api/portraits/men/2.jpg",
            },
            points: 300,
        },
    ];

    const currentLeaderboard =
        leaderboardType === "quiz" ? quizLeaderboardData : forumLeaderboardData;

    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <PageHead
                title="Leaderboard"
                description="Compete with others and see where you rank."
            />

            <div className="flex gap-2">
                {["quiz", "forum"].map((option) => (
                    <label
                        key={option}
                        className="flex cursor-pointer items-center gap-2"
                    >
                        <input
                            type="radio"
                            value={option}
                            checked={leaderboardType === option}
                            onChange={(e) => setLeaderboardType(e.target.value)}
                            className="sr-only"
                        />
                        <span
                            className={`rounded-full px-4 py-1.5 font-medium transition-all ${
                                leaderboardType === option
                                    ? "bg-cyan-900 text-white"
                                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                            }`}
                        >
                            {option === "forum" && "Forum"}
                            {option === "quiz" && "Quiz"}
                        </span>
                    </label>
                ))}
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-slate-200">
                        <th className="border p-2">Rank</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">
                            {leaderboardType === "quiz" ? "points" : "Points"}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentLeaderboard.map((player) => (
                        <tr key={player.rank} className="hover:bg-slate-100">
                            <td className="border p-2 text-center">
                                {player.rank}
                            </td>
                            <td className="border px-2 py-4">
                                <div className="flex flex-row items-start gap-4">
                                    <Avatar author={player.player} size={40} />
                                    <div className="flex flex-col items-start">
                                        <span>{player.player.full_name}</span>
                                        <p className="text-sm text-slate-500">
                                            {player.player.username}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="border p-2 text-right">
                                {player.points}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
