import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Sprite } from "./components/sprite";
import { ToastWrapper } from "./components/toast";
import "./index.css";
import { routes } from "./router";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Sprite />
        <div>
            <RouterProvider router={createBrowserRouter(routes)} />
        </div>
        <ToastWrapper />
    </StrictMode>,
);
