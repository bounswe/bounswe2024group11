import {
	Container,
	TextInput,
	Select,
	Fieldset,
	Menu,
	Modal,
	Textarea,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { Form, Link, useFetcher, useSubmit } from "react-router-dom";
import { href } from "../router";
import { button, buttonInnerRing } from "../components/Button";
import {
	RiAddFill,
	RiArrowDropDownLine,
	RiBookmark2Line,
	RiLogoutCircleLine,
	RiQuillPenLine,
	RiSearch2Line,
	RiSettings2Line,
} from "@remixicon/react";
import { useRouteLoaderData } from "react-router-typesafe";
import { imageLink } from "../components/ImageLink";
import Post from "../components/Post";
import { useDisclosure } from "@mantine/hooks";
import type { authLoader } from "./global/auth.data";
import { NewPost } from "../components/NewPost";
import { Navbar } from "../components/Navbar";

const post: Post = {
	id: 4,
	username: "username1",
	user_id: "2",
	likeCount: 0,
	bookmarkCount: 0,
	likedBy: [],
	isLikedBy: false,
	isBookmarked: false,
	title: "title4",
	content: "content4",
	imageSrc:
		"https://www.bucodecomp.com/_next/image?url=%2Fimg%2Fteam%2Fumit.jpeg&w=256&q=75",
	qid: "Q79037",
	qtitle: "qtitle4",
	createdAt: "2024-05-15T15:40:28.307213Z",
	updatedAt: "2024-05-15T15:40:28.307213Z",
};

export const Home = () => {
	const suggestionsFetcher = useFetcher();
	const submit = useSubmit();
	const user = useRouteLoaderData<typeof authLoader>("auth");
	return (
		<div className="relative z-10">
			<Navbar />
			<div>
				<Container className="flex flex-col justify-between gap-4 py-10 items-center max-w-lg">
					<main className="flex flex-col gap-8 w-full">
						<div className="flex flex-col gap-1">
							<h1 className="text-left w-full text-slate-950 text-xl font-medium">
								Feed
							</h1>
							<p className="text-sm text-slate-500 text-pretty">
								What have you been up to?
							</p>
						</div>
						<div className="flex flex-col justify-between gap-8">
							<Post post={post} isOwner />
							<Post post={post} />
							<Post post={post} isOwner />
							<Post post={post} />
							<Post post={post} />
							<Post post={post} />
							<Post post={post} />
							<Post post={post} />
						</div>
					</main>
				</Container>
			</div>
			<NewPost />
		</div>
	);
};
