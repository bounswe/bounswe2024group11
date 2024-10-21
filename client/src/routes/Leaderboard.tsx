import { PageHead } from "../components/page-head";

export const Leaderboard = () => {
    const leaderboardData = [
        { rank: 1, name: "Alice", score: 1000 },
        { rank: 2, name: "Bob", score: 950 },
        { rank: 3, name: "Charlie", score: 900 },
        { rank: 4, name: "David", score: 850 },
        { rank: 5, name: "Eve", score: 800 },
        { rank: 6, name: "Frank", score: 750 },
        { rank: 7, name: "Grace", score: 700 },
        { rank: 8, name: "Henry", score: 650 },
        { rank: 9, name: "Ivy", score: 600 },
        { rank: 10, name: "Jack", score: 550 },
    ];

    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <PageHead
                title="Leaderboard"
                description="Compete with others and see where you rank."
            />
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Rank</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.map((player) => (
                        <tr key={player.rank} className="hover:bg-gray-100">
                            <td className="border p-2 text-center">
                                {player.rank}
                            </td>
                            <td className="border p-2">{player.name}</td>
                            <td className="border p-2 text-right">
                                {player.score}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
