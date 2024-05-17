import {
	any,
	array,
	boolean,
	nullable,
	number,
	object,
	parse,
	safeParse,
	string,
} from "valibot";
import type { User } from "../types/user";
import { makeLoader } from "react-router-typesafe";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const homeAction = async ({ request }: { request: Request }) => {
	console.log("Home Action");
	const queryData = await request.formData();
	const query = queryData.get("query");
	const formData = new FormData();
	formData.append("keyword", `born in ${query}`);
	const response = await fetch(`${VITE_BACKEND_URL}/user/search/`, {
		method: "POST",
		headers: {
			Accept: "application/json",
		},
		body: formData,
	});
	if (!response.ok) {
		switch (response.status) {
			case 400:
				return {
					error: "Invalid request",
				};
			case 401:
				return {
					error: "Unauthorized",
				};
			default:
				return {
					error: "Unknown error",
				};
		}
	}
	const responseJson = await response.json();
	console.log(responseJson);
	return responseJson;
};

const postSchema = object({
	author: number(),
	author_profile: any(),
	bookmark_count: number(),
	content: string(),
	created_at: string(),
	id: number(),
	image_src: nullable(string()),
	is_bookmarked: boolean(),
	is_following: boolean(),
	is_liked: boolean(),
	like_count: number(),
	title: string(),
	qid: nullable(string()),
	qtitle: nullable(string()),
	updated_at: string(),
	liked_by: nullable(array(string())),
});

export const homeLoader = makeLoader(async ({ request, params, context }) => {
	const token =
		localStorage.getItem("zenith_app_token") ||
		sessionStorage.getItem("zenith_app_token");
	const response = await fetch(`${VITE_BACKEND_URL}/api/v2/posts/`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		switch (response.status) {
			case 400:
				return {
					error: "Invalid request",
				};
			case 401:
				return {
					error: "Unauthorized",
				};
			default:
				return {
					error: "Unknown error",
				};
		}
	}
	const responseJson = await response.json();
	console.log(responseJson);
	// const output = parse(array(postSchema), responseJson);
	// console.log(output);

	return responseJson as any;
});
