import { RouteObject } from "react-router-dom";
import { ErrorPage } from "./routes/_error";
import { Root } from "./routes/_root";
import { Home } from "./routes/Home";
import { homeLoader } from "./routes/Home.data";
import { Leaderboard } from "./routes/Leaderboard";
import { leaderboardLoader } from "./routes/Leaderboard.data";
import { Login } from "./routes/Login";
import { loginAction, loginLoader } from "./routes/Login.data";
import { logoutLoader } from "./routes/Logout.data";
import { Quiz } from "./routes/Quiz";
import { quizLoader } from "./routes/Quiz.data";
import { Quizzes } from "./routes/Quizzes";
import { quizzesLoader } from "./routes/Quizzes.data";
import { Register } from "./routes/Register";
import { registerAction } from "./routes/Register.data";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />,
                loader: homeLoader,
                children: [
                    {
                        path: "leaderboard",
                        element: <Leaderboard />,
                        loader: leaderboardLoader,
                    },
                    {
                        path: "forum",
                        element: <div>Forum</div>,
                    },
                    {
                        path: "quizzes",
                        element: <Quizzes />,
                        loader: quizzesLoader,
                        children: [
                            {
                                path: ":quizId",
                                element: <Quiz />,
                                loader: quizLoader,
                            },
                        ],
                    },
                    {
                        path: "profile",
                        element: <div>Profile</div>,
                    },
                ],
            },
            {
                path: "login",
                errorElement: <ErrorPage />,
                element: <Login />,
                action: loginAction,
                loader: loginLoader,
            },
            {
                path: "register",
                errorElement: <ErrorPage />,
                element: <Register />,
                action: registerAction,
            },
            {
                path: "logout",
                loader: logoutLoader,
                element: <Root />,
            },
        ],
    },
];
