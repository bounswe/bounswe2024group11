import { useState } from "react";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";
import { Toast } from "../components/toast";
import { homeLoader } from "./Home.data";

export const Home = () => {
    const [isToastOpen, setIsToastOpen] = useState(true);
    const { logged_in, user } = useLoaderData<typeof homeLoader>();
    if (!logged_in) {
        return (
            <div>
                <div>Not logged in</div>
                <Link to="/login">Login</Link>
                {isToastOpen && (
                    <Toast
                        type="error"
                        message="Not logged in"
                        onClose={() => {
                            setIsToastOpen(false);
                        }}
                    />
                )}
            </div>
        );
    }
    return (
        <div>
            <div> Welcome {user.username}</div>
            {isToastOpen && (
                <Toast
                    type="success"
                    message="Logged in"
                    onClose={() => {
                        setIsToastOpen(false);
                    }}
                />
            )}
        </div>
    );
};
