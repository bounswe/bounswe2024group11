import { RiContactsBook2Line } from "@remixicon/react";
import { List } from "postcss/lib/list";
import React from "react";

export type PostProps = {
	id: number;
	bookmarkcount: number;
	likecount: number;
	title: string;
	text: string;
	image: string;
	author: number;
	tag: string;
};

const Post = ({
	id,
	bookmarkcount,
	likecount,
	title,
	text,
	image,
	author,
	tag,
}: PostProps) => {
	// user will be retrieved by using author id by making a request to the backend
	const user = {
		email: "john@email.com",
		fullname: "John Doe",
		username: "@johnDoe",
		post: 41,
		followers: 100,
		following: 5432,
		picUrl:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSigaKbxrqZF0j7NeJHjWGvbpII2kPR5J7QNtpf_bP4aw&s",
	};
	return (
		<div className="flex max-w-md flex-col gap-3 justify-between items-center  px-5 py-3 rounded-3 border-slate-200 border-2 ">
			<div className="flex flex-row gap-3 w-full">
				<img
					src={user.picUrl}
					alt="User"
					width={40}
					height={40}
					className="rounded-full"
				/>
				<div className="w-full flex flex-col gap-1 items-stretch justify-between">
					<h1 className="text-slate-950">{user.fullname}</h1>
					<h1 className="text-slate-500">{user.username}</h1>
				</div>
			</div>
			<h1 className="text-slate-950 text-xl">{title}</h1>
			<div className="flex gap-4 flex-col text-slate-500">
				<img
					className="w-full rounded-3"
					src={image}
					aria-label="post picture"
				/>
				<p>{`${text} #${tag}`}</p>
			</div>
			<div className="flex flex-row justify-between w-full">
				<div className="flex flex-row justify-between gap-1">
					<img src="./heart.svg" alt="Link Icon" width={20} height={20} />
					<div className="text-slate-500">{likecount}</div>
				</div>
				<img src="./bookmark.svg" alt="Link Icon" width={20} height={20} />
			</div>
		</div>
	);
};

export default Post;
