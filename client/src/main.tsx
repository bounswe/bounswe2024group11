import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Sprite } from "./components/sprite";
import "./index.css";
import { routes } from "./router";
import { enableMocking } from "./utils";

export const router = () => {
    return createBrowserRouter(routes);
};

enableMocking().then(() => {
    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <Sprite />
            <RouterProvider router={router()} />
        </StrictMode>,
    );
});
