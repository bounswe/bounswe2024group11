import { RouteObject } from "react-router-dom";
import { ErrorPage } from "./routes/_error";
import { Root } from "./routes/_root";
import { Home } from "./routes/Home";
import { homeLoader } from "./routes/Home.data";
import { Id, IdLoader } from "./routes/Id";
import { Login } from "./routes/Login";
import { loginAction } from "./routes/Login.data";
import { Register } from "./routes/Register";

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
            },
            {
                path: "register",
                errorElement: <ErrorPage />,
                element: <Register />,
            },
            {
                path: ":id",
                element: <Id />,
                errorElement: <ErrorPage />,
                loader: IdLoader,
            },
        ],
    },
];
