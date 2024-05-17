import {
	Input,
	array,
	boolean,
	nullable,
	number,
	object,
	parse,
	safeParse,
	string,
} from "valibot";
import type {
	LoginSuccess,
	Profile,
	RegisterSuccess,
	User,
} from "../types/user";
import { makeAction, makeLoader } from "react-router-typesafe";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const profileAction = makeAction(async ({ request, params }) => {
	const username = params.username;
	if (!username) throw new Error("User id is required");
	const formData = await request.formData();
	const bio = formData.get("bio") as string;
	return null;
});

const profileSchema = object({
	id: number(),
	username: string(),
	email: string(),
	fullname: string(),
	picture: nullable(string()),
	biography: nullable(string()),
});

const postSchema = object({
	id: number(),
	username: string(),
	user_id: string(),
	like_count: number(),
	bookmark_count: number(),
	liked_by: array(string()),
	is_liked: boolean(),
	is_bookmarked: boolean(),
	is_following: boolean(),
	title: string(),
	content: string(),
	image_src: nullable(string()),
	qid: nullable(string()),
	qtitle: nullable(string()),
	created_at: string(),
	updated_at: string(),
});

const fullProfileSchema = object({
	id: number(),
	is_following: boolean(),
	posts: array(postSchema),
	followers: array(string()),
	followings: array(string()),
	follower_count: number(),
	following_count: number(),
	post_count: number(),
	picture: nullable(string()),
	biography: nullable(string()),
	owner: number(),
});

export const profileLoader = makeLoader(async ({ request, params }) => {
	const username = params.username;
	if (!username) throw new Error("Username is required");
	const token =
		localStorage.getItem("zenith_app_token") ||
		sessionStorage.getItem("zenith_app_token");

	const response = await fetch(
		`${VITE_BACKEND_URL}/api/v2/user-profile/${username}/`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		},
	);

	const responseJson = await response.json();

	if (!response.ok) {
		return {
			error: responseJson.error,
		};
	}

	const output = parse(profileSchema, responseJson);

	const response2 = await fetch(
		`${VITE_BACKEND_URL}/api/v2/profiles/${output.id.toString()}`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		},
	);

	const responseJson2 = await response2.json();

	if (!response2.ok) {
		return {
			error: responseJson2.error,
		};
	}

	const output2 = parse(fullProfileSchema, responseJson2);

	return {
		userProfile: output,
		profile: output2,
	};
});
