import { ErrorPage } from "./routes/_error";
import { Root } from "./routes/_root";
import { Home } from "./routes/Home";
import { Id, IdLoader } from "./routes/Id";
import { Login } from "./routes/Login";
import { loginAction, loginLoader } from "./routes/Login.data";
import { Register } from "./routes/Register";

export const routes = [
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />,
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
