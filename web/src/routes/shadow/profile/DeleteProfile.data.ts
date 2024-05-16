import { makeLoader } from "react-router-typesafe";

export const deleteProfileAction = makeLoader(
	async ({ request, params, context }) => {
		const formData = await request.formData();
		const username = "a";
		const token = "b";
		console.log("Deleting user profile");
		console.log(`Username: ${username}`);
		console.log(`Token: ${token}`);
		return null;
		// Request to delete the user profile
	},
);
