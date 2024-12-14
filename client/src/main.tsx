import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Sprite } from "./components/sprite";
import { ToastWrapper } from "./components/toast";
import { SpeechProvider } from "./contexts/speechContext";
import "./index.css";
import "./localstorage";
import { routes } from "./router";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Sprite />
        <div className="bg-slate-100/10">
            <SpeechProvider>
                <RouterProvider router={createBrowserRouter(routes)} />
            </SpeechProvider>
        </div>
        <ToastWrapper />
    </StrictMode>,
);
