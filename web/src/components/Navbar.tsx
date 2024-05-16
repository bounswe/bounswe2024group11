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
	RiArrowDropDownLine,
	RiBookmark2Line,
	RiLogoutCircleLine,
	RiSearch2Line,
	RiSettings2Line,
} from "@remixicon/react";
import { useRouteLoaderData } from "react-router-typesafe";
import { imageLink } from "../components/ImageLink";
import type { authLoader } from "@/routes/global/auth.data";

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
							leftSection={
								<RiSettings2Line className="text-slate-700" size={20} />
							}
						>
							<Link to={`/profile/${user.username}`}>Profile Settings</Link>
						</Menu.Item>

						<Menu.Item
							leftSection={
								<RiBookmark2Line className="text-slate-700" size={20} />
							}
						>
							<Link to={`/bookmarks/${user.username}`}>Bookmarks</Link>
						</Menu.Item>
						<Menu.Divider className="border-slate-100" />
						<Menu.Item
							onClick={() => {
								localStorage.removeItem("zenith_app_user");
								localStorage.removeItem("zenith_app_token");
								sessionStorage.removeItem("zenith_app_user");
								sessionStorage.removeItem("zenith_app_token");
								window.location.href = "/login";
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

export const Navbar = () => {
	const suggestionsFetcher = useFetcher();
	const submit = useSubmit();
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
							<suggestionsFetcher.Form
								onChange={(e) => {
									suggestionsFetcher.submit(e.currentTarget);
								}}
								onFocus={(e) => {
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
										data={WIKIDATA_CATEGORIES}
										rightSection={<RiArrowDropDownLine size={20} />}
										rightSectionPointerEvents="none"
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
						<UserDropdown />
					</div>
				</header>
			</Container>
		</div>
	);
};
