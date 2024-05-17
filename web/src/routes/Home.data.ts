import { array, nullable, number, object, safeParse, string } from "valibot";
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

// {
// 	"id": 3,
// 	"title": "Batman",
// 	"content": "Batman'in ruyasi...",
// 	"image_src": null,
// 	"qid": null,
// 	"qtitle": null,
// 	"created_at": "2024-05-16T20:34:06.105713Z",
// 	"updated_at": "2024-05-16T20:34:06.105756Z",
// 	"author": 2
// },

const postSchema = object({
	id: number(),
	title: string(),
	content: string(),
	image_src: nullable(string()),
	qid: nullable(string()),
	qtitle: nullable(string()),
	created_at: string(),
	updated_at: string(),
	author: number(),
});

export const homeLoader = makeLoader(async ({ request, params, context }) => {
	const token =
		localStorage.getItem("zenith_app_token") ||
		sessionStorage.getItem("zenith_app_token");
	console.log(token);
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
	const { output, success, issues } = safeParse(
		array(postSchema),
		responseJson,
	);
	if (!success) {
		return {
			error: "Invalid response",
		};
	}
	return output;
});
