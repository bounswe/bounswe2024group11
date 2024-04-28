import { makeLoader } from "react-router-typesafe";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const PORT = import.meta.env.VITE_BACKEND_PORT;

export const registerAction = async ({ request }: { request: Request }) => {
	const formData = await request.formData();
	const response = await fetch(`${BACKEND_URL}:${PORT}/user/signup`, {
		method: "POST",
		mode: "no-cors", // no-cors, *cors, same-origin
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: formData,
	}).catch((err) => {
		return {
			error: "An error occurred",
		};
	});
	return response;
};

export const registerLoader = makeLoader(async ({ request }) => {
	return null;
});
