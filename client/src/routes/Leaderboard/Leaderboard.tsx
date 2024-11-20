import { useState } from "react";
import { useLoaderData } from "react-router-typesafe";
import { Avatar } from "../../components/avatar";
import { PageHead } from "../../components/page-head";
import { homeLoader } from "./Home.data";

export const Leaderboard = () => {
    const [leaderboardType, setLeaderboardType] = useState("quiz");

    const quizLeaderboardData = [
        {
            rank: 1,
            player: {
                full_name: "Salih Karakurt",
                username: "cute_mittens",
                avatar: "https://randomuser.me/api/portraits/men/13.jpg",
            },
            points: 1052,
        },
        {
            rank: 2,
            player: {
                full_name: "Aykut Taşaltın",
                username: "kut_ay",
                avatar: "https://randomuser.me/api/portraits/men/57.jpg",
            },
            points: 987,
        },
        {
            rank: 3,
            player: {
                full_name: "Ceyda Nurşen",
                username: "whether_dweller",
                avatar: "https://randomuser.me/api/portraits/women/13.jpg",
            },
            points: 943,
        },
        {
            rank: 4,
            player: {
                full_name: "Tuana Ümraniyeli",
                username: "tu_world",
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
                full_name: "Muhammet Çiftçi",
                username: "ciftci_m_2023",
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
                full_name: "Emin Bulucu",
                username: "eminb_lit",
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
                full_name: "Cahit Ünlü",
                username: "unlu_cahit15",
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
                full_name: "Kağan Aydın",
                username: "aydin_philos27",
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
                full_name: "Ozan Akkaya",
                username: "ozank",
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
                full_name: "Arda Alvur",
                username: "aa_vur",
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
                full_name: "Emre Kılıç",
                username: "emrek",
                avatar: "https://randomuser.me/api/portraits/men/21.jpg",
            },
            points: 254,
        },
    ];

    const currentLeaderboard =
        leaderboardType === "quiz" ? quizLeaderboardData : forumLeaderboardData;

    const { logged_in } = useLoaderData<typeof homeLoader>();

    const description = logged_in
        ? "Hey mate, let's see where you stand. Why are you lazy? Go and do some exercise."
        : "Log in to compete with others and see where you rank.";

    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <PageHead title="Leaderboard" description={description} />

            <div className="flex gap-1 self-start rounded-full bg-slate-50 p-1 ring ring-slate-200">
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
                            className={`min-w-32 rounded-full px-4 py-1.5 text-center font-medium transition-all ${
                                leaderboardType === option
                                    ? "bg-cyan-900 text-white"
                                    : "bg-slate-50 text-slate-900 hover:bg-slate-200"
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
                    {currentLeaderboard.map((player) => (
                        <tr
                            key={player.rank}
                            className="text-lg font-medium text-slate-700 transition-all hover:bg-slate-100"
                        >
                            <td className="w-12 border p-2 text-center">
                                {player.rank}
                            </td>
                            <td className="border px-6 py-4">
                                <div className="flex flex-row items-center gap-4">
                                    <Avatar author={player.player} size={48} />
                                    <div className="flex w-full max-w-48 flex-col items-start">
                                        <span className="font-medium text-slate-900">
                                            {player.player.full_name}
                                        </span>
                                        <p className="text-sm text-slate-500">
                                            @{player.player.username}
                                        </p>
                                    </div>
                                    {player.rank === 1 && (
                                        <span className="text-4xl font-medium text-cyan-900">
                                            🥇{" "}
                                        </span>
                                    )}
                                    {player.rank === 2 && (
                                        <span className="text-4xl font-medium text-slate-900">
                                            🥈{" "}
                                        </span>
                                    )}
                                    {player.rank === 3 && (
                                        <span className="text-saddlebrown text-4xl font-medium">
                                            🥉{" "}
                                        </span>
                                    )}
                                </div>
                            </td>
                            <td className="w-40 border p-2 text-end">
                                {player.points}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
