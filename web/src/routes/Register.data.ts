import { href } from "../router";
import type { LoginSuccess, RegisterSuccess } from "../schema/user";
import { makeLoader, redirect } from "react-router-typesafe";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const registerAction = async ({
	request,
}: { request: Request }): Promise<
	LoginSuccess | { error: string } | Response
> => {
	console.log("Register Action");
	const formData = await request.formData();
	const response = await fetch(`${VITE_BACKEND_URL}/api/v2/register/`, {
		method: "POST",
		body: JSON.stringify(Object.fromEntries(formData.entries())),
		headers: {
			Accept: "application/json",
			'Content-Type': "application/json",
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
	if (responseJson && "token" in responseJson) {
		return redirect(href({ path: "/login" }));
	}
	return responseJson as RegisterSuccess;
};

export const registerLoader = makeLoader(async ({ request }) => {
	return null;
});
