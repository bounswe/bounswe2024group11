import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ErrorPage } from "./routes/_error";
import { Root } from "./routes/_root";
import { Home } from "./routes/Home";
import { Id, IdLoader } from "./routes/Id";
import { Login } from "./routes/Login";
import { enableMocking } from "./utils";

export const router = () => {
    return createBrowserRouter([
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
};

enableMocking().then(() => {
    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <RouterProvider router={router()} />
        </StrictMode>,
    );
});
