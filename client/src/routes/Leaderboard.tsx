import { useState } from "react";
import { PageHead } from "../components/page-head";

export const Leaderboard = () => {
    const [leaderboardType, setLeaderboardType] = useState("quiz");

    const quizLeaderboardData = [
        { rank: 1, name: "Alice", score: 1000 },
        { rank: 2, name: "Bob", score: 950 },
        { rank: 3, name: "Charlie", score: 900 },
        { rank: 4, name: "David", score: 850 },
        { rank: 5, name: "Eve", score: 800 },
    ];

    const forumLeaderboardData = [
        { rank: 1, name: "Frank", points: 500 },
        { rank: 2, name: "Grace", points: 450 },
        { rank: 3, name: "Henry", points: 400 },
        { rank: 4, name: "Ivy", points: 350 },
        { rank: 5, name: "Jack", points: 300 },
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
                    <tr className="bg-gray-200">
                        <th className="border p-2">Rank</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">
                            {leaderboardType === "quiz" ? "Score" : "Points"}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentLeaderboard.map((player) => (
                        <tr key={player.rank} className="hover:bg-gray-100">
                            <td className="border p-2 text-center">
                                {player.rank}
                            </td>
                            <td className="border p-2">{player.name}</td>
                            <td className="border p-2 text-right">
                                {leaderboardType === "quiz"
                                    ? player.score
                                    : player.points}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
