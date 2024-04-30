import type { User } from "../schema/user";
import { makeLoader } from "react-router-typesafe";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const homeAction = async ({ request }: { request: Request }) => {
	console.log("Home Action");
	const formData = new FormData();
	formData.append("keyword", "born in New Jersey");
	const response = await fetch(`${VITE_BACKEND_URL}/user/search/`, {
		method: "POST",
		headers: {
			Accept: "application/json",
		},
		body: formData,
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
	return responseJson;
};

export const homeLoader = makeLoader(async ({ request }) => {
	const user: User | null =
		localStorage.getObject("zenith_app_user") ||
		sessionStorage.getObject("zenith_app_user");
	return user;
});
