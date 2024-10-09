import { Outlet } from "react-router";

export const Root = () => {
    console.log("Router Root");
    return (
        <div id="router-root">
            <Outlet />
        </div>
    );
};
