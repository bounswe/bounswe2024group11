import { makeAction } from "react-router-typesafe";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const likeAction = makeAction(async ({ request }) => {
	console.log("likeAction");
	const formData = await request.formData();
	const post = Number(formData.get("post_id"));
	const token =
		localStorage.getItem("zenith_app_token") ||
		sessionStorage.getItem("zenith_app_token");
	const isAlreadyLiked = formData.get("is_already_liked") === "true";
	const response = await fetch(`${VITE_BACKEND_URL}/api/v2/likes/`, {
		method: isAlreadyLiked ? "DELETE" : "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			post,
		}),
	});

	const responseJson = await response.json();

	if (!response.ok) {
		responseJson;
	}

	return null;
});
