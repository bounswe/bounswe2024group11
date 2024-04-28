import {
	Autocomplete,
	Group,
	Burger,
	rem,
	TextInput,
	Container,
} from "@mantine/core";
import { href } from "../router";
import { button } from "../components/Button";
const links = [
	{ link: "/about", label: "Features" },
	{ link: "/pricing", label: "Pricing" },
	{ link: "/learn", label: "Learn" },
	{ link: "/community", label: "Community" },
];
export const Feed = () => {
	return (
		<header className="w-full">
			<Container className="w-full flex flex-row items-center justify-between ">
				<Group className="flex flex-row items-center">
					<img
						src="./img/zenith-login-logo.webp"
						alt="Zenith Logo"
						width={32}
						height={32}
					/>
					<h1>Zenith</h1>
				</Group>
				<Group>
					<TextInput className="w-full" />
				</Group>
				<Group>
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
						<span className="text-slate-900">Register</span>
					</a>
				</Group>
			</Container>
		</header>
	);
};
