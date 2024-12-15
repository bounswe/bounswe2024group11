import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Sprite } from "./components/sprite";
import { ToastWrapper } from "./components/toast";
import { SoundProvider } from "./contexts/SoundContext";
import { SpeechProvider } from "./contexts/SpeechContext";
import "./index.css";
import "./localstorage";
import { routes } from "./router";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Sprite />
        <div className="bg-slate-100/10">
            <SoundProvider>
                <SpeechProvider>
                    <RouterProvider
                        router={createBrowserRouter(routes)}
                    ></RouterProvider>
                </SpeechProvider>
            </SoundProvider>
        </div>
        <ToastWrapper />
    </StrictMode>,
);
