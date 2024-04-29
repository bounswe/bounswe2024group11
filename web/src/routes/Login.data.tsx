import { makeLoader, redirect } from "react-router-typesafe";

const BACKEND_URL = "http://164.90.189.150:8000";

export const loginAction = async ({ request }: { request: Request }) => {
	const formData = await request.formData();
	const response = await fetch(`${BACKEND_URL}/user/login`, {
		method: "POST",
		mode: "no-cors",
		headers: {
			"Content-Type": "application/json",
		},
		body: formData,
	}).catch((err) => {
		return {
			error: "An error occurred",
		} as const;
	});
	return response;
};

export const loginLoader = makeLoader(() => {
	if (localStorage.getItem("zenith_app_token")) {
		return redirect("/");
	}
	return null;
});
