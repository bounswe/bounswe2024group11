import { Form, Link } from "react-router-dom";
import { useActionData } from "react-router-typesafe";
import { button, buttonInnerRing } from "../components/button";

import { inputClass, labelClass } from "../components/input";
import { Logo } from "../components/logo";
import type { loginAction } from "./Login.data";

export const Login = () => {
    const actionData = useActionData<typeof loginAction>();
    const isAuthError = actionData && "error" in actionData;

    return (
        <div className="flex flex-col items-center md:py-16 py-1 relative dot-pattern min-h-[100dvh] gap-6">
            <div className="flex flex-col items-stretch justify-center min-h-12 gap-6 bg-white w-full max-w-md shadow-card border rounded-2xl border-slate-100 rounded-4 p-6">
                <div className="flex flex-col items-center gap-2">
                    <Link
                        to={"/"}
                        aria-description="App Home Page"
                        className="hover:bg-slate-50 border-slate-100 items-center p-4 aspect-square bg-gradient-to-b from-[rgba(228,229,231,.48)] to-[rgba(228,229,231,0)] rounded-full ring-1 ring-slate-100"
                    >
                        <Logo size={40} />
                    </Link>
                    <div className="flex flex-col items-center gap-1">
                        <h1 className="text-2xl font-medium font-display text-slate-950">
                            Login to your account
                        </h1>
                        <p className="text-center text-slate-500 text-balance">
                            Pick up where you left off with your quizzes and
                            discussions.
                        </p>
                    </div>
                </div>
                <hr className="border-slate-100" />
                <Form
                    className="w-full flex flex-col gap-6"
                    method="POST"
                    action="/login"
                >
                    <div className="flex flex-col gap-3">
                        <fieldset className="flex flex-col gap-3">
                            <label className={labelClass()}>
                                <span>
                                    Username{" "}
                                    <span className="text-cyan-600">*</span>
                                </span>
                                <input
                                    autoFocus={true}
                                    type="text"
                                    name="username"
                                    autoComplete="username"
                                    placeholder="emily_brown"
                                    aria-label="Username"
                                    aria-invalid={isAuthError}
                                    className={inputClass()}
                                    required
                                />
                            </label>
                            <label className={labelClass()}>
                                <span>
                                    Password{" "}
                                    <span className="text-cyan-600">*</span>
                                </span>
                                <input
                                    type="password"
                                    name="password"
                                    autoComplete="current-password"
                                    placeholder="••••••••••"
                                    aria-label="Password"
                                    aria-invalid={isAuthError}
                                    aria-description="Password"
                                    className={inputClass()}
                                    required
                                />
                            </label>
                        </fieldset>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <label
                                htmlFor="keep_me_logged_in"
                                className="text-slate-600 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    id="keep_me_logged_in"
                                    name="keep_me_logged_in"
                                    className="m-0 p-0"
                                />
                                Keep me logged in
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <button
                            type="submit"
                            className={button({ intent: "secondary" })}
                        >
                            <div
                                className={buttonInnerRing({
                                    intent: "secondary",
                                })}
                            />
                            <span>Log In</span>
                        </button>

                        <Link
                            className={button({ intent: "tertiary" })}
                            to="/register"
                        >
                            <span className="text-slate-900 transition-all">
                                Register
                            </span>
                        </Link>
                    </div>
                </Form>
            </div>
            <div className="px-6 flex flex-col items-center w-full max-w-md rounded-2xl rounded-4 gap-0">
                <span className="text-slate-500"> Just looking around?</span>
                <Link
                    to="/"
                    className="text-cyan-800 font-medium hover:text-cyan-950 ml-1 hover:underline underline-offset-2"
                >
                    Use Turquiz as a guest
                </Link>
            </div>
        </div>
    );
};
