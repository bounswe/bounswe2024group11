import { TextInput, Container, Checkbox } from "@mantine/core";
import { Link, Form } from "react-router-dom";
import { href } from "../router";
import { button, buttonInnerRing } from "../components/Button";
import { useActionData } from "react-router-typesafe";
import { useState } from "react";
import { Checkmark } from "../components/Checkmark";
import type { loginAction } from "./Login.data";

export const Login = () => {
	const c = useActionData<typeof loginAction>();
	console.log(c?.error);
	const [isKeepMeLoggedIn, setIsKeepMeLoggedIn] = useState(true);
	return (
		<Container className="flex flex-col items-center md:py-20 py-12">
			<div className="flex flex-col items-stretch justify-center min-h-12 gap-6 w-full max-w-md shadow-card border border-slate-100 rounded-4 p-6">
				<div className="flex flex-col items-center gap-2">
					<Link
						to={href({ path: "/" })}
						className="flex flex-row items-center gap-2"
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
							Ready to continue your comic adventure? Log in to your Zenith
							account.
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
						/>

						<TextInput
							className="placeholder-slate-200"
							placeholder="••••••••"
							type="password"
							required
							label="Password"
							name="password"
							aria-label="Password"
						/>
					</div>

					<div className="flex items-center justify-between">
						<Checkbox
							icon={Checkmark}
							color="gray"
							classNames={{
								root: "cursor-pointer",
								label: "text-slate-600 pl-2 cursor-pointer",
								body: "flex items-center",
								input:
									"text-primary accent-slate-400 border-slate-300 h-4 w-4 cursor-pointer hover:ring-slate-200 ring-1 hover:ring-3 ring-transparent duration-300 transition-all",
								inner: "h-4 w-4",
							}}
							checked={isKeepMeLoggedIn}
							onChange={(event) =>
								setIsKeepMeLoggedIn(event.currentTarget.checked)
							}
							label="Keep me logged in"
							aria-label="Keep me logged in"
						/>
						<Link
							className="underline text-sm text-slate-500 hover:text-slate-950 font-medium transition-colors"
							to="/"
						>
							Forgot Password
						</Link>
					</div>

					<div className="flex flex-col gap-2">
						<button
							type="submit"
							className={button({ intent: "secondary" })}
							onSubmit={() => {}}
						>
							<div className={buttonInnerRing({ intent: "secondary" })} />
							<span>Log In</span>
						</button>

						<a
							className={button({ intent: "tertiary" })}
							href={href({ path: "/register" })}
						>
							<span className="text-slate-900">Register</span>
						</a>
					</div>
				</Form>
			</div>
		</Container>
	);
};
