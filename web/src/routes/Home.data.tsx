import { makeLoader } from "react-router-typesafe";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const homeAction = async ({ request }: { request: Request }) => {
	console.log("homeAction");
	const formData = await request.formData();
	const response = await fetch(`${BACKEND_URL}/user/search`, {
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

export const homeLoader = makeLoader(async ({ request }) => {
	console.log("homeLoader");
	return null;
});
