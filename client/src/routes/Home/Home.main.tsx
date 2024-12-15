import { Outlet } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";
import { Navbar } from "../../components/navbar";
import { useGlobalCommandMenu } from "../../hooks/command-menu";
import { homeLoader } from "./Home.data";

export const HomeMain = () => {
    const { user } = useLoaderData<typeof homeLoader>();
    useGlobalCommandMenu();

    return (
        <div>
            <Navbar user={user} />
            <div className="py-16">
                <Outlet />
            </div>
        </div>
    );
};
