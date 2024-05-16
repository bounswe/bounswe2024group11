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
import { WikiWidget } from "../components/WikiWidget";
import { useState } from "react";

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
	imageSrc: "https://i.ibb.co/c1fGmZZ/post-image.png",
	qid: "Q79037",
	qtitle: "qtitle4",
	createdAt: "2024-05-15T15:40:28.307213Z",
	updatedAt: "2024-05-15T15:40:28.307213Z",
};

export const Home = () => {
	const suggestionsFetcher = useFetcher();
	const submit = useSubmit();
	const user = useRouteLoaderData<typeof authLoader>("auth");
	const [semanticData, setSemanticData] = useState<Record<string, string>>({
		Pseudonym: "Spider-Man",
		"Real Name": "Peter Parker",
		Universe: "Marvel",
	});
	return (
		<div className="relative z-10">
			<Navbar />
			<Container className="grid grid-cols-7 gap-6 py-10 items-stretch max-w-7xl">
				<main className="flex flex-col gap-8 w-full items-stretch col-start-3 col-span-3">
					<div className="flex flex-col gap-1">
						<h1 className="text-left w-full text-slate-950 text-xl font-medium">
							Feed
						</h1>
						<p className="text-sm text-slate-500 text-pretty">
							What have you been up to?
						</p>
					</div>
					<div className="flex flex-col items-stretch justify-between gap-8 self-stretch">
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
				<WikiWidget
					semanticData={semanticData}
					className="col-span-2 sticky top-32"
				/>
			</Container>

			<NewPost />
		</div>
	);
};
