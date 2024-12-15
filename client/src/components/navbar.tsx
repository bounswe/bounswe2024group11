import * as Ariakit from "@ariakit/react";
import { RiCloseLine, RiLogoutBoxRLine, RiMenuLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { User } from "../schemas";
import { buttonClass, buttonInnerRing, hamburgerButtonClass } from "./button";

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
        name: "Achievements",
        href: "/achievements",
    },
    {
        name: "Leaderboard",
        href: "/leaderboard",
    },
    {
        name: "Profile",
        href: "/profile",
    },
];

type NavbarProps = {
    user: User | undefined;
};

export const Navbar = ({ user }: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const NavLinks = () => (
        <ul className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-1">
            {routes.map((route, i) => (
                <li key={i} className="w-full md:w-auto">
                    <Link
                        to={route.href}
                        className={buttonClass({
                            intent: "tertiary",
                            size: "medium",
                            className:
                                "w-full justify-start hover:bg-cyan-900/10 md:w-auto md:justify-center",
                        })}
                    >
                        {route.name}
                    </Link>
                </li>
            ))}
        </ul>
    );

    const AuthButtons = () => (
        <div className="w-full md:w-auto">
            {user ? (
                <Link
                    to="/logout"
                    className={buttonClass({
                        intent: "destructive",
                        size: "medium",
                        icon: "right",
                        className:
                            "w-full justify-start md:w-auto md:justify-center",
                    })}
                >
                    <span
                        className={buttonInnerRing({
                            intent: "destructive",
                        })}
                        aria-hidden="true"
                    />
                    <span>Logout</span>
                    <RiLogoutBoxRLine className="h-4" />
                </Link>
            ) : (
                <ul className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
                    <li className="w-full md:w-auto">
                        <Link
                            to="/register"
                            className={buttonClass({
                                intent: "tertiary",
                                size: "medium",
                                className:
                                    "w-full justify-start md:w-auto md:justify-center",
                            })}
                        >
                            <span
                                className={buttonInnerRing({
                                    intent: "secondary",
                                })}
                                aria-hidden="true"
                            />
                            Register
                        </Link>
                    </li>
                    <li className="w-full md:w-auto">
                        <Link
                            to="/login"
                            className={buttonClass({
                                intent: "secondary",
                                size: "medium",
                                className:
                                    "w-full min-w-20 justify-start md:w-auto md:justify-center",
                            })}
                        >
                            <span
                                className={buttonInnerRing({
                                    intent: "secondary",
                                })}
                                aria-hidden="true"
                            />
                            Login
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    );

    return (
        <nav
            aria-label="Main navigation"
            style={{
                backgroundImage: "radial-gradient(white 20%, transparent 80%)",
                backgroundSize: "4px 4px",
            }}
            className="fixed top-0 z-50 w-full border-b border-slate-200 bg-[rgba(255,255,255,.8)] py-3 backdrop-blur-sm"
        >
            <div className="container">
                <div className="flex flex-1 items-center justify-between gap-2 md:justify-start">
                    <div className="w-28 md:w-24">
                        <Link
                            to="/"
                            className="text-2xl font-bold text-slate-900"
                        >
                            <img
                                src="/turquiz_logo.svg"
                                alt="Turquiz App Logo"
                                className="h-8 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden flex-1 items-center justify-between md:flex">
                        <div className="flex flex-1 justify-center">
                            <NavLinks />
                        </div>
                        <AuthButtons />
                    </div>

                    {/* Mobile Menu */}
                    <Ariakit.MenuProvider>
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={hamburgerButtonClass({
                                    active: isOpen,
                                })}
                            >
                                {isOpen ? (
                                    <RiCloseLine className="h-6 w-6" />
                                ) : (
                                    <RiMenuLine className="h-6 w-6" />
                                )}
                            </button>

                            <Ariakit.Menu
                                open={isOpen}
                                onClose={() => setIsOpen(false)}
                                className="fixed inset-x-0 top-16 z-50 mt-2 max-h-[calc(100vh-80px)] w-screen overflow-auto bg-white px-6 py-4 shadow-lg"
                                modal
                            >
                                <div className="flex flex-col gap-4">
                                    {routes.map((route) => (
                                        <Ariakit.MenuItem
                                            key={route.href}
                                            className="w-full"
                                            onClick={() => setIsOpen(false)}
                                            render={
                                                <Link
                                                    to={route.href}
                                                    className={buttonClass({
                                                        intent: "tertiary",
                                                        size: "medium",
                                                        className:
                                                            "w-full justify-start",
                                                    })}
                                                >
                                                    {route.name}
                                                </Link>
                                            }
                                        />
                                    ))}
                                    <Ariakit.MenuSeparator className="my-2 border-t border-slate-200" />
                                    {user ? (
                                        <Ariakit.MenuItem
                                            className="w-full"
                                            onClick={() => setIsOpen(false)}
                                            render={
                                                <Link
                                                    to="/logout"
                                                    className={buttonClass({
                                                        intent: "destructive",
                                                        size: "medium",
                                                        icon: "right",
                                                        className:
                                                            "w-full justify-start",
                                                    })}
                                                >
                                                    <span>Logout</span>
                                                    <RiLogoutBoxRLine className="h-4" />
                                                </Link>
                                            }
                                        />
                                    ) : (
                                        <>
                                            <Ariakit.MenuItem
                                                className="w-full"
                                                onClick={() => setIsOpen(false)}
                                                render={
                                                    <Link
                                                        to="/register"
                                                        className={buttonClass({
                                                            intent: "tertiary",
                                                            size: "medium",
                                                            className:
                                                                "w-full justify-start",
                                                        })}
                                                    >
                                                        Register
                                                    </Link>
                                                }
                                            />
                                            <Ariakit.MenuItem
                                                className="w-full"
                                                onClick={() => setIsOpen(false)}
                                                render={
                                                    <Link
                                                        to="/login"
                                                        className={buttonClass({
                                                            intent: "secondary",
                                                            size: "medium",
                                                            className:
                                                                "w-full justify-start",
                                                        })}
                                                    >
                                                        Login
                                                    </Link>
                                                }
                                            />
                                        </>
                                    )}
                                </div>
                            </Ariakit.Menu>
                        </div>
                    </Ariakit.MenuProvider>
                </div>
            </div>
        </nav>
    );
};
