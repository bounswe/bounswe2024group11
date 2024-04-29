import { typesafeBrowserRouter } from "react-router-typesafe";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { Register } from "./routes/Register";
import { Terms } from "./routes/Terms";
import { homeLoader } from "./routes/Home.data";
import { loginAction, loginLoader } from "./routes/Login.data";
import { registerAction, registerLoader } from "./routes/Register.data";
import { Feed } from "./routes/HomePage";

export const { router, href } = typesafeBrowserRouter([
	{
		path: "/",
		Component: Home,
		loader: homeLoader,
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
		path: "/feed",
		Component: Feed,
	},
]);
