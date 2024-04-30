import type { LoginSuccess } from "@/schema/user";
import { href } from "../router";
import { useActionData } from "react-router-typesafe";
import { makeLoader, redirect } from "react-router-typesafe";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

export const loginAction = async ({
	request,
}: { request: Request }): Promise<
	LoginSuccess | { error: string } | Response
> => {
	console.log("Login Action");
	const formData = await request.formData();
	const response = await fetch(`${VITE_BACKEND_URL}/user/login`, {
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
	const responseJson = await response.json();
	console.log(responseJson);
	if (responseJson && "token" in responseJson) {
		if (formData.get("keep") === "on") {
			localStorage.setItem("zenith_app_token", responseJson.token);
			localStorage.setObject("zenith_app_user", responseJson.user);
		} else {
			sessionStorage.setItem("zenith_app_token", responseJson.token);
			sessionStorage.setObject("zenith_app_user", responseJson.user);
		}
		console.log("User logged in");
		return redirect(href({ path: "/" }));
	}
	return {
		error: "Unknown error",
	};
};

export const loginLoader = makeLoader(async () => {
	return null;
});
