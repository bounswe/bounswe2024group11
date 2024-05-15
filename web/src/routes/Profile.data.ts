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
		picUrl:
			"https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1715520071~exp=1715520671~hmac=ffad0c38a66747334e85982464792aa4d255f65fa0de3d902ec01499171cffd5",
	};
	return {
		profile,
	};
});
