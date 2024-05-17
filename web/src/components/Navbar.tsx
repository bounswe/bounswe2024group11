import {
	Container,
	TextInput,
	Select,
	Fieldset,
	Menu,
	Modal,
	Textarea,
	Input,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { Form, Link, useFetcher, useSubmit } from "react-router-dom";
import { href } from "../router";
import { button, buttonInnerRing } from "../components/Button";
import {
	RiArrowDropDownLine,
	RiBookmark2Line,
	RiLogoutCircleLine,
	RiSearch2Line,
	RiSettings2Line,
} from "@remixicon/react";
import { useActionData, useRouteLoaderData } from "react-router-typesafe";
import { imageLink } from "../components/ImageLink";
import type { authLoader } from "../routes/global/auth.data";
import type { suggestionsLoader } from "../routes/shadow/Suggestions.data";
import { useState } from "react";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const WIKIDATA_CATEGORIES = [
	"born in",
	"enemy of",
	"occupation",
	"present in",
	"educated at",
	"member of",
];

const UserDropdown = () => {
	const user = useRouteLoaderData<typeof authLoader>("auth");
	return (
		<div className="items-center gap-2 hidden md:flex">
			{user ? (
				<Menu
					shadow="md"
					width={200}
					position="bottom-end"
					classNames={{
						item: "text-slate-700 hover:text-slate-900 active:bg-slate-200",
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
							<div className="rounded-full bg-cyan-100 hover:ring-2 ring-offset-1 ring-offset-white hover:ring-cyan-100 transition-all duration-200 text-cyan-900 h-10 w-10 flex items-center justify-center ">
								{user?.username[0] || "Z"}
							</div>
						</button>
					</Menu.Target>

					<Menu.Dropdown className="p-2">
						<Menu.Label className="text-slate-400 text-xs">
							@{user.username}
						</Menu.Label>
						<Menu.Divider className="border-slate-100" />
						<Menu.Item
							component={Link}
							to={`/profile/${user.id}`}
							leftSection={
								<RiSettings2Line className="text-slate-700" size={20} />
							}
						>
							Profile
						</Menu.Item>

						<Menu.Item
							component={Link}
							to={`/bookmarks/${user.username}`}
							leftSection={
								<RiBookmark2Line className="text-slate-700" size={20} />
							}
						>
							Bookmarks
						</Menu.Item>
						<Menu.Divider className="border-slate-100" />
						<Menu.Item
							component={Link}
							to="/login"
							onClick={() => {
								localStorage.removeItem("zenith_app_user");
								localStorage.removeItem("zenith_app_token");
								sessionStorage.removeItem("zenith_app_user");
								sessionStorage.removeItem("zenith_app_token");
							}}
							className="hover:!text-red-700 hover:!bg-red-50 active:!text-red-900 active:!bg-red-100"
							leftSection={
								<RiLogoutCircleLine className="text-inherit" size={20} />
							}
						>
							Log Out
						</Menu.Item>
						<Menu.Divider className="border-slate-100" />
						<Menu.Label className="text-slate-400 text-xs">
							Zenith ©2024
						</Menu.Label>
						<Menu.Label className="text-slate-400 text-xs">
							<Link to="/terms" className="text-xs hover:underline ">
								Terms of Use
							</Link>
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
						<span className={buttonInnerRing({ intent: "secondary" })} />

						<span>Register</span>
					</a>
				</>
			)}
		</div>
	);
};

type Suggestion = {
	qid: string;
	label: string;
	description: string;
};

export const Navbar = () => {
	const suggestionsFetcher = useFetcher();
	const submit = useSubmit();

	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

	const user = useRouteLoaderData<typeof authLoader>("auth");
	return (
		<div className="border-b border-slate-100 bg-[rgba(255,255,255,.92)] backdrop-blur-sm sticky top-0 z-10">
			<Container className="max-w-7xl">
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
							<Form
								action="/"
								className="flex gap-2"
								method="GET"
								onChange={async (e) => {
									const formData = new FormData(e.currentTarget);
									const keyword = formData.get("keyword");
									const response = await fetch(
										`${VITE_BACKEND_URL}/api/v2/suggestions/?keyword=${keyword}`,
										{
											method: "GET",
											headers: {
												Accept: "application/json",
											},
										},
									);

									if (!response.ok) {
										switch (response.status) {
											case 400:
												return {
													error: "Invalid request",
												};
											case 401:
												return {
													error: "Unauthorized",
												};
											default:
												return {
													error: "Unknown error",
												};
										}
									}

									const responseJson = await response.json();
									console.log(responseJson);
									setSuggestions(responseJson);
								}}
							>
								<Fieldset className="flex gap-2 justify-center border-0 p-0 flex-1 bg-transparent">
									<Select
										className="max-w-72"
										placeholder="Category"
										defaultValue="born in"
										name="category"
										aria-label="Select a category"
										id="pick"
										data={WIKIDATA_CATEGORIES}
										rightSection={<RiArrowDropDownLine size={20} />}
										rightSectionPointerEvents="none"
										nothingFoundMessage="No categories"
										aria-keyshortcuts="ArrowDown ArrowUp"
									/>
									<div className="flex-1 relative">
										<Input
											name="keyword"
											placeholder="Search"
											aria-label="Search"
											id="keyword"
											leftSection={<RiSearch2Line size={16} />}
											leftSectionPointerEvents="none"
											onBlur={() => {
												setTimeout(() => {
													setSuggestions([]);
												}, 50);
											}}
										/>
										<div className="absolute top-12 bg-red z-10 bg-white rounded-2 px-2 py-1 max-h-80 overflow-auto shadow-card border-slate-200">
											<ul className="bg-white flex flex-col">
												{suggestions?.map((suggestion) => (
													<li
														key={suggestion.qid}
														className="w-full text-start"
													>
														<button
															type="submit"
															className="border-b border-slate-200 py-3 px-4 hover:bg-slate-50 flex flex-col gap-1 w-full text-start"
														>
															<p className="font-medium text-sm">
																{suggestion.label}
															</p>
															<p className="text-xs text-slate-500">
																{suggestion.description}
															</p>
														</button>
													</li>
												))}
											</ul>
										</div>
									</div>
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
							</Form>
						</div>
						<UserDropdown />
					</div>
				</header>
			</Container>
		</div>
	);
};
