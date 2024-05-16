import {
	TextInput,
	Container,
	Button,
	useMantineTheme,
	Notification,
} from "@mantine/core";
import { Link, Form, useSubmit } from "react-router-dom";
import { href } from "../router";
import { button, buttonInnerRing } from "../components/Button";
import { useState } from "react";
import { inlineLink } from "../components/InlineLink";
import { imageLink } from "../components/ImageLink";
import { useActionData } from "react-router-typesafe";
import type { registerAction } from "./Register.data";
import { RiErrorWarningLine } from "@remixicon/react";

export const Register = () => {
	const actionData = useActionData<typeof registerAction>();
	const isAuthError = actionData && "error" in actionData;
	return (
		<Container className="flex flex-col items-center md:py-20 py-12">
			<div className="flex flex-col items-stretch justify-center min-h-12 gap-6 w-full max-w-md shadow-card border border-slate-100 rounded-4 p-6">
				<div className="flex flex-col items-center gap-2">
					<Link
						to={href({ path: "/" })}
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
							Create a new Zenith account
						</h1>
						<p className="text-center text-slate-500 max-w-xs">
							Unlock the world of comics. Register for Zenith today.
						</p>
					</div>
				</div>
				<hr className="border-slate-100" />
				<Form
					className="w-full flex flex-col gap-6"
					method="POST"
					action="/register"
				>
					<div className="flex flex-col gap-3">
						<TextInput
							placeholder="John Doe"
							id="fullName"
							type="text"
							required
							label="Full Name"
							name="fullname"
							aria-label="Full Name"
						/>

						<TextInput
							placeholder="johndoe@example.com"
							id="email"
							type="email"
							required
							label="Email Address"
							name="email"
							aria-label="Email Address"
						/>

						<TextInput
							placeholder="john_doe"
							id="username"
							type="text"
							required
							label="Username"
							name="username"
							aria-label="User name"
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

					<div className="flex flex-col gap-2">
						<button type="submit" className={button({ intent: "secondary" })}>
							<div className={buttonInnerRing({ intent: "secondary" })} />
							<span>Register</span>
						</button>

						<a
							className={button({ intent: "tertiary" })}
							href={href({ path: "/login" })}
						>
							<span className="text-slate-900">Log In</span>
						</a>

						<p className="text-sm text-slate-400 text-center text-balance">
							By clicking Register, you agree to accept Zenith's{" "}
							<a className={inlineLink()} href={href({ path: "/terms" })}>
								Terms and Conditions
							</a>
						</p>
					</div>
				</Form>
			</div>
			{isAuthError && (
				<Notification
					style={{ position: "fixed", bottom: "40px", right: "40px" }}
					title="Login Error"
					className="shadow-card border-red-100 border rounded-2"
				>
					<div className="flex flex-col gap-1">
						<div className="flex gap-2 items-center">
							<RiErrorWarningLine size={20} className="text-red-800" />
							<h2 className="text-md font-medium  text-red-800">
								Unable to Register
							</h2>
						</div>
						<p className="text-sm text-slate-500 text-pretty">
							Please try with a different email or username.
						</p>
					</div>
				</Notification>
			)}
		</Container>
	);
};
