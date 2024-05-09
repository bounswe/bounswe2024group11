import { typesafeBrowserRouter } from "react-router-typesafe";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { Register } from "./routes/Register";
import { Terms } from "./routes/Terms";
import { homeAction, homeLoader } from "./routes/Home.data";
import { loginAction, loginLoader } from "./routes/Login.data";
import { registerAction, registerLoader } from "./routes/Register.data";
import { Container } from "@mantine/core";
import { Form, Link } from "react-router-dom";
import { imageLink } from "./components/ImageLink";

export const { router, href } = typesafeBrowserRouter([
	{
		path: "/",
		Component: Home,
		loader: homeLoader,
		action: homeAction,
	},
	{
		path: "/login",
		Component: Login,
		loader: loginLoader,
		action: loginAction,
	},
	{
		path: "/register",
		Component: Register,
		loader: registerLoader,
		action: registerAction,
	},
	{
		path: "/terms",
		Component: Terms,
	},
	{
		path: "/profile",
		element: <div className="relative">Profile</div>,
	},
	{
		path: "/settings",
		element: <div className="relative">Settings</div>,
	},
]);
