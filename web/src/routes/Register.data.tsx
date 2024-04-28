import { makeLoader } from "react-router-typesafe";

const BACKEND_URL = "http://159.65.125.158";
const PORT = "8000";

export const registerAction = async ({ request }: { request: Request }) => {
	const formdata = await request.formData();
	const name = formdata.get("fullname");
	const email = formdata.get("email");
	const username = formdata.get("username");
	const password = formdata.get("password");
	console.log(JSON.stringify({ name, email, username, password }));
	const response = await fetch(`${BACKEND_URL}:${PORT}/user/signup`, {
		method: "POST",
		mode: "no-cors", // no-cors, *cors, same-origin
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: JSON.stringify({ name, email, username, password }),
	});
	console.log(response.body);
	return null;
};

export const registerLoader = makeLoader(async ({ request }) => {
	console.log("registerLoader");
	return null;
});
