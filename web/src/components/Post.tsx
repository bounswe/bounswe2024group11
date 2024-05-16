import {
	RiBook2Line,
	RiBookmark2Line,
	RiDeleteBin6Line,
	RiEditLine,
	RiHeart3Line,
	RiMore2Fill,
	RiSettings2Line,
} from "@remixicon/react";
import { Menu } from "@mantine/core";
import React from "react";
import { Link, useFetcher } from "react-router-dom";
import { button, buttonInnerRing } from "../components/Button";
import { getRelativeTime } from "../utils/date";
import { idempotent } from "../utils/form";

const user = {
	email: "john@email.com",
	fullname: "Ümit Can Evleksiz",
	username: "ucedesign",
	post: 41,
	followers: 100,
	following: 5432,
	imgUrl:
		"https://www.bucodecomp.com/_next/image?url=%2Fimg%2Fteam%2Fumit.jpeg&w=256&q=75",
};

const Author = ({
	user,
}: {
	user: { imgUrl: string; fullname: string; username: string };
}) => {
	return (
		<div className="flex flex-row gap-3 w-full items-center py-2">
			<Link
				to={`/profile/${user.username}`}
				className="rounded-full overflow-hidden hover:ring-2 ring-transparent hover:ring-offset-1 hover:ring-slate-100 transition-all ring-offset-0 ring-0"
			>
				<img
					src={user.imgUrl}
					alt="User"
					width={48}
					height={48}
					className="w-12 h-12"
				/>
			</Link>
			<div className="flex flex-col">
				<Link
					to={`/profile/${user.username}`}
					className="text-slate-900 font-medium hover:underline underline-offset-2"
				>
					{user.fullname}
				</Link>
				<p className="text-slate-500 text-sm">@{user.username}</p>
			</div>
		</div>
	);
};

type Post = {
	id: number;
	username: string;
	user_id: string;
	likeCount: number;
	bookmarkCount: number;
	likedBy: string[];
	isLikedBy: boolean;
	isBookmarked: boolean;
	title: string;
	content: string;
	imageSrc: string;
	qid: string;
	qtitle: string;
	createdAt: string;
	updatedAt: string;
};

type PostProps = {
	post: Post;
	isOwner?: boolean;
};

const Post = ({
	post: {
		id,
		username,
		likeCount,
		bookmarkCount,
		title,
		content,
		imageSrc,
		qid,
		qtitle,
		isBookmarked,
		isLikedBy,
		createdAt,
		updatedAt,
	},
	isOwner = false,
}: PostProps) => {
	const followFetcher = useFetcher();
	const likeFetcher = useFetcher();
	const bookmarkFetcher = useFetcher();
	return (
		<section className="flex flex-col gap-3 justify-between items-stretch px-5 py-4 rounded-2 border-slate-200 border w-full">
			<div className="flex flex-row justify-between items-center">
				<Author
					user={{
						imgUrl:
							"https://www.bucodecomp.com/_next/image?url=%2Fimg%2Fteam%2Fumit.jpeg&w=256&q=75",
						fullname: "Ümit Can Evleksiz",
						username,
					}}
				/>
				{isOwner ? (
					<Menu position="right-start">
						<Menu.Target>
							<button
								type="button"
								className={button({ intent: "tertiary", icon: "only" })}
							>
								<RiMore2Fill size={16} className="text-slate-70" />
							</button>
						</Menu.Target>
						<Menu.Dropdown className="p-2">
							<Menu.Item
								leftSection={
									<RiEditLine className="text-slate-700" size={20} />
								}
							>
								Edit
							</Menu.Item>
							<Menu.Item
								color="red"
								leftSection={
									<RiDeleteBin6Line
										color="red"
										className="text-slate-700"
										size={20}
									/>
								}
							>
								Delete Post
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				) : (
					<followFetcher.Form method="POST" action="/follow_profile">
						<input
							hidden
							name="username"
							value={username}
							onChange={idempotent}
						/>
						<button type="submit" className={button({ intent: "primary" })}>
							<span className={buttonInnerRing({ intent: "primary" })} />
							Follow
						</button>
					</followFetcher.Form>
				)}
			</div>
			<div className="flex gap-6 flex-col text-slate-500">
				<img
					className="w-full rounded-2 max-h-72 object-cover"
					src={imageSrc}
					aria-label="post picture"
				/>
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-2">
						<div className="flex justify-between items-center">
							<h2 className="text-slate-900 font-medium text-lg">{title}</h2>
							<p className="text-slate-500 text-xs">
								Posted {getRelativeTime(new Date(createdAt))}
							</p>
						</div>
						<hr className="border-slate-200" />
					</div>

					<p className="text-slate-600 text-sm leading-6 tracking-tight">
						{content}
					</p>
					<Link
						to={`/search=${qtitle}`}
						className="text-cyan-800 bg-cyan-50 px-2 leading-7 hover:bg-cyan-100 active:bg-cyan-200 transition-colors rounded-full self-start"
					>
						#{qtitle}
					</Link>
				</div>
			</div>
			<div className="flex flex-row justify-between w-full">
				<div className="flex flex-row justify-between items-center">
					<likeFetcher.Form method="POST" action="/like_post">
						<input
							hidden
							name="username"
							value={username}
							onChange={idempotent}
						/>
						<input hidden name="post_id" value={id} onChange={idempotent} />
						<button
							type="submit"
							className="flex gap-1 items-center group hover:bg-slate-50 px-2 py-2 rounded-full transition-colors"
						>
							<RiHeart3Line
								size={20}
								className="text-slate-700 group-hover:text-slate-900"
							/>
						</button>
					</likeFetcher.Form>
					<Link
						className="text-slate-700 text-sm leading-7 hover:underline"
						to={`?liked_by=${id}`}
					>
						{likeCount}
					</Link>
				</div>
				<div className="flex flex-row justify-between items-center">
					<Link
						to={`?bookmarked_by=${id}`}
						className="text-slate-700 text-sm leading-7 hover:underline"
					>
						{bookmarkCount}
					</Link>
					<bookmarkFetcher.Form method="POST" action="/bookmark_post">
						<input
							hidden
							name="username"
							value={username}
							onChange={idempotent}
						/>
						<input hidden name="post_id" value={id} onChange={idempotent} />
						<button
							type="submit"
							className="flex gap-1 items-center group hover:bg-slate-50 py-2 px-2 rounded-full transition-colors"
						>
							<RiBookmark2Line size={20} className="text-slate-700" />
						</button>
					</bookmarkFetcher.Form>
				</div>
			</div>
		</section>
	);
};

export default Post;
