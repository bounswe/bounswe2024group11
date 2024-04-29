import {
	Container,
	MantineProvider,
	Button,
	Flex,
	Input,
	useMantineTheme,
	Group,
	TextInput,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { Form, Link, useSubmit } from "react-router-dom";
import { href } from "../router";
import { button, buttonInnerRing } from "../components/Button";
import { RiSearch2Line } from "@remixicon/react";

export const Home = () => {
	const submit = useSubmit();
	return (
		<div className="relative">
			<div className="border-b border-slate-100 bg-[rgba(255,255,255,.92)] backdrop-blur-sm sticky top-0">
				<Container>
					<header className="w-full md:py-6 py-4 ">
						<div className="w-full flex flex-row items-center gap-4 justify-between">
							<Link
								to={href({ path: "/" })}
								className="flex flex-row items-center gap-2 min-w-40"
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
							<div className="flex-1 max-w-80">
								<Form
									className="flex items-center gap-2 w-full"
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											console.log("enter");
											e.preventDefault();
											submit(e.currentTarget);
										}
									}}
								>
									<TextInput
										className="w-full"
										placeholder="Search "
										aria-label="Search"
										id="search"
										classNames={{
											section: "pointer-events-none",
										}}
										leftSection={<RiSearch2Line size={16} />}
									/>
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
							</div>
						</div>
					</header>
				</Container>
			</div>
			<div>
				{Array.from({ length: 20 }).map((_, i) => {
					return (
						<div key={`Strip ${i + 1}`}>
							<div className="h-8 bg-slate-50" />
							<div className="h-12" />
						</div>
					);
				})}
			</div>
		</div>
	);
};
