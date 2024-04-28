import { Container } from "@mantine/core";
import { href } from "../router";
import { button, buttonInnerRing } from "../components/Button";

export const Terms = () => {
	return (
		<Container className="py-20">
			<div className="flex flex-col gap-4 text-slate-700">
				<h1 className="text-4xl font-bold text-slate-950 font-display">
					Zenith Terms and Conditions
				</h1>
				<p className="text-slate-600">
					DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
				</p>
				<code>Copyright (C) 2004 Sam Hocevar sam@hocevar.net</code>
				<p>
					Everyone is permitted to copy and distribute verbatim or modified
					copies of this license document, and changing it is allowed as long as
					the name is changed.
				</p>
				<p>
					DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE TERMS AND CONDITIONS FOR
					COPYING, DISTRIBUTION AND MODIFICATION
				</p>
				<ul>
					<li>0. You just DO WHAT THE FUCK YOU WANT TO.</li>
				</ul>
				<div className="flex items-center gap-3">
					<a
						className={button({ intent: "primary" })}
						href={href({ path: "/register" })}
					>
						<div className={buttonInnerRing({ intent: "secondary" })} />
						<span>Register</span>
					</a>
					<a
						className={button({ intent: "tertiary" })}
						href={href({ path: "/" })}
					>
						<span className="text-slate-900">Home</span>
					</a>
				</div>
			</div>
		</Container>
	);
};
