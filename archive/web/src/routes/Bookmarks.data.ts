import type Post from "../components/Post";
import type {
	LoginSuccess,
	Profile,
	RegisterSuccess,
	User,
} from "../types/user";
import { makeAction, makeLoader, redirect } from "react-router-typesafe";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const post: Post = {
	id: 4,
	username: "username1",
	user_id: 2,
	likeCount: 0,
	bookmarkCount: 0,
	likedBy: [],
	isLikedBy: false,
	isBookmarked: true,
	title: "title4",
	content: "content4",
	imageSrc:
		"https://www.bucodecomp.com/_next/image?url=%2Fimg%2Fteam%2Fumit.jpeg&w=256&q=75",
	qid: "Q79037",
	qtitle: "qtitle4",
	createdAt: "2024-05-15T15:40:28.307213Z",
	updatedAt: "2024-05-15T15:40:28.307213Z",
};

export const bookmarksLoader = makeLoader(async ({ request, params }) => {
	const username = params.username;
	console.log("Bookmark Loader");
	if (!username) throw new Error("User id is required");
	const posts: { post: Post; isOwner: boolean }[] = [
		{ post, isOwner: true },
		{ post, isOwner: true },
		{ post, isOwner: false },
		{ post, isOwner: false },
	];
	return {
		posts,
	};
});
