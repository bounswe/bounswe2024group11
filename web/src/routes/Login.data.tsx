import { makeLoader, redirect } from "react-router-typesafe";

const BACKEND_URL = "http://159.65.125.158";
const PORT = "8000";

export const loginAction = async ({ request }: { request: Request }) => {
	const formdata = await request.formData();
	const username = formdata.get("username");
	const password = formdata.get("password");
	console.log(JSON.stringify({ username, password }));
	const response = await fetch(`${BACKEND_URL}:${PORT}/user/login`, {
		method: "POST",
		mode: "no-cors", // no-cors, *cors, same-origin
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: JSON.stringify({ username, password }),
	});
	console.log(response.body);
	return null;
};

export const loginLoader = makeLoader(() => {
	console.log("loginLoader");
	if (localStorage.getItem("zenith_app_token")) {
		return redirect("/");
	}
	return null;
});
