import { Link } from "react-router-dom";
import type { User } from "../types/user";
import { button, buttonInnerRing } from "./button";

const routes = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "Quizzes",
        href: "/quizzes",
    },
    {
        name: "Leaderboard",
        href: "/leaderboard",
    },
];

type NavbarProps = {
    user: User | undefined;
};

export const Navbar = ({ user }: NavbarProps) => {
    return (
        <nav
            aria-label="Main navigation"
            className="fixed top-0 z-10 w-full border-b border-slate-200 bg-[rgba(255,255,255,.92)] px-6 py-3 backdrop-blur-sm"
        >
            <div className="container max-w-screen-lg">
                <div className="flex items-center gap-2">
                    <div className="md:w-24">
                        <Link
                            to="/"
                            className="text-2xl font-bold text-slate-900 transition-all duration-300 hover:scale-110"
                        >
                            <img
                                src="./turquiz.svg"
                                alt="Turquiz App Logo"
                                className="h-8 w-auto"
                            />
                        </Link>
                    </div>
                    <ul className="flex flex-1 items-center justify-center gap-1 py-1">
                        {routes.map((route, i) => (
                            <li key={i} className="inline-block">
                                <Link
                                    to={route.href}
                                    className={button({
                                        intent: "tertiary",
                                        size: "medium",
                                    })}
                                >
                                    {route.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="md:w-24">
                        {user ? (
                            <Link
                                to="/profile"
                                className={button({
                                    intent: "primary",
                                    size: "medium",
                                })}
                            >
                                <span
                                    className={buttonInnerRing({
                                        intent: "primary",
                                    })}
                                />
                                Profile
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className={button({
                                    intent: "secondary",
                                    size: "medium",
                                })}
                            >
                                <span
                                    className={buttonInnerRing({
                                        intent: "secondary",
                                    })}
                                />
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
