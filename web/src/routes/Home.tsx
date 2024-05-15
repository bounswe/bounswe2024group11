import {
	Container,
	TextInput,
	Select,
	Fieldset,
	Menu,
	Modal,
	ModalHeader,
	CloseButton,
	Textarea,
	Divider,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { Form, Link, redirect, useSubmit } from "react-router-dom";
import { href } from "../router";
import { button, buttonInnerRing } from "../components/Button";
import {
	RiArrowDropDownLine,
	RiBookmark2Line,
	RiLogoutBoxRLine,
	RiLogoutCircleLine,
	RiQuillPenLine,
	RiSearch2Line,
	RiSettings2Line,
} from "@remixicon/react";
import { useActionData, useLoaderData } from "react-router-typesafe";
import type { homeAction, homeLoader } from "./Home.data";
import { imageLink } from "../components/ImageLink";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import InfoBox from "../components/InfoBox";
import type { InfoBoxProps } from "../components/InfoBox";
import Post from "../components/Post";
import { useDisclosure } from "@mantine/hooks";

const CATEGORIES = [
	"born in",
	"from universe",
	"from the comics",
	"has superpower",
];

const StripBG = () => {
	return Array.from({ length: 20 }).map((_, i) => {
		return (
			<div key={`Strip ${i + 1}`}>
				<div className="h-8 bg-slate-50" />
				<div className="h-12" />
			</div>
		);
	});
};

export const Home = () => {
	const [opened, { open, close }] = useDisclosure(false);
	const submit = useSubmit();
	const user = useLoaderData<typeof homeLoader>();
	const actionData = useActionData<typeof homeAction>();
	const validResults =
		actionData && "results" in actionData && actionData.results;
	console.log("action data", actionData);
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
							<div className="max-w-xl flex-1">
								<Form
									className="flex gap-2"
									method="POST"
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											submit(e.currentTarget);
										}
									}}
								>
									<Fieldset className="flex gap-2 justify-center border-0 p-0 flex-1">
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
										<TextInput
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
								</Form>
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
				{validResults ? (
					<Container className="flex flex-col gap-4 py-8">
						<div className="flex gap-1 justify-between">
							<h1 className="font-regular text-lg">
								{actionData.results.length} results found for&nbsp;
								<span className="font-medium">"{actionData.keyword}"</span>
							</h1>
							<p className="font-regular text-slate-500 text-sm">
								Sorted by popularity.
							</p>
						</div>
						<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
							{actionData.results.map((result: InfoBoxProps) => {
								return <InfoBox key={result.label} {...result} />;
							})}
						</div>
					</Container>
				) : (
					<Container className="flex flex-col justify-between gap-4 py-10 items-center max-width:480px max-w-md">
						<h1 className="text-left w-full text-slate-950 text-lg">Feed</h1>
						<div className="flex flex-col justify-between gap-4">
							<Post
								post={{
									author: 1,
									id: 0,
									bookmarkcount: 31,
									likecount: 41,
									title: "A new beginning",
									text: "Once upon a time in a galaxy far far away there was a star. It was a very bright star. It was the brightest star in. It is the most beautiful star. Copilot of the millennium falcon. The star was so bright that it could be seen from the other side of something.",
									imgUrl:
										"https://science.nasa.gov/wp-content/uploads/2023/09/Milky_Way_illustration-1.jpeg?w=1536&format=webp",
									tag: "space",
								}}
							/>
						</div>
						<Modal.Root opened={opened} onClose={close}>
							<Modal.Overlay />
							<Modal.Content>
								<Modal.Header className="w-full flex flex-col p-0">
									<div className="w-full flex flex-row gap-3 justify-between items-center p-4">
										<button
											type="button"
											className="rounded-full w-12 h-11 border-slate-200 border-2 flex justify-center items-center"
										>
											<RiQuillPenLine size={24} />
										</button>
										<div className="flex flex-col w-full justify-between items-stretch gap-1">
											<div className="flex flex-row items-center w-full justify-between">
												<Modal.Title className="text-slate-900 text-lg">
													New Post
												</Modal.Title>
												<Modal.CloseButton />
											</div>
											<h2 className="text-slate-500 text-sm">
												Let's see your art! Create a new post!{" "}
											</h2>
										</div>
									</div>
									<hr className="h-1 w-full" />
								</Modal.Header>
								<Modal.Body className="px-5 py-6">
									<form
										className="w-full flex flex-col gap-4 justify-between items-end"
										method="POST"
										action="/profile"
									>
										<TextInput
											label="Url of the picture"
											classNames={{
												label: "text-slate-900 text-lg",
												input: "border-1 rounded-3 w-full text-slate-700",
												wrapper: "w-full",
												root: "w-full",
											}}
											type="text"
											name="picurl"
											aria-label="picture url"
											aria-errormessage="Invalid password"
										/>
										<TextInput
											label="Title"
											classNames={{
												label: "text-slate-900 text-lg",
												input: "border-1 rounded-3 w-full text-slate-700",
												wrapper: "w-full",
												root: "w-full",
											}}
											type="text"
											name="title"
											aria-label="title"
											aria-errormessage="Invalid password"
										/>
										<Textarea
											className="w-full rounded-3 border-1"
											placeholder="..."
										/>
										<button
											type="submit"
											className={button({ intent: "secondary" })}
										>
											Post
										</button>
									</form>
								</Modal.Body>
							</Modal.Content>
						</Modal.Root>
						<button
							type="button"
							onClick={open}
							className={button({ intent: "secondary", position: "fixed" })}
						>
							<img
								src="./add-fill.svg"
								alt="new post"
								width={20}
								height={20}
								className="rounded-full"
							/>
							New Post
						</button>
					</Container>
				)}
				<StripBG />
			</div>
		</div>
	);
};
