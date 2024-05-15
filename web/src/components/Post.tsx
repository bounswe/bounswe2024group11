import {
	RiBook2Line,
	RiDeleteBin6Line,
	RiEditLine,
	RiHeart3Line,
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
		title: string;
		text: string;
		imgUrl: string;
		author: number;
		tag: string;
	};
};

const Post = ({
	post: { id, bookmarkcount, likecount, title, text, imgUrl, author, tag },
}: PostProps) => {
	// user will be retrieved by using author id by making a request to the backend
	const user = {
		email: "john@email.com",
		fullname: "John Doe",
		username: "@johnDoe",
		post: 41,
		followers: 100,
		following: 5432,
		imgUrl:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSigaKbxrqZF0j7NeJHjWGvbpII2kPR5J7QNtpf_bP4aw&s",
	};
	return (
		<div className="flex max-w-md flex-col gap-3 justify-between items-center px-6 py-4 rounded-3 border-slate-200 border">
			<div className="flex flex-row w-full justify-between items-center">
				<div className="flex flex-row gap-3 w-full">
					<img
						src={user.imgUrl}
						alt="User"
						width={40}
						height={40}
						className="rounded-full"
					/>
					<div className="w-full flex flex-col gap-1 items-stretch justify-between">
						<Link to="/profile" className="text-slate-950">
							{user.fullname}
						</Link>
						<h1 className="text-slate-500">{user.username}</h1>
					</div>
				</div>
				<Menu position="right-start">
					<Menu.Target>
						<button
							type="button"
							style={{ height: 32, width: 32 }}
							className={button({
								intent: "primary",
								icon: "none",
								size: "medium",
							})}
						>
							A
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
			<h3 className="text-slate-950 text-lg">{title}</h3>
			<div className="flex gap-4 flex-col text-slate-500">
				<img
					className="w-full rounded-3"
					src={imgUrl}
					aria-label="post picture"
				/>
				<p>{`${text} #${tag}`}</p>
			</div>
			<div className="flex flex-row justify-between w-full">
				<div className="flex flex-row justify-between gap-1 items-center">
					<button
						type="button"
						className={button({
							intent: "primary",
							icon: "none",
							size: "small",
						})}
					>
						<RiHeart3Line size={20} color="slate" />
					</button>
					<div className="text-slate-500">{likecount}</div>
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
		</div>
	);
};

export default Post;
