import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";
import { useToastStore } from "../store";
import { homeLoader } from "./Home.data";


export const Home = () => {
    const { user } = useLoaderData<typeof homeLoader>();
    if (!user) {
        return (
            <div className="bg-slate-50">
                <div>Not logged in</div>
                <Link to="/login">Login</Link>
            </div>
        );
    }
    return (
        <div className="bg-slate-50  px-2    dark:text-white text-slate-950 dark:bg-slate-900">
            <div> Welcome {user.username}</div>
            <button
                onClick={() => {
                    useToastStore.getState().add({
                        id: Math.random().toString(),
                        type: "info",
                        data: {
                            message: "This is a toast",
                            description:
                                "You can add toasts to your app. If they are 2 lines, it's perfect",
                        },
                    });
                }}
            >
                Add a toast
            </button>
            <Link to="/logout">Logout</Link>
        </div>
    );
};
