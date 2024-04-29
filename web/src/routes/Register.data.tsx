import { href } from "../router";
import type { RegisterSuccess } from "../schema/user";
import { makeLoader, redirect } from "react-router-typesafe";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const registerAction = async ({ request }: { request: Request }) => {
	console.log("Register Action");
	const formData = await request.formData();
	const response = await fetch(`${VITE_BACKEND_URL}/user/signup`, {
		method: "POST",
		body: formData, // Sending the form data
		headers: {
			Accept: "application/json",
		},
	});
	if (!response.ok) {
		switch (response.status) {
			case 400:
				return {
					error: "Invalid request",
				};
			default:
				return {
					error: "Unknown error",
				};
		}
	}
	const responseJson = await response.json();
	console.log(responseJson);
	if (responseJson && "token" in responseJson) {
		await redirect(href({ path: "/login" }));
	}
	return responseJson as RegisterSuccess;
};

export const registerLoader = makeLoader(async ({ request }) => {
	return null;
});
