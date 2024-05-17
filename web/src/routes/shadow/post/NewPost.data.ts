import { makeAction } from "react-router-typesafe";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const newPostAction = makeAction(async ({ request }) => {
	console.log("likeAction");
	const formData = await request.formData();
	const title = formData.get("title");
	const content = formData.get("content");
	const qid = formData.get("qid");
	const imageSrc = formData.get("image_src");
	const token =
		localStorage.getItem("zenith_app_token") ||
		sessionStorage.getItem("zenith_app_token");
	const response = await fetch(`${VITE_BACKEND_URL}/api/v2/posts/`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			title,
			content,
			qid,
			image_src: imageSrc,
		}),
	});

	const responseJson = await response.json();

	if (!response.ok) {
		responseJson;
	}

	return null;
});
