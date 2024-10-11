import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { routes } from "./router";
import { enableMocking } from "./utils";

export const router = () => {
    return createBrowserRouter(routes);
};

enableMocking().then(() => {
    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <RouterProvider router={router()} />
        </StrictMode>,
    );
});
