import { Form, Link } from "react-router-dom";
import { useActionData } from "react-router-typesafe";
import { buttonClass, buttonInnerRing } from "../components/button";

import { inputClass, labelClass } from "../components/input";
import { Logo } from "../components/logo";
import type { loginAction } from "./Login.data";

export const Login = () => {
    const actionData = useActionData<typeof loginAction>();
    const isAuthError = actionData && "error" in actionData;

    return (
        <div className="dot-pattern relative flex min-h-[100dvh] flex-col items-center gap-6 py-1 md:py-16">
            <div className="rounded-2xl flex min-h-12 w-full max-w-md flex-col items-stretch justify-center gap-6 rounded-4 border border-slate-100 bg-white p-6 shadow-card">
                <div className="flex flex-col items-center gap-2">
                    <div className="aspect-square items-center rounded-full border-slate-100 bg-gradient-to-b from-[rgba(228,229,231,.48)] to-[rgba(228,229,231,0)] p-4 ring-1 ring-slate-100 hover:bg-slate-50">
                        <Logo size={40} />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <h1 className="font-display text-2xl font-medium text-slate-950">
                            Login to your account
                        </h1>
                        <p className="text-balance text-center text-slate-500">
                            Pick up where you left off with your quizzes and
                            discussions.
                        </p>
                    </div>
                </div>
                <hr className="border-slate-100" />
                <Form
                    className="flex w-full flex-col gap-6"
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
                                className="flex cursor-pointer text-slate-600"
                            >
                                <input
                                    type="checkbox"
                                    id="keep_me_logged_in"
                                    name="keep_me_logged_in"
                                    className="m-0 rounded-[3px] border-slate-200 p-0 text-cyan-700 ring-0 ring-transparent ring-offset-2 transition-all focus:ring-cyan-700 focus-visible:ring-cyan-700 focus-visible:ring-offset-2"
                                    aria-label="Keep me logged in"
                                />
                                <span className="inline-flex h-4 -translate-y-1 pl-2 text-sm leading-6">
                                    Keep me logged in
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <button
                            type="submit"
                            className={buttonClass({ intent: "secondary" })}
                        >
                            <div
                                className={buttonInnerRing({
                                    intent: "secondary",
                                })}
                            />
                            <span>Log In</span>
                        </button>

                        <Link
                            className={buttonClass({ intent: "tertiary" })}
                            to="/register"
                        >
                            <span className="text-slate-900 transition-all">
                                Register
                            </span>
                        </Link>
                    </div>
                </Form>
            </div>
            <div className="rounded-2xl flex w-full max-w-md flex-col items-center gap-0 rounded-4 px-6">
                <span className="text-slate-500"> Just looking around?</span>
                <Link
                    to="/"
                    className="ml-1 font-medium text-cyan-800 underline-offset-2 hover:text-cyan-950 hover:underline"
                >
                    Use Turquiz as a guest
                </Link>
            </div>
        </div>
    );
};
