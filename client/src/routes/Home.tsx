import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";
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
    return <div>Welcome {user.username}</div>;
};
