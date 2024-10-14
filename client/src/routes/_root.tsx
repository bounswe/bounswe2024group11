import { Outlet } from "react-router";

export const Root = () => {
    return (
        <div id="router-root">
            <Outlet />
        </div>
    );
};
