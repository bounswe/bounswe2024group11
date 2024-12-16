import { RiExternalLinkLine, RiImage2Line } from "@remixicon/react";
import { cva } from "cva";
import { useEffect, useRef, useState } from "react";
import { Link, useFetcher } from "react-router-dom";
import { useActionData } from "react-router-typesafe";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { inputClass, labelClass } from "../../components/input";
import { Logo } from "../../components/logo";
import { registerAction } from "./Register.data";

export const avatarContainerStyles = cva(
    "flex h-24 w-24 items-center justify-center overflow-hidden rounded-full transition-all duration-200 hover:opacity-90",
    {
        variants: {
            hasPreview: {
                true: "",
                false: "border-2 border-dashed border-slate-300 bg-slate-100",
            },
        },
        defaultVariants: {
            hasPreview: false,
        },
    },
);

export const Register = () => {
    const actionData = useActionData<typeof registerAction>();
    const mismatchedPasswords = actionData?.error === "Passwords do not match";
    const passwordRef = useRef<HTMLInputElement>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isRegisterDisabled, setIsRegisterDisabled] = useState(false);
    const registerFetcher = useFetcher();

    useEffect(() => {
        if (mismatchedPasswords) {
            passwordRef.current?.focus();
        }
    }, [mismatchedPasswords]);

    useEffect(() => {
        if (registerFetcher.state === "idle") {
            setIsRegisterDisabled(false);
        }
    }, [registerFetcher.state]);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const usedUsername = actionData?.error === "Username is already taken";
    const usedEmail = actionData?.error === "Email is already taken";

    return (
        <div className="dot-pattern relative flex min-h-[100dvh] flex-col items-center gap-6 py-1 md:py-16">
            <div className="rounded-2xl flex min-h-12 w-full max-w-md flex-col items-stretch justify-center gap-6 rounded-4 border border-slate-100 bg-white p-6 shadow-card">
                <div className="flex flex-col items-center gap-2">
                    <div className="aspect-square items-center rounded-full border-slate-100 bg-gradient-to-b from-[rgba(228,229,231,.48)] to-[rgba(228,229,231,0)] p-4 ring-1 ring-slate-100">
                        <Logo size={40} />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <h1 className="font-display text-2xl font-medium text-slate-950">
                            Register for Turquiz today
                        </h1>
                        <p className="text-balance text-center text-slate-500">
                            Access interactive quizzes, engaging forums, and a
                            whole community of learners.
                        </p>
                    </div>
                </div>
                <hr className="border-slate-100" />
                <registerFetcher.Form
                    className="flex w-full flex-col gap-6"
                    method="POST"
                    action="/register"
                    encType="multipart/form-data"
                    onSubmit={() => setIsRegisterDisabled(true)}
                >
                    <div className="flex flex-col items-center gap-2">
                        <div
                            onClick={handleAvatarClick}
                            className="group relative cursor-pointer"
                        >
                            <div
                                className={avatarContainerStyles({
                                    hasPreview: !!avatarPreview,
                                })}
                            >
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar preview"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <RiImage2Line className="h-8 w-8 text-slate-400" />
                                )}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                                <div className="rounded rounded-1 bg-slate-950/50 p-1 py-1 text-xs font-medium text-white">
                                    Select A Photo
                                </div>
                            </div>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png, image/jpeg"
                            name="avatar_file"
                            onChange={handleAvatarChange}
                            className="hidden"
                        />
                    </div>

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
                                autoComplete="new-password"
                                ref={passwordRef}
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
                                autoComplete="new-password"
                                className={inputClass({
                                    invalid: mismatchedPasswords,
                                })}
                                required
                            />
                        </label>

                        <label className={labelClass()}>
                            <span>
                                English Proficiency{" "}
                                <span className="text-cyan-600">*</span>
                            </span>
                            <select
                                name="proficiency"
                                className={inputClass()}
                                required
                            >
                                <option value={1}>Beginner (1-8)</option>
                                <option value={2}>Intermediate (9-16)</option>
                                <option value={3}>Advanced (17-25)</option>
                            </select>
                        </label>
                        <Link
                            role="link"
                            aria-label="Test Your English"
                            rel="noreferrer"
                            target="_blank"
                            to="https://www.cambridgeenglish.org/test-your-english/general-english/"
                            className="flex items-center gap-2 text-cyan-800 underline-offset-2 hover:text-cyan-950 hover:underline"
                        >
                            <span className="text-sm font-medium">
                                Test Your English
                            </span>
                            <RiExternalLinkLine className="h-4 w-4" />
                        </Link>
                    </fieldset>

                    <div className="flex flex-col gap-2">
                        <button
                            type="submit"
                            className={buttonClass({ intent: "secondary" })}
                            disabled={isRegisterDisabled}
                        >
                            <div
                                className={buttonInnerRing({
                                    intent: "secondary",
                                })}
                                aria-hidden="true"
                            />
                            <span>Register</span>
                        </button>

                        <Link
                            className={buttonClass({ intent: "tertiary" })}
                            to="/login"
                        >
                            <span className="text-slate-900">Login</span>
                        </Link>
                    </div>
                </registerFetcher.Form>
            </div>
            <div className="rounded-2xl flex w-full max-w-md flex-col items-center gap-0 px-6">
                <span className="text-slate-500">Just looking around?</span>
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

export default Register;
