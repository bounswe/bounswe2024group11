import { typesafeBrowserRouter } from "react-router-typesafe";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { Register } from "./routes/Register";
import { Terms } from "./routes/Terms";
import { homeLoader } from "./routes/Home.data";
import { loginAction, loginLoader } from "./routes/Login.data";

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
		loader: homeLoader,
		action: loginAction,
	},
	{
		path: "/terms",
		Component: Terms,
	},
]);
