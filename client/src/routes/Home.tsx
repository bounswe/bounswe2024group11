import { Outlet } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";
import { Navbar } from "../components/navbar";
import { homeLoader } from "./Home.data";

export const Home = () => {
    const { user } = useLoaderData<typeof homeLoader>();

    return (
        <div>
            <Navbar user={user} />
            <div className="py-16">
                <Outlet />
            </div>
        </div>
    );
};
