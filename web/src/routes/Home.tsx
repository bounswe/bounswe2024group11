import {
	Container,
	TextInput,
	Select,
	Fieldset,
	Menu,
	Modal,
	Textarea,
	Button,
} from "@mantine/core";
import "@mantine/core/styles.css";
import {
	Form,
	Link,
	useFetcher,
	useLocation,
	useSearchParams,
	useSubmit,
} from "react-router-dom";
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
import { WikiWidget } from "../components/WikiWidget";
import { useState } from "react";
import type { homeLoader } from "./Home.data";

export const post: Post = {
	id: 8,
	username: "username1",
	user_id: 2,
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

const POST_COUNT = 5;

export const Home = () => {
	const user = useRouteLoaderData<typeof authLoader>("auth");
	const [semanticData, setSemanticData] = useState<Record<string, string>>({
		Pseudonym: "Spider-Man",
		"Real Name": "Peter Parker",
		Universe: "Marvel",
	});
	const location = useLocation();
	const isLikesOpen = location.search.includes("liked_by");
	const isEditOpen = location.search.includes("edit");
	const [_, setSearchParams] = useSearchParams();
	const [postCount, setPostCount] = useState(POST_COUNT);
	const posts = useLoaderData<typeof homeLoader>();

	return (
		<div className="relative z-10">
			<Navbar />
			<Container className="grid grid-cols-7 gap-6 py-10 items-start max-w-7xl">
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
						{"error" in posts ? (
							<p className="text-slate-500">
								Oops, there was an error fetching the posts.
							</p>
						) : (
							<>
								{posts
									.sort((a, b) => {
										return (
											new Date(b.created_at).getTime() -
											new Date(a.created_at).getTime()
										);
									})
									.slice(0, postCount)
									.map((post) => (
										<Post
											key={post.id}
											post={{
												bookmarkCount: 3,
												content: post.content,
												createdAt: post.created_at,
												id: post.id,
												imageSrc: post.image_src,
												isBookmarked: false,
												isLikedBy: post.likedBy.includes(
													user?.id.toString() || "",
												),
												likeCount: 3,
												likedBy: [],
												qid: post.qid,
												qtitle: post.qtitle,
												title: post.title,
												updatedAt: post.updated_at,
												user_id: post.author,
												username: "username1",
											}}
											isOwner={post.author === user?.id}
										/>
									))}
								{posts.length > postCount && (
									<Button
										onClick={() =>
											setPostCount((count) =>
												Math.min(count + POST_COUNT, posts.length),
											)
										}
										variant="link"
										color="gray"
										fullWidth
										className={button({ intent: "primary" })}
									>
										<span className={buttonInnerRing({ intent: "primary" })} />
										Load more
									</Button>
								)}
							</>
						)}
					</div>
				</main>
				<WikiWidget
					semanticData={semanticData}
					className="col-span-2 sticky top-32"
				/>
			</Container>
			<Modal
				opened={isLikesOpen}
				onClose={() => {
					setSearchParams((params) => {
						const searchParams = new URLSearchParams(params);
						searchParams.delete("liked_by");
						return searchParams.toString();
					});
					console.log("closed");
				}}
				withCloseButton={true}
			>
				Modal without header, press escape or click on overlay to close
			</Modal>
			<NewPost />
		</div>
	);
};
