import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "./routes/_error";
import { Root } from "./routes/_root";
import { Home } from "./routes/Home";
import { Id, IdLoader } from "./routes/Id";
import { Login } from "./routes/Login";

export const router = createBrowserRouter([
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
            },
            {
                path: ":id",
                element: <Id />,
                errorElement: <ErrorPage />,
                loader: IdLoader,
            },
        ],
    },
]);
