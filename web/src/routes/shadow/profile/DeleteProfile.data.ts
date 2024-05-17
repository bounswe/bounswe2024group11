import { makeLoader } from "react-router-typesafe";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const deleteProfileAction = makeLoader(async ({ request }) => {
	const formData = await request.formData();
	const userId = formData.get("user_id");
	const token =
		localStorage.getItem("zenith_app_token") ||
		sessionStorage.getItem("zenith_app_token");

	const response = await fetch(
		`${VITE_BACKEND_URL}/api/v2/profile/delete/${userId}/`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ user_id: userId }),
		},
	);

	const responseJson = await response.json();

	if (!response.ok) {
		responseJson;
	}

	return null;
});
