import {
	TextInput,
	Container,
	Menu,
	Box,
	Modal,
	Textarea,
} from "@mantine/core";
import {
	RiUser3Line,
	RiBookmark2Line,
	RiSearch2Line,
	RiMailLine,
	RiLink,
	RiLogoutCircleLine,
	RiSettings2Line,
} from "@remixicon/react";
import { useSubmit, useFetcher } from "react-router-dom";
import { useLoaderData, useRouteLoaderData } from "react-router-typesafe";
import { button, buttonInnerRing } from "../components/Button";
import { useActionData } from "react-router-typesafe";
import type { loginAction } from "./Login.data";
import type { profileLoader } from "./Profile.data";
import type { authLoader } from "./global/auth.data";
import { Navbar } from "../components/Navbar";
import { idempotent } from "../utils/form";
import { useState } from "react";
import Post from "../components/Post";
import { post } from "./Home";
import { WikiWidget } from "../components/WikiWidget";

const Avatar = ({
	picUrl,
	fullname,
	username,
}: { picUrl?: string | null; fullname: string; username: string }) => {
	return (
		<div className="flex flex-col items-center gap-6">
			{picUrl ? (
				<div className="flex flex-col items-stretch justify-stretch ring-1 overflow-hidden ring-offset-1 ring-slate-100 border-slate-100 border rounded-full w-20 h-20">
					<img
						src={picUrl}
						alt="User Icon"
						width={80}
						height={80}
						className="w-full h-full object-cover"
					/>
				</div>
			) : (
				<div className="w-20 h-20 rounded-full bg-cyan-100 text-cyan-900 flex items-center justify-center ">
					{fullname}
				</div>
			)}
			<div className="flex flex-col items-center gap-1">
				<p className="text-2xl font-medium font-display text-slate-900">
					{fullname}
				</p>
				<p className="text-center text-slate-500">@{username}</p>
			</div>
		</div>
	);
};

