import { object, safeParse, string } from "valibot";
import { href } from "../router";
import type { LoginSuccess, RegisterSuccess } from "../types/user";
import { makeLoader, redirect } from "react-router-typesafe";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const registerResponseSchema = object({
	username: string(),
	email: string(),
});

export const registerAction = async ({ request }: { request: Request }) => {
	console.log("Register Action");
	const formData = await request.formData();
	const response = await fetch(`${VITE_BACKEND_URL}/api/v2/register/`, {
		method: "POST",
		body: JSON.stringify(Object.fromEntries(formData.entries())),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const responseJson = await response.json();
	if (!response.ok) {
		switch (response.status) {
			case 400:
				return {
					error: responseJson.username,
				};
			default:
				return {
					error: "Unknown error",
				};
		}
	}
	console.log(responseJson);
	const { issues, output, success } = safeParse(
		registerResponseSchema,
		responseJson,
	);

	if (!success) {
		console.error(issues);
		return {
			error: "Invalid response",
		};
	}

	return redirect("/login");
};

export const registerLoader = makeLoader(async ({ request }) => {
	return null;
});
