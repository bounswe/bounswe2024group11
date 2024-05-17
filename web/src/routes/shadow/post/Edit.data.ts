import { makeAction } from "react-router-typesafe";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const editAction = makeAction(async ({ request }) => {
	console.log("likeAction");
	const formData = await request.formData();
	const postId = formData.get("post_id");
	const title = formData.get("title");
	const content = formData.get("content");
	const qid = formData.get("qid");
	const imageSrc = formData.get("image_src");
	const token =
		localStorage.getItem("zenith_app_token") ||
		sessionStorage.getItem("zenith_app_token");
	const endpoint = "edit";

	const response = await fetch(
		`${VITE_BACKEND_URL}/api/v2/post/${endpoint}/${postId}/`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				post_id: postId,
				title,
				content,
				qid,
				image_src: imageSrc,
			}),
		},
	);

	const responseJson = await response.json();

	if (!response.ok) {
		responseJson;
	}

	return null;
});
