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
import { useLoaderData, useRouteLoaderData } from "react-router-typesafe";
import { imageLink } from "../components/ImageLink";
import Post from "../components/Post";
import { useDisclosure } from "@mantine/hooks";
import type { authLoader } from "./global/auth.data";
import { NewPost } from "../components/NewPost";
import { Navbar } from "../components/Navbar";
import type { bookmarksLoader } from "./Bookmarks.data";

export const Bookmarks = () => {
	const { posts } = useLoaderData<typeof bookmarksLoader>();
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
								Bookmark
							</h1>
							<p className="text-sm text-slate-500 text-pretty">
								What have you bookmarked?
							</p>
						</div>
						<div className="flex flex-col justify-between gap-8">
							{posts.map((post, i) => (
								<Post
									key={`post_${i + 1}`}
									post={post.post}
									isOwner={post.isOwner}
								/>
							))}
						</div>
					</main>
				</Container>
			</div>
			<NewPost />
		</div>
	);
};
