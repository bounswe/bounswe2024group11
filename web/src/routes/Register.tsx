import { TextInput, Container, Button, useMantineTheme } from "@mantine/core";
import { Link, Form, useSubmit } from "react-router-dom";
import { href } from "../router";
import { button, buttonInnerRing } from "../components/Button";
import { useState } from "react";

export const Register = () => {
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
					action="/login"
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
						<button
							type="submit"
							className={button({ intent: "secondary" })}
							onSubmit={() => {}}
						>
							<div className={buttonInnerRing({ intent: "secondary" })} />
							<span>Register</span>
						</button>

						<a
							className={button({ intent: "tertiary" })}
							href={href({ path: "/login" })}
						>
							<span className="text-slate-900">Log In</span>
						</a>

						<p className="text-sm text-slate-400 text-center">
							By clicking Register, you agree to accept Zenit's{" "}
							<a
								className="underline underline-offset-2 text-slate-900"
								href={href({ path: "/terms" })}
							>
								Terms and Conditions
							</a>
						</p>
					</div>
				</Form>
			</div>
		</Container>
	);
};
