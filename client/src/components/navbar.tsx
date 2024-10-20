import { RiLogoutBoxRLine } from "@remixicon/react";
import { Link } from "react-router-dom";
import type { User } from "../types/user";
import { buttonClass, buttonInnerRing } from "./button";

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
        name: "Forum",
        href: "/forum",
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
            <div className="container max-w-screen-xl">
                <div className="flex items-center gap-2">
                    <div className="md:w-24">
                        <Link
                            to="/"
                            className="text-2xl font-bold text-slate-900"
                        >
                            <img
                                src="./turquiz_logo.svg"
                                alt="Turquiz App Logo"
                                className="h-8 w-auto"
                            />
                        </Link>
                    </div>
                    <ul className="flex flex-1 items-center justify-center gap-1">
                        {routes.map((route, i) => (
                            <li key={i} className="inline-block">
                                <Link
                                    to={route.href}
                                    className={buttonClass({
                                        intent: "tertiary",
                                        size: "medium",
                                    })}
                                >
                                    {route.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div>
                        {user ? (
                            <Link
                                to="/logout"
                                className={buttonClass({
                                    intent: "destructive",
                                    size: "medium",
                                    icon: "right",
                                })}
                            >
                                <span
                                    className={buttonInnerRing({
                                        intent: "destructive",
                                    })}
                                />
                                <span>Logout</span>
                                <RiLogoutBoxRLine className="h-4" />
                            </Link>
                        ) : (
                            <ul className="flex gap-2">
                                <li>
                                    <Link
                                        to="/register"
                                        className={buttonClass({
                                            intent: "tertiary",
                                            size: "medium",
                                        })}
                                    >
                                        <span
                                            className={buttonInnerRing({
                                                intent: "secondary",
                                            })}
                                        />
                                        Register
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/login"
                                        className={buttonClass({
                                            intent: "secondary",
                                            size: "medium",
                                            className: "min-w-20",
                                        })}
                                    >
                                        <span
                                            className={buttonInnerRing({
                                                intent: "secondary",
                                            })}
                                        />
                                        Login
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
