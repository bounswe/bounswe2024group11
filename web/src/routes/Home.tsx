import { Container, TextInput, Select, Fieldset } from "@mantine/core";
import "@mantine/core/styles.css";
import { Form, Link, useSubmit } from "react-router-dom";
import { href } from "../router";
import { button, buttonInnerRing } from "../components/Button";
import { RiArrowDropDownLine, RiSearch2Line } from "@remixicon/react";

const CATEGORIES = [
	"Place of Birth",
	"Universe",
	"Comics",
	"Culture",
	"Occupation",
	"Nationality",
	"Season",
	"Country",
	"Language",
	"City",
	"Continent",
	"Century",
	"Decade",
	"Character Creator",
	"Publication Date",
	"Art Style",
	"Genre",
	"Awards",
	"Comic Series",
	"Publisher",
	"Comic Events",
	"Influences",
	"Film Adaptations",
	"Video Game Adaptations",
	"Merchandising",
	"Crossover Events",
	"Character Alignment",
	"Character Abilities",
	"Team Affiliations",
	"Narrative Technique",
	"Artistic Influences",
	"Character",
	"Comic Book Series",
	"Comic Book Character",
	"Comic Book Issue",
	"Comic Book Publisher",
];

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
								className="flex flex-row items-center gap-2 min-w-24"
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
							<div className="flex-1 max-w-lg">
								<Form
									className="flex gap-2"
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											console.log("enter");
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
											aria-label="Select a category"
											id="pick"
											data={CATEGORIES}
											rightSection={<RiArrowDropDownLine size={20} />}
											rightSectionPointerEvents="none"
											searchable
											// limit={5}
											nothingFoundMessage="No categories"
											aria-keyshortcuts="ArrowDown ArrowUp"
										/>
										<TextInput
											className="w-full"
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
