import { makeLoader, redirect } from "react-router-typesafe";

const BACKEND_URL = "http://159.65.125.158";
const PORT = "8000";

export const loginAction = async ({ request }: { request: Request }) => {
	const formData = await request.formData();

	const response = await fetch(`${BACKEND_URL}:${PORT}/user/login`, {
		method: "POST",
		mode: "no-cors", // no-cors, *cors, same-origin
		headers: {
			"Content-Type": "application/json",
		},
		body: formData,
	});
	const resJson = await response.json();
	console.log(resJson);
	return resJson;
};

export const loginLoader = makeLoader(() => {
	if (localStorage.getItem("zenith_app_token")) {
		return redirect("/");
	}
	return null;
});
