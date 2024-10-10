import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ErrorPage } from "./routes/_error";
import { Root } from "./routes/_root";
import { Home } from "./routes/Home";
import { Id, IdLoader } from "./routes/Id";
import { Login } from "./routes/Login";

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

export async function enableMocking() {
    if (import.meta.env.VITE_ENABLE_MOCKS === "false") {
        return;
    }

    const { worker } = await import("./mocks/browser");

    return worker.start();
}

enableMocking().then(() => {
    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <RouterProvider router={router()} />
        </StrictMode>,
    );
});

// createRoot(document.getElementById("root")!).render(
//     <StrictMode>
//         <RouterProvider router={router()} />
//     </StrictMode>,
// );
