import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Sprite } from "./components/sprite";
import { ToastWrapper } from "./components/toast";
import { SoundProvider } from "./contexts/SoundContext";
import "./index.css";
import "./localstorage";
import { routes } from "./router";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Sprite />
        <SoundProvider>
            <div className="bg-slate-100/10">
                <RouterProvider router={createBrowserRouter(routes)} />
            </div>
            <ToastWrapper />
        </SoundProvider>
    </StrictMode>,
);
