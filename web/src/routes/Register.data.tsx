import { makeLoader } from "react-router-typesafe";

const BACKEND_URL = import.meta.env.BACKEND_URL;

export const registerAction = async ({ request }: { request: Request }) => {
	const formData = await request.formData();
	const response = await fetch(`${BACKEND_URL}/user/signup`, {
		method: "POST",
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

export const registerLoader = makeLoader(async ({ request }) => {
	return null;
});
