import TextInput from "../components/textInput";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Link, Form } from "react-router-dom";
import { button, buttonInnerRing } from "../components/button";
import { useActionData } from "react-router-typesafe";

import type { loginAction } from "./Login.data";
import { imageLink } from "../components/ImageLink";
import * as Toast from "@radix-ui/react-toast";
import { RiErrorWarningLine } from "@remixicon/react";
import { CheckIcon } from "@radix-ui/react-icons";

export const Login = () => {
    const actionData = useActionData<typeof loginAction>();
    const isAuthError = actionData && "error" in actionData;
    return (
        <div className="flex flex-col items-center md:py-20 py-1 relative">
            <div className="flex flex-col items-stretch justify-center min-h-12 gap-6 w-full max-w-md shadow-card border border-slate-100 rounded-4 p-6">
                <div className="flex flex-col items-center gap-2">
                    <Link
                        to={"/"}
                        className={imageLink({
                            rounded: true,
                            className: "flex flex-row items-center gap-2",
                        })}
                    >
                        <img
                            src="./img/zenith-login-logo.webp"
                            alt="Zenith Logo"
                            width={80}
                            height={80}
                        />
                    </Link>
                    <div className="flex flex-col items-center gap-1">
                        <h1 className="text-2xl font-medium font-display text-slate-950">
                            Login to your Zenith account
                        </h1>
                        <p className="text-center text-slate-500">
                            Ready to continue your comic adventure? Log in to
                            your Zenith account.
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
                        <TextInput
                            placeholder="johndoe"
                            id="username"
                            type="username"
                            required
                            label="Username"
                            name="username"
                            aria-label="username"
                            error={isAuthError}
                            aria-errormessage="Invalid username"
                        />

                        <TextInput
                            className="placeholder-slate-200"
                            placeholder="••••••••"
                            type="password"
                            required
                            label="Password"
                            name="password"
                            aria-label="Password"
                            error={isAuthError}
                            aria-errormessage="Invalid password"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Checkbox.Root
                                className="flex items-center justify-center h-4 w-4 bg-white border border-slate-300 text-primary rounded cursor-pointer hover:ring-slate-200 ring-1 hover:ring-3 focus-visible:ring-slate-300 focus-visible:ring-3 focus-visible:outline-none ring-transparent transition-all duration-300"
                                name="keep"
                                aria-label="Keep me logged in"
                            >
                                <Checkbox.Indicator className="h-4 w-4">
                                    <CheckIcon className="text-slate-400" />
                                    {/*<Checkmark
                                        className="text-slate-400"
                                        indeterminate={true}
                                    />*/}
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            <label
                                htmlFor="keep"
                                className="text-slate-600 pl-2 cursor-pointer"
                            >
                                Keep me logged in
                            </label>
                        </div>
                        <Link
                            className={imageLink({
                                className:
                                    "underline text-sm text-slate-500 hover:text-slate-950 font-medium transition-colors",
                            })}
                            to="/"
                        >
                            Forgot Password
                        </Link>
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

                        <a
                            className={button({ intent: "tertiary" })}
                            href={"/register"}
                        >
                            <span className="text-slate-900">Register</span>
                        </a>
                    </div>
                </Form>
            </div>
            {isAuthError && (
                <Toast.Provider>
                    <Toast.Root className="shadow-card border-red-100 border rounded-2 fixed bottom-12 right-10 p-4 bg-white">
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-2 items-center">
                                <RiErrorWarningLine
                                    size={20}
                                    className="text-red-800"
                                />
                                <Toast.Title className="text-md font-medium text-red-800">
                                    Invalid Credentials
                                </Toast.Title>
                            </div>
                            <Toast.Description asChild>
                                <p className="text-sm text-slate-500">
                                    Please check your username & password and
                                    try again.
                                </p>
                            </Toast.Description>
                        </div>
                    </Toast.Root>
                    <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-6 gap-2" />
                </Toast.Provider>
            )}
        </div>
    );
};
