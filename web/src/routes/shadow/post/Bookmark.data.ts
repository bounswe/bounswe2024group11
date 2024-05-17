import { makeAction } from "react-router-typesafe";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const bookmarkAction = makeAction(async ({ request }) => {
	console.log("bookmark action");
	const formData = await request.formData();
	const postId = formData.get("post_id");
	const isAlreadyBookmarked = true;
	const token =
		localStorage.getItem("zenith_app_token") ||
		sessionStorage.getItem("zenith_app_token");
	const response = await fetch(`${VITE_BACKEND_URL}/api/v2/bookmarks/`, {
		method: isAlreadyBookmarked ? "DELETE" : "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({ post_id: postId }),
	});

	const responseJson = await response.json();

	if (!response.ok) {
		responseJson;
	}

	return null;
});
