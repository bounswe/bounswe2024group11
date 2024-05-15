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
import { useRouteLoaderData } from "react-router-typesafe";
import { imageLink } from "../components/ImageLink";
import Post from "../components/Post";
import { useDisclosure } from "@mantine/hooks";
import type { authLoader } from "./global/auth.data";
import { NewPost } from "../components/NewPost";

const CATEGORIES = [
	"born in",
	"from universe",
	"from the comics",
	"has superpower",
];

const post = {
	author: 1,
	id: 0,
	bookmarkcount: 31,
	likecount: 41,
	title: "A new beginning",
	text: "Once upon a time in a galaxy far far away there was a star. It was a very bright star. It was the brightest star in. It is the most beautiful star. Copilot of the millennium falcon. The star was so bright that it could be seen from the other side of something.",
	imgUrl:
		"https://science.nasa.gov/wp-content/uploads/2023/09/Milky_Way_illustration-1.jpeg?w=1536&format=webp",
	tag: "space",
};

export const Home = () => {
	const suggestionsFetcher = useFetcher();
	const submit = useSubmit();
	const user = useRouteLoaderData<typeof authLoader>("auth");
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
							<div className="max-w-xl flex-1">
								<suggestionsFetcher.Form
									onChange={(e) => {
										suggestionsFetcher.submit(e.currentTarget);
									}}
									action="/suggestions"
									className="flex gap-2"
									method="GET"
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											const formData = new FormData(e.currentTarget);
											submit(formData);
										}
									}}
								>
									<Fieldset className="flex gap-2 justify-center border-0 p-0 flex-1 bg-transparent">
										<Select
											className="max-w-72"
											placeholder="Category"
											defaultValue="Universe"
											name="category"
											aria-label="Select a category"
											id="pick"
											data={CATEGORIES}
											rightSection={<RiArrowDropDownLine size={20} />}
											rightSectionPointerEvents="none"
											searchable
											nothingFoundMessage="No categories"
											aria-keyshortcuts="ArrowDown ArrowUp"
										/>
										<Select
											defaultValue="Universe"
											data={suggestionsFetcher.data}
											rightSection={<RiArrowDropDownLine size={20} />}
											rightSectionPointerEvents="none"
											searchable
											nothingFoundMessage="No categories"
											aria-keyshortcuts="ArrowDown ArrowUp"
											className="w-full"
											name="query"
											placeholder="Search "
											aria-label="Search"
											id="search"
											leftSection={<RiSearch2Line size={16} />}
											leftSectionPointerEvents="none"
										/>
									</Fieldset>
									<button
										type="submit"
										className={button({
											intent: "primary",
											className: "md:hidden",
										})}
									>
										<span className={buttonInnerRing({ intent: "primary" })} />
										<span>Search</span>
									</button>
								</suggestionsFetcher.Form>
							</div>

							<div className="items-center gap-2 hidden md:flex">
								{user ? (
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
												<div className="rounded-full bg-cyan-100 hover:ring hover:ring-cyan-200 transition-all duration-500 active:ring-cyan-900 text-cyan-900 h-10 w-10 flex items-center justify-center ">
													{user?.username[0] || "Z"}
												</div>
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
								) : (
									<>
										<a
											className={button({ intent: "tertiary" })}
											href={href({ path: "/login" })}
										>
											<span className="text-slate-900">Log In</span>
										</a>
										<a
											className={button({ intent: "secondary" })}
											href={href({ path: "/register" })}
										>
											<span
												className={buttonInnerRing({ intent: "secondary" })}
											/>

											<span>Register</span>
										</a>
									</>
								)}
							</div>
						</div>
					</header>
				</Container>
			</div>
			<div>
				<Container className="flex flex-col justify-between gap-4 py-10 items-center max-w-lg">
					<main className="flex flex-col gap-8">
						<div className="flex flex-col gap-1">
							<h1 className="text-left w-full text-slate-950 text-xl font-medium">
								Feed
							</h1>
							<p className="text-sm text-slate-500 text-pretty">
								What have you been up to?
							</p>
						</div>
						<div className="flex flex-col justify-between gap-8">
							<Post post={post} />
							<Post post={post} />
							<Post post={post} />
							<Post post={post} />
							<Post post={post} />
							<Post post={post} />
						</div>
					</main>
				</Container>
			</div>
			<NewPost />
		</div>
	);
};
