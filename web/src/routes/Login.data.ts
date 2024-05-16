import type { LoginSuccess } from "@/schema/user";
import { href } from "../router";
import { useActionData } from "react-router-typesafe";
import { makeLoader, redirect } from "react-router-typesafe";
import { number, object, safeParse, string } from "valibot";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const loginResponseSchema = object({
	token: string(),
	user: object({
		id: number(),
		username: string(),
		email: string(),
	}),
});

Storage.prototype.setObject = function (key: string, value: object) {
	this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function (key: string) {
	const item = this.getItem(key);
	if (!item) {
		return null;
	}
	return JSON.parse(item);
};

export const loginAction = async ({ request }: { request: Request }) => {
	console.log("Login Action");
	const formData = await request.formData();
	const response = await fetch(`${VITE_BACKEND_URL}/api/v2/login/`, {
		method: "POST",
		body: JSON.stringify(Object.fromEntries(formData.entries())), // Sending the form data
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	if (!response.ok) {
		switch (response.status) {
			case 400:
				return {
					error: "Invalid request",
				};
			case 401:
				return {
					error: "Unauthorized",
				};
			default:
				return {
					error: "Unknown error",
				};
		}
	}
	const { issues, output, success } = safeParse(
		loginResponseSchema,
		await response.json(),
	);
	if (!success) {
		console.log(issues);
		return null;
	}

	if (formData.get("keep") === "on") {
		localStorage.setItem("zenith_app_token", output.token);
		localStorage.setObject("zenith_app_user", output.user);
	} else {
		sessionStorage.setItem("zenith_app_token", output.token);
		sessionStorage.setObject("zenith_app_user", output.user);
	}

	return output;
};

export const loginLoader = makeLoader(async () => {
	return null;
});
