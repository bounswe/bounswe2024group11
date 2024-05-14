import {
	TextInput,
	Container,
	Checkbox,
	Notification,
	Menu,
	Box,
	Textarea,
} from "@mantine/core";
import {
	RiUser3Line,
	RiArrowDropDownLine,
	RiBookmark2Line,
	RiLogoutBoxRLine,
	RiLogoutCircleLine,
	RiSearch2Line,
	RiSettings2Line,
	RiMailLine,
	RiLink,
} from "@remixicon/react";
import { Link, Form, redirect, useLoaderData } from "react-router-dom";
import { href } from "../router";
import { button, buttonInnerRing } from "../components/Button";
import { useActionData } from "react-router-typesafe";
import { type SetStateAction, useState } from "react";
import { Checkmark } from "../components/Checkmark";
import type { loginAction } from "./Login.data";
import { imageLink } from "../components/ImageLink";
import { RiErrorWarningLine } from "@remixicon/react";
import { UserContext } from "../context/UserContext";

export const Profile = () => {
	const user = {
		email: "john@email.com",
		fullname: "John Doe",
		username: "@johnDoe",
		post: 41,
		followers: 100,
		following: 5432,
		picUrl:
			"https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1715520071~exp=1715520671~hmac=ffad0c38a66747334e85982464792aa4d255f65fa0de3d902ec01499171cffd5",
	};
	const actionData = useActionData<typeof loginAction>();
	const isAuthError = actionData && "error" in actionData;
	const [value, setValue] = useState("");
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
									src="./zenith-logo.svg"
									alt="Zenith Logo"
									width={32}
									height={32}
								/>
								<p className="font-display tracking-tighter leading-8 font-medium">
									Zenith
								</p>
							</Link>

							<div className="items-center gap-2 hidden md:flex">
								{user && (
									<Menu
										shadow="md"
										width={200}
										position="bottom-end"
										classNames={{
											item: "text-slate-700 hover:text-slate-900",
											dropdown: "shadow-card",
										}}
									>
										<Menu.Target>
											<button
												type="button"
												className={imageLink({
													rounded: true,
													className: "ml-auto cursor-pointer",
												})}
											>
												{user.picUrl ? (
													<img
														src={user.picUrl}
														alt="User Icon"
														width={32}
														height={32}
													/>
												) : (
													<div className="w-20 h-20 rounded-full bg-cyan-100 text-cyan-900 flex items-center justify-center ">
														{user?.fullname[0] || "Z"}
													</div>
												)}
											</button>
										</Menu.Target>

										<Menu.Dropdown className="p-2">
											<Menu.Label className="text-slate-400 text-xs">
												{user.username}
											</Menu.Label>
											<Menu.Divider className="border-slate-100" />
											<Menu.Item
												leftSection={
													<RiSettings2Line
														className="text-slate-700"
														size={20}
													/>
												}
											>
												Profile Settings
											</Menu.Item>

											<Menu.Item
												leftSection={
													<RiBookmark2Line
														className="text-slate-700"
														size={20}
													/>
												}
											>
												Bookmarks
											</Menu.Item>
											<Menu.Divider className="border-slate-100" />
											<Menu.Item
												className="hover:text-red-700 hover:bg-red-50"
												leftSection={
													<RiLogoutCircleLine
														className="text-inherit"
														size={20}
													/>
												}
												onClick={() => {
													localStorage.removeItem("zenith_app_user");
													localStorage.removeItem("zenith_app_token");
													sessionStorage.removeItem("zenith_app_user");
													sessionStorage.removeItem("zenith_app_token");
													window.location.reload();
												}}
											>
												Log Out
											</Menu.Item>
											<Menu.Divider className="border-slate-100" />
											<Menu.Label className="text-slate-400 text-xs">
												Zenith ©2024
											</Menu.Label>
										</Menu.Dropdown>
									</Menu>
								)}
							</div>
						</div>
					</header>
				</Container>
			</div>
			<div>
				<Container className="flex flex-col max-width:480px max-w-md items-center md:py-8 p-8 gap-6 border-2 border-slate-200 rounded-8">
					<Box>
						{user.picUrl ? (
							<img src={user.picUrl} alt="User Icon" width={80} height={80} />
						) : (
							<div className="w-20 h-20 rounded-full bg-cyan-100 text-cyan-900 flex items-center justify-center ">
								{user?.fullname[0] || "Z"}
							</div>
						)}
					</Box>
					<div className="flex flex-col items-center gap-3 w-full">
						<div className="flex flex-col items-center gap-1">
							<h1 className="text-2xl font-medium font-display text-slate-950">
								{user?.fullname || "Noname"}
							</h1>
							<p className="text-center text-slate-500">
								{`${user?.username || "Z"}`}
							</p>
						</div>
						<Textarea
							className="w-full"
							placeholder="Tell us about yourself"
							value={value}
							onChange={(event: {
								currentTarget: { value: SetStateAction<string> };
							}) => setValue(event.currentTarget.value)}
						>
							{value.length}/200
						</Textarea>
					</div>
					<div className="flex flex-row items-center justify-stretch w-full">
						<div className="border-r-slate-200 border-r-2 pr-2.5 pl-2.5 flex flex-col gap-1 items-center w-full">
							<h1 className="text-base font-medium font-display text-slate-950">
								{user.post}
							</h1>
							<p className="text-center text-slate-500 text-xs">Posts</p>
						</div>
						<div className="border-r-slate-200 border-r-2 pr-2.5 pl-2.5 flex flex-col gap-1 items-center w-full">
							<h1 className="text-base font-medium font-display text-slate-950">
								{user.followers}
							</h1>
							<p className="text-center text-slate-500 text-xs">Follower</p>
						</div>
						<div className="border-r-slate-200 border-r-2 pr-2.5 pl-2.5 flex flex-col gap-1 items-center w-full">
							<h1 className="text-base font-medium font-display text-slate-950">
								{user.following}
							</h1>
							<p className="text-center text-slate-500 text-xs">Following</p>
						</div>
					</div>
					<Form
						className="w-full flex flex-col gap-6"
						method="POST"
						action="/profile"
					>
						<div className="flex flex-col border-slate-200 border-2 rounded-3">
							<div className="flex flex-row items-center justify-stretch w-full gap-6 p-4">
								<div className="w-40 flex flex-row items-center pr-6 border-r-slate-200 border-r-2 gap-1">
									<RiUser3Line size={20} />
									<h1 className="text-base font-medium font-display text-slate-950">
										Full Name
									</h1>
								</div>
								<TextInput
									classNames={{
										input: "border-0 rounded-4 w-full text-slate-700",
									}}
									value={user.fullname}
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
									<RiMailLine size={20} />
									<h1 className="text-base font-medium font-display text-slate-950">
										Email
									</h1>
								</div>
								<TextInput
									classNames={{
										input: "border-0 rounded-4 w-full text-slate-700",
									}}
									value={user.email}
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
									<RiUser3Line size={20} />
									<h1 className="text-base font-medium font-display text-slate-950">
										Username
									</h1>
								</div>
								<TextInput
									classNames={{
										input: "border-0 rounded-4 w-full text-slate-700",
									}}
									value={user.username}
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
									value={user.picUrl}
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
						<button type="submit" className={button({ intent: "destructive" })}>
							<div className={buttonInnerRing({ intent: "secondary" })} />
							<span>Delete Account</span>
						</button>
					</Form>
				</Container>
			</div>
		</div>
	);
};
