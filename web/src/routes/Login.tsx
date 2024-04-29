import { TextInput, Container, Checkbox } from "@mantine/core";
import { Link, Form } from "react-router-dom";
import { href } from "../router";
import { button, buttonInnerRing } from "../components/Button";
import { useActionData } from "react-router-typesafe";
import { useState } from "react";
import { Checkmark } from "../components/Checkmark";
import type { loginAction } from "./Login.data";

const BACKEND_URL = import.meta.env.BACKEND_URL;

export const Login = () => {
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
					onSubmit={async (formEvent) => {
						formEvent.preventDefault(); // Prevent the default form submission behavior
						const formData = new FormData();
						formData.append("username", formEvent.currentTarget.username.value);
						formData.append("password", formEvent.currentTarget.password.value);
						console.log(formData.get("username"));
						console.log(formData.get("password"));
						console.log("Form data:", formData);
						console.log("Backend URL:", BACKEND_URL);
						try {
							const response = await fetch("http://127.0.0.1:8000/user/login", {
								method: "POST",
								body: formData, // Sending the form data
								headers: {
									Accept: "application/json",
								},
							});

							if (response.ok) {
								const result = await response.json(); // Handle the response data as JSON
								console.log("Success:", result);
								// Perform actions based on success, e.g., redirect or display a success message
							} else {
								throw new Error("Network response was not ok.");
							}
						} catch (error) {
							console.error("Error during form submission:", error);
							// Handle errors, e.g., display an error message to the user
						}
					}}
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
						<button type="submit" className={button({ intent: "secondary" })}>
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
