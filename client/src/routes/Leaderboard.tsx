import { useState } from "react";
import { Avatar } from "../components/avatar";
import { PageHead } from "../components/page-head";

export const Leaderboard = () => {
    const [leaderboardType, setLeaderboardType] = useState("quiz");

    const quizLeaderboardData = [
        {
            rank: 1,
            player: {
                full_name: "Arnold Jones",
                username: "cute_mittens",
                avatar: "https://randomuser.me/api/portraits/men/13.jpg",
            },
            points: 1052,
        },
        {
            rank: 2,
            player: {
                full_name: "Boby Carlsen",
                username: "board_walker",
                avatar: "https://randomuser.me/api/portraits/men/57.jpg",
            },
            points: 987,
        },
        {
            rank: 3,
            player: {
                full_name: "Winston Jobs",
                username: "whether_dweller",
                avatar: "https://randomuser.me/api/portraits/women/13.jpg",
            },
            points: 943,
        },
        {
            rank: 4,
            player: {
                full_name: "Tuana Ümraniyeli",
                username: "tt_world",
                avatar: "https://randomuser.me/api/portraits/women/7.jpg",
            },
            points: 891,
        },
        {
            rank: 5,
            player: {
                full_name: "Heisenberg Cook",
                username: "the_cook06",
                avatar: "https://randomuser.me/api/portraits/men/44.jpg",
            },
            points: 856,
        },
        {
            rank: 6,
            player: {
                full_name: "Hasan Kerem Şeker",
                username: "kerem_s54",
                avatar: "https://randomuser.me/api/portraits/men/46.jpg",
            },
            points: 812,
        },
        {
            rank: 7,
            player: {
                full_name: "Ümit Can Evleksiz",
                username: "umitev_07",
                avatar: "https://randomuser.me/api/portraits/men/2.jpg",
            },
            points: 779,
        },
        {
            rank: 8,
            player: {
                full_name: "Kemal Kaya",
                username: "kemal_k_2023",
                avatar: "https://randomuser.me/api/portraits/men/3.jpg",
            },
            points: 745,
        },
        {
            rank: 9,
            player: {
                full_name: "Ayşe Kabakçı",
                username: "kabakci_a24",
                avatar: "https://randomuser.me/api/portraits/women/31.jpg",
            },
            points: 702,
        },
        {
            rank: 10,
            player: {
                full_name: "Emre Kaya",
                username: "emrek_lit",
                avatar: "https://randomuser.me/api/portraits/men/16.jpg",
            },
            points: 678,
        },
    ];

    const forumLeaderboardData = [
        {
            rank: 1,
            player: {
                full_name: "Selin Demir",
                username: "demir_sel2021",
                avatar: "https://randomuser.me/api/portraits/women/16.jpg",
            },
            points: 523,
        },
        {
            rank: 2,
            player: {
                full_name: "Ali Yıldız",
                username: "yildiz_ali15",
                avatar: "https://randomuser.me/api/portraits/men/17.jpg",
            },
            points: 487,
        },
        {
            rank: 3,
            player: {
                full_name: "Zeynep Aksoy",
                username: "aksoy_z14",
                avatar: "https://randomuser.me/api/portraits/women/17.jpg",
            },
            points: 452,
        },
        {
            rank: 4,
            player: {
                full_name: "Mehmet Öztürk",
                username: "mehmet_philos27",
                avatar: "https://randomuser.me/api/portraits/men/18.jpg",
            },
            points: 418,
        },
        {
            rank: 5,
            player: {
                full_name: "Ayşe Yılmaz",
                username: "aysey_90",
                avatar: "https://randomuser.me/api/portraits/women/18.jpg",
            },
            points: 389,
        },
        {
            rank: 6,
            player: {
                full_name: "Cem Kaya",
                username: "cemk",
                avatar: "https://randomuser.me/api/portraits/men/19.jpg",
            },
            points: 356,
        },
        {
            rank: 7,
            player: {
                full_name: "Elif Demir",
                username: "elifd",
                avatar: "https://randomuser.me/api/portraits/women/19.jpg",
            },
            points: 327,
        },
        {
            rank: 8,
            player: {
                full_name: "Ahmet Yıldırım",
                username: "ahmety",
                avatar: "https://randomuser.me/api/portraits/men/20.jpg",
            },
            points: 301,
        },
        {
            rank: 9,
            player: {
                full_name: "Zehra Çelik",
                username: "zehrac",
                avatar: "https://randomuser.me/api/portraits/women/20.jpg",
            },
            points: 278,
        },
        {
            rank: 10,
            player: {
                full_name: "Mustafa Aydın",
                username: "mustafaa",
                avatar: "https://randomuser.me/api/portraits/men/21.jpg",
            },
            points: 254,
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
                {(["quiz", "forum"] as const).map((option) => (
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
            <table className="w-full max-w-xl border-collapse">
                <thead>
                    <tr className="bg-slate-100">
                        <th className="border p-2">Rank</th>
                        <th className="border p-2">Name</th>
                        <th className="w-32 border p-2">Turq Points</th>
                    </tr>
                </thead>
                <tbody>
                    {currentLeaderboard.map((player) => (
                        <tr
                            key={player.rank}
                            className="transition-all hover:bg-slate-100"
                        >
                            <td className="w-12 border p-2 text-center">
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