export const Profile = () => {
	const { profile } = useLoaderData<typeof profileLoader>();
	const [semanticData, setSemanticData] = useState<Record<string, string>>({
		Pseudonym: "Spider-Man",
		"Real Name": "Peter Parker",
		Universe: "Marvel",
	});
	const user = useRouteLoaderData<typeof authLoader>("auth");
	const isOwner = user !== null && user.username === profile.username;
	const submit = useSubmit();
	const [isFollowing, setIsFollowing] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [isBlocked, setIsBlocked] = useState(false);
	const actionData = useActionData<typeof loginAction>();
	const isAuthError = actionData && "error" in actionData;
	const deleteFetcher = useFetcher();
	const bioFetcher = useFetcher();
	const infoFetcher = useFetcher();
	const blockFetcher = useFetcher();
	const unblockFetcher = useFetcher();
	const followFetcher = useFetcher();
	const unfollowFetcher = useFetcher();
	const muteFetcher = useFetcher();
	const unmuteFetcher = useFetcher();
	return (
		<div className="relative">
			<Navbar />
			<Container className="max-w-7xl flex flex-col py-10 pb-16">
				{isOwner ? (
					<div className="flex border border-slate-200 rounded-3 flex-col items-center self-center p-7 gap-6 max-w-xl w-full">
						<Avatar
							picUrl={profile.picUrl}
							fullname={profile.fullname}
							username={profile.username}
						/>
						<div className="flex flex-col items-center gap-3 w-full">
							<div className="flex flex-col items-center gap-1 self-stretch">
								<bioFetcher.Form
									className="w-full"
									method="POST"
									action="/update_bio"
								>
									<Textarea
										name="bio"
										defaultValue={profile.bio}
										onBlur={(e) =>
											bioFetcher.submit(e.currentTarget.form, {
												action: "/update_bio",
												navigate: false,
												method: "POST",
											})
										}
										className="text-slate-500 w-full leading-7"
										autosize
										minRows={2}
										maxRows={4}
									/>
								</bioFetcher.Form>
							</div>
						</div>
						<div className="flex flex-row items-center justify-stretch w-full">
							<div className="border-r-slate-200 border-r pr-2.5 pl-2.5 flex flex-col gap-1 items-center w-full">
								<h3 className="text-base font-medium font-display text-slate-900">
									{profile.post}
								</h3>
								<p className="text-center text-slate-500 text-xs">Posts</p>
							</div>
							<div className="border-r-slate-200 border-r pr-2.5 pl-2.5 flex flex-col gap-1 items-center w-full">
								<h3 className="text-base font-medium font-display text-slate-900">
									{profile.followers}
								</h3>
								<p className="text-center text-slate-500 text-xs">Follower</p>
							</div>
							<div className="border-r-slate-200 pr-2.5 pl-2.5 flex flex-col gap-1 items-center w-full">
								<h3 className="text-base font-medium font-display text-slate-900">
									{profile.following}
								</h3>
								<p className="text-center text-slate-500 text-xs">Following</p>
							</div>
						</div>
						<infoFetcher.Form
							className="w-full flex flex-col gap-6"
							method="POST"
							action="/update_profile"
						>
							<div className="flex flex-col border-slate-200 border rounded-3">
								<div className="flex flex-row items-center justify-stretch w-full gap-4 p-4">
									<div className="w-40 flex flex-row items-center pr-6 border-r-slate-200 gap-2">
										<RiUser3Line className="text-slate-600" size={20} />
										<p className="text-base font-display text-slate-900 leading-6">
											Full Name
										</p>
									</div>
									<TextInput
										className="flex-1"
										defaultValue={user?.username}
										type="text"
										required
										name="fullname"
										aria-label="Full Name"
										error={isAuthError}
										aria-errormessage="Invalid password"
									/>
								</div>
								<hr />
								<div className="w-full flex flex-row items-center justify-stretch gap-4 p-4">
									<div className="w-40 flex flex-row items-center pr-6 border-r-slate-200 gap-2">
										<RiMailLine className="text-slate-600" size={20} />
										<p className="text-base font-display text-slate-900 leading-6">
											Email
										</p>
									</div>
									<TextInput
										className="flex-1"
										defaultValue={profile.email}
										type="text"
										required
										name="email"
										aria-label="Email"
										error={isAuthError}
										aria-errormessage="Invalid password"
									/>
								</div>
								<hr />
								<div className="flex flex-row items-center justify-stretch w-full gap-4 p-4">
									<div className="w-40 flex flex-row items-center pr-6 border-r-slate-200 gap-2">
										<RiUser3Line size={20} className="text-slate-600" />
										<p className="text-base font-display text-slate-900 leading-6">
											Username
										</p>
									</div>
									<TextInput
										className="flex-1"
										defaultValue={profile.username}
										type="text"
										required
										name="username"
										aria-label="Username"
										error={isAuthError}
										aria-errormessage="Invalid password"
									/>
								</div>
								<hr />
								<div className="flex flex-row items-center justify-stretch w-full gap-4 p-4">
									<div className="w-40 flex flex-row items-center pr-6 border-r-slate-200 gap-2">
										<RiLink className="text-slate-600" size={20} />
										<p className="text-base font-display text-slate-900 leading-6">
											Avatar URL
										</p>
									</div>
									<TextInput
										className="flex-1"
										defaultValue={profile.picUrl}
										type="text"
										required
										name="picUrl"
										aria-label="profile picture url"
										error={isAuthError}
										aria-errormessage="Invalid password"
									/>
								</div>
							</div>
							<button type="submit" className={button({ intent: "secondary" })}>
								<div className={buttonInnerRing({ intent: "secondary" })} />
								<span>Save</span>
							</button>
							<hr />
						</infoFetcher.Form>
						<deleteFetcher.Form
							action="/delete_profile"
							method="POST"
							className="w-full items-stretch flex flex-col"
						>
							<input hidden name="username" defaultValue={profile.username} />
							<button
								type="submit"
								className={button({ intent: "destructive" })}
							>
								<div className={buttonInnerRing({ intent: "secondary" })} />
								<span>Delete Account</span>
							</button>
						</deleteFetcher.Form>
					</div>
				) : (
					<div className="flex border bg-white border-slate-200 rounded-3 flex-col items-center self-center p-7 gap-6 max-w-xl w-full">
						<Avatar
							picUrl={profile.picUrl}
							fullname={profile.fullname}
							username={profile.username}
						/>
						<div className="flex flex-row items-center justify-stretch w-full">
							<div className="border-r-slate-200 border-r pr-2.5 pl-2.5 flex flex-col gap-1 items-center w-full">
								<h3 className="text-base font-medium font-display text-slate-900">
									{profile.post}
								</h3>
								<p className="text-center text-slate-500 text-xs">Posts</p>
							</div>
							<div className="border-r-slate-200 border-r pr-2.5 pl-2.5 flex flex-col gap-1 items-center w-full">
								<h3 className="text-base font-medium font-display text-slate-900">
									{profile.followers}
								</h3>
								<p className="text-center text-slate-500 text-xs">Follower</p>
							</div>
							<div className="border-r-slate-200 pr-2.5 pl-2.5 flex flex-col gap-1 items-center w-full">
								<h3 className="text-base font-medium font-display text-slate-900">
									{profile.following}
								</h3>
								<p className="text-center text-slate-500 text-xs">Following</p>
							</div>
						</div>
						<div className="flex flex-col items-stretch gap-4 self-stretch">
							<followFetcher.Form
								action="/follow"
								method="POST"
								className="w-full items-stretch flex flex-col"
							>
								<input
									hidden
									name="is_already_following"
									defaultValue={isFollowing ? "true" : "false"}
								/>
								<input hidden name="username" defaultValue={profile.username} />
								<button
									type="submit"
									className={button({ intent: "secondary" })}
									onClick={(e) => {
										e.preventDefault();
										setIsFollowing(!isFollowing);
									}}
								>
									<div className={buttonInnerRing({ intent: "secondary" })} />
									<span>Follow</span>
								</button>
							</followFetcher.Form>

							<hr className="w-full border-slate-200" />
						</div>
					</div>
				)}
			</Container>
			<hr className="border-slate-200" />
			<Container className="grid grid-cols-7 gap-6 py-10 items-start max-w-7xl">
				<main className="flex flex-col gap-8 w-full items-stretch col-start-3 col-span-3">
					<div className="flex flex-col gap-1">
						<h1 className="text-left w-full text-slate-950 text-xl font-medium">
							Posts
						</h1>
						<p className="text-sm text-slate-500 text-pretty">
							What the user has to say...
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
		</div>
	);
};
