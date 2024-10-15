import { RouteObject } from "react-router-dom";
import { ErrorPage } from "./routes/_error";
import { Root } from "./routes/_root";
import { Home } from "./routes/Home";
import { homeLoader } from "./routes/Home.data";
import { Id, IdLoader } from "./routes/Id";
import { Login } from "./routes/Login";
import { loginAction, loginLoader } from "./routes/Login.data";
import { logoutLoader } from "./routes/Logout.data";
import { Quizzes } from "./routes/Quizzes";
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
                path: ":id",
                element: <Id />,
                errorElement: <ErrorPage />,
                loader: IdLoader,
            },
            {
                path: "logout",
                loader: logoutLoader,
                element: <Root />,
            },
            {
                path: "quizzes",
                element: <Quizzes />,
            },
        ],
    },
];
