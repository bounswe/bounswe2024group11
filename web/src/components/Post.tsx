import {
	RiBook2Line,
	RiBookmark2Fill,
	RiBookmark2Line,
	RiDeleteBin6Line,
	RiEditLine,
	RiHeart3Fill,
	RiHeart3Line,
	RiMore2Fill,
	RiSettings2Line,
} from "@remixicon/react";
import { Menu } from "@mantine/core";
import React, { useState } from "react";
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
	user_id: number;
	likeCount: number;
	bookmarkCount: number;
	likedBy: string[];
	isLikedBy: boolean;
	isBookmarked: boolean;
	title: string;
	content: string;
	imageSrc: string | null;
	qid: string | null;
	qtitle: string | null;
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
	const [isBookmarked2, setIsBookmarked2] = useState(false);
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
				{imageSrc && (
					<img
						className="w-full rounded-2 max-h-72 object-cover"
						src={imageSrc}
						aria-label="post picture"
					/>
				)}
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
					<likeFetcher.Form method="POST" action="/like">
						<input
							hidden
							name="is_already_liked"
							value={isLikedBy ? "true" : "false"}
						/>
						<input hidden name="post_id" value={id} onChange={idempotent} />
						<button
							type="submit"
							className="active:scale-75 transition-all duration-300 flex gap-1 items-center group hover:bg-rose-50 hover:text-rose-800 active:text-rose-900 active:bg-rose-100 px-2 py-2 rounded-full"
						>
							{isLikedBy ? (
								<RiHeart3Fill
									size={20}
									className="text-rose-500 group-hover:text-rose-500"
								/>
							) : (
								<RiHeart3Line size={20} className="text-inherit" />
							)}
						</button>
					</likeFetcher.Form>
					<Link
						className="text-slate-700 text-sm leading-7 hover:underline"
						to={{
							pathname: "./",
							search: `liked_by=${id}`,
						}}
					>
						{likeCount}
					</Link>
				</div>
				<div className="flex flex-row justify-between items-center">
					<p className="text-slate-700 text-sm leading-7">{bookmarkCount}</p>
					<bookmarkFetcher.Form method="POST" action="/bookmark">
						<input
							hidden
							name="is_already_bookmarked"
							value={isBookmarked ? "true" : "false"}
						/>
						<input
							hidden
							name="username"
							value={username}
							onChange={idempotent}
						/>
						<input hidden name="post_id" value={id} onChange={idempotent} />
						<button
							type="submit"
							onClick={(e) => {
								// e.preventDefault();
								setIsBookmarked2(!isBookmarked2);
							}}
							className="active:scale-75 transition-all duration-300 flex gap-1 items-center group hover:bg-amber-50 hover:text-amber-800 active:bg-amber-100 active:text-amber-900 py-2 px-2 rounded-full"
						>
							{isBookmarked2 ? (
								<RiBookmark2Fill
									size={20}
									className="text-amber-500 group-hover:text-amber-500"
								/>
							) : (
								<RiBookmark2Line size={20} className="text-inherit" />
							)}
						</button>
					</bookmarkFetcher.Form>
				</div>
			</div>
		</section>
	);
};

export default Post;
