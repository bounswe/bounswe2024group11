import { TextInput, Container, Menu, Box } from "@mantine/core";
import {
	RiUser3Line,
	RiBookmark2Line,
	RiSearch2Line,
	RiMailLine,
	RiLink,
	RiLogoutCircleLine,
	RiSettings2Line,
} from "@remixicon/react";
import { Link, Form, useSubmit, useFetcher } from "react-router-dom";
import { useLoaderData, useRouteLoaderData } from "react-router-typesafe";
import { href } from "../router";
import { button, buttonInnerRing } from "../components/Button";
import { useActionData } from "react-router-typesafe";
import type { loginAction } from "./Login.data";
import { imageLink } from "../components/ImageLink";
import type { profileLoader } from "./Profile.data";
import type { authLoader } from "./global/auth.data";

export const Profile = () => {
	const { profile } = useLoaderData<typeof profileLoader>();
	const user = useRouteLoaderData<typeof authLoader>("auth");
	const isOwner = user && user.username === profile.username;
	const submit = useSubmit();
	const actionData = useActionData<typeof loginAction>();
	const isAuthError = actionData && "error" in actionData;
	const deleteFetcher = useFetcher();
	const bioFetcher = useFetcher();
	const infoFetcher = useFetcher();
	return (
		<div className="relative">
			<div className="border-b border-slate-100 bg-[rgba(255,255,255,.92)] backdrop-blur-sm sticky top-0">
				<Container>
					<header className="w-full md:py-6 py-4 ">
						<div className="w-full flex flex-row items-center gap-4 justify-between">
							<Link
								to={href({ path: "/" })}
								className={imageLink({
									className:
										"flex flex-row items-center gap-2 min-w-24 rounded-3 py-1 pr-3 pl-1",
								})}
							>
								<img
									src="/zenith-logo.svg"
									alt="Zenith Logo"
									width={32}
									height={32}
								/>
								<p className="font-display tracking-tighter leading-8 font-medium">
									Zenith
								</p>
							</Link>
						</div>
					</header>
				</Container>
			</div>
			<div>
				<Container className="flex flex-col max-width:480px max-w-md items-center md:py-8 p-8 gap-6 border border-slate-200 rounded-8">
					<Box>
						{profile.picUrl ? (
							<img
								src={profile.picUrl}
								alt="User Icon"
								width={80}
								height={80}
							/>
						) : (
							<div className="w-20 h-20 rounded-full bg-cyan-100 text-cyan-900 flex items-center justify-center ">
								{profile.fullname[0]}
							</div>
						)}
					</Box>
					<div className="flex flex-col items-center gap-3 w-full">
						<div className="flex flex-col items-center gap-1">
							<h1 className="text-2xl font-medium font-display text-slate-950">
								{profile.fullname}
							</h1>
							<p className="text-center text-slate-500">{user?.username}</p>
							<bioFetcher.Form method="POST">
								<textarea
									name="bio"
									defaultValue={profile.bio}
									// TOOD: resize="none"
									onBlur={(e) => submit(e.currentTarget.form)}
									className="text-center text-slate-500"
								/>
							</bioFetcher.Form>
						</div>
					</div>
					<div className="flex flex-row items-center justify-stretch w-full">
						<div className="border-r-slate-200 border-r-2 pr-2.5 pl-2.5 flex flex-col gap-1 items-center w-full">
							<h3 className="text-base font-medium font-display text-slate-950">
								{profile.post}
							</h3>
							<p className="text-center text-slate-500 text-xs">Posts</p>
						</div>
						<div className="border-r-slate-200 border-r-2 pr-2.5 pl-2.5 flex flex-col gap-1 items-center w-full">
							<h3 className="text-base font-medium font-display text-slate-950">
								{profile.followers}
							</h3>
							<p className="text-center text-slate-500 text-xs">Follower</p>
						</div>
						<div className="border-r-slate-200 border-r-2 pr-2.5 pl-2.5 flex flex-col gap-1 items-center w-full">
							<h3 className="text-base font-medium font-display text-slate-950">
								{profile.following}
							</h3>
							<p className="text-center text-slate-500 text-xs">Following</p>
						</div>
					</div>
					<infoFetcher.Form
						className="w-full flex flex-col gap-6"
						method="POST"
					>
						<div className="flex flex-col border-slate-200 border rounded-3">
							<div className="flex flex-row items-center justify-stretch w-full gap-6 p-4">
								<div className="w-40 flex flex-row items-center pr-6 border-r-slate-200 border-r-2 gap-1">
									<RiUser3Line className="text-slate-700" size={20} />
									<h1 className="text-base font-medium font-display text-slate-950">
										Full Name
									</h1>
								</div>
								<TextInput
									classNames={{
										input: "border-0 rounded-4 w-full text-slate-700",
									}}
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
							<div className="w-full flex flex-row items-center justify-stretch gap-6 p-4">
								<div className="w-40 flex flex-row items-center pr-6 border-r-slate-200 border-r-2 gap-1">
									<RiMailLine className="text-slate-700" size={20} />
									<h1 className="text-base font-medium font-display text-slate-950">
										Email
									</h1>
								</div>
								<TextInput
									classNames={{
										input: "border-0 rounded-4 w-full text-slate-700",
									}}
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
							<div className="flex flex-row items-center justify-stretch w-full gap-6 p-4">
								<div className="w-40 flex flex-row items-center pr-6 border-r-slate-200 border-r-2 gap-1">
									<RiUser3Line size={20} className="text-slate-700" />
									<h1 className="text-base font-medium font-display text-slate-950">
										Username
									</h1>
								</div>
								<TextInput
									classNames={{
										input: "border-0 rounded-4 w-full text-slate-700",
									}}
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
							<div className="flex flex-row items-center justify-stretch w-full gap-6 p-4">
								<div className="w-40 flex flex-row items-center pr-6 border-r-slate-200 border-r-2 gap-1">
									<RiLink size={20} />
									<h1 className="text-base font-medium font-display text-slate-950">
										Prof. Picture
									</h1>
								</div>
								<TextInput
									classNames={{
										input: "border-0 rounded-4 w-full text-slate-700",
									}}
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
						<button type="submit" className={button({ intent: "destructive" })}>
							<div className={buttonInnerRing({ intent: "secondary" })} />
							<span>Delete Account</span>
						</button>
					</deleteFetcher.Form>
				</Container>
			</div>
		</div>
	);
};
