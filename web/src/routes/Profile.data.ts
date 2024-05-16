import type {
	LoginSuccess,
	Profile,
	RegisterSuccess,
	User,
} from "../schema/user";
import { makeAction, makeLoader, redirect } from "react-router-typesafe";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const profileAction = makeAction(async ({ request, params }) => {
	const username = params.username;
	if (!username) throw new Error("User id is required");
	const formData = await request.formData();
	const bio = formData.get("bio") as string;
	return null;
});

export const profileLoader = makeLoader(async ({ request, params }) => {
	const username = params.username;
	if (!username) throw new Error("User id is required");
	const profile: Profile = {
		username: username,
		email: `${username}@gmail.com`,
		fullname: username?.toLocaleUpperCase(),
		bio: "I am a developer",
		post: 41,
		followers: 100,
		following: 5432,
		picUrl: "https://i.ibb.co/c1fGmZZ/post-image.png",
	};
	return {
		profile,
	};
});
