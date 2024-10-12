import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";
import { useToastStore } from "../store";
import { homeLoader } from "./Home.data";

export const Home = () => {
    const { logged_in, user } = useLoaderData<typeof homeLoader>();
    if (!logged_in) {
        return (
            <div>
                <div>Not logged in</div>
                <Link to="/login">Login</Link>
            </div>
        );
    }
    return (
        <div>
            <div> Welcome {user.username}</div>
            <button
                onClick={() => {
                    useToastStore.getState().add({
                        id: Math.random().toString(),
                        type: "info",
                        data: {
                            message: "This is a toast",
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
