import { Form, Link } from "react-router-dom";
import { button, buttonInnerRing } from "../components/button";

import { useEffect, useRef } from "react";
import { useActionData } from "react-router-typesafe";
import { inputClass, labelClass } from "../components/input";
import { Logo } from "../components/logo";
import { registerAction } from "./Register.data";

export const Register = () => {
    const actionData = useActionData<typeof registerAction>();
    const mismatchedPasswords = actionData?.error === "Passwords do not match";
    const passwordRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (mismatchedPasswords) {
            passwordRef.current?.focus();
        }
    }, [mismatchedPasswords]);
    const usedUsername = actionData?.error === "Username is already taken";
    const usedEmail = actionData?.error === "Email is already taken";

    return (
        <div className="flex flex-col items-center md:py-16 py-1 relative dot-pattern min-h-[100dvh] gap-6">
            <div className="flex flex-col items-stretch justify-center min-h-12 gap-6 bg-white w-full max-w-md shadow-card border rounded-2xl border-slate-100 rounded-4 p-6">
                <div className="flex flex-col items-center gap-2">
                    <div className="hover:bg-slate-50 border-slate-100 items-center p-4 aspect-square bg-gradient-to-b from-[rgba(228,229,231,.48)] to-[rgba(228,229,231,0)] rounded-full ring-1 ring-slate-100">
                        <Logo size={40} />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <h1 className="text-2xl font-medium font-display text-slate-950">
                            Register for Turquiz today
                        </h1>
                        <p className="text-center text-slate-500 text-balance">
                            Access interactive quizzes, engaging forums, and a
                            whole community of learners.
                        </p>
                    </div>
                </div>
                <hr className="border-slate-100" />
                <Form
                    className="w-full flex flex-col gap-6"
                    method="POST"
                    action="/register"
                >
                    <fieldset className="flex flex-col gap-3">
                        <label className={labelClass()}>
                            <span>
                                Full Name{" "}
                                <span className="text-cyan-600">*</span>
                            </span>

                            <input
                                autoFocus={true}
                                type="text"
                                name="full_name"
                                autoComplete="name"
                                aria-label="Full name"
                                aria-invalid={mismatchedPasswords}
                                className={inputClass()}
                                required
                            />
                        </label>
                        <label className={labelClass()}>
                            <span>
                                Email Address{" "}
                                <span className="text-cyan-600">*</span>
                            </span>
                            <input
                                type="email"
                                name="email"
                                autoComplete="email"
                                aria-label="Email"
                                aria-invalid={mismatchedPasswords}
                                className={inputClass({ invalid: usedEmail })}
                                required
                            />
                        </label>

                        <label className={labelClass()}>
                            <span>
                                Username{" "}
                                <span className="text-cyan-600">*</span>
                            </span>
                            <input
                                type="text"
                                name="username"
                                autoComplete="username"
                                aria-label="Username"
                                className={inputClass({
                                    invalid: usedUsername,
                                })}
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
                                autoComplete="new_password"
                                aria-label="Password"
                                ref={passwordRef}
                                aria-description="Password"
                                className={inputClass({
                                    invalid: mismatchedPasswords,
                                })}
                                required
                            />
                        </label>

                        <label className={labelClass()}>
                            <span>
                                Confirm Password{" "}
                                <span className="text-cyan-600">*</span>
                            </span>
                            <input
                                type="password"
                                name="confirm_password"
                                autoComplete="new_password"
                                aria-label="Confirm Password"
                                aria-description="Type your password again"
                                className={inputClass({
                                    invalid: mismatchedPasswords,
                                })}
                                required
                            />
                        </label>
                    </fieldset>

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
                            <span>Register</span>
                        </button>

                        <Link
                            className={button({ intent: "tertiary" })}
                            to="/login"
                        >
                            <span className="text-slate-900">Login</span>
                        </Link>
                    </div>
                </Form>
            </div>
            <div className="px-6 flex flex-col items-center w-full max-w-md rounded-2xl rounded-4 gap-0">
                <span className="text-slate-500">Just looking around?</span>
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
