import { Outlet } from "react-router";
import { CommandMenuProvider } from "../contexts/CommandMenuContext";

export const Root = () => {
    return (
        <div id="router-root">
            <CommandMenuProvider>
                <Outlet />
            </CommandMenuProvider>
        </div>
    );
};
