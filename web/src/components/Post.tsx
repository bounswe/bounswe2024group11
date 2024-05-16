import {
	RiBook2Line,
	RiDeleteBin6Line,
	RiEditLine,
	RiHeart3Line,
	RiMore2Fill,
	RiSettings2Line,
} from "@remixicon/react";
import { Menu } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { button } from "../components/Button";

type PostProps = {
	post: {
		id: number;
		bookmarkcount: number;
		likecount: number;
		text: string;
		imgUrl: string;
		author: number;
		tag: string;
		title?: string;
	};
};

const Author = ({
	user,
}: { user: { imgUrl: string; fullname: string; username: string } }) => {
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
				<p className="text-slate-500">@{user.username}</p>
			</div>
		</div>
	);
};

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

const Post = ({
	post: { id, bookmarkcount, likecount, title, text, imgUrl, author, tag },
}: PostProps) => {
	return (
		<section className="flex max-w-lg flex-col gap-3 justify-between items-center px-5 py-4 rounded-2 border-slate-200 border">
			<div className="flex flex-row w-full justify-between items-center">
				<Author user={user} />
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
							leftSection={<RiEditLine className="text-slate-700" size={20} />}
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
			</div>
			<div className="flex gap-6 flex-col text-slate-500">
				<img
					className="w-full rounded-2 max-h-72 object-cover"
					src={imgUrl}
					aria-label="post picture"
				/>
				<div className="flex flex-col gap-3">
					{title && (
						<div className="flex flex-col gap-2">
							<h2 className="text-slate-900 font-medium text-lg">{title}</h2>
							<hr className="border-slate-200" />
						</div>
					)}
					<p className="text-slate-600 text-sm leading-6 tracking-tight">
						{text}
					</p>
					<Link
						to={`/search=${tag}`}
						className="text-cyan-800 bg-cyan-50 px-2 leading-7 hover:bg-cyan-100 active:bg-cyan-200 transition-colors rounded-full self-start"
					>
						#{tag}
					</Link>
				</div>
			</div>
			<div className="flex flex-row justify-between w-full">
				<div className="flex flex-row justify-between gap-1 items-center">
					<button
						type="button"
						className="flex gap-1 items-center group hover:bg-slate-50 px-2 rounded-full transition-colors"
					>
						<RiHeart3Line
							size={20}
							className="text-slate-700 group-hover:text-slate-900"
						/>
						<span className="text-slate-500 text-sm leading-7">
							{likecount}
						</span>
					</button>
				</div>
				<button
					type="button"
					className={button({
						intent: "primary",
						icon: "none",
						size: "small",
					})}
				>
					<RiBook2Line size={20} color="slate" />
				</button>
			</div>
		</section>
	);
};

export default Post;
