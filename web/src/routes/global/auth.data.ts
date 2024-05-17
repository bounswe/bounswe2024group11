import type { User } from "../../types/user";
import { makeLoader } from "react-router-typesafe";

export const authLoader = makeLoader(async () => {
	console.log("Loading user from session storage");
	const user: User | null =
		sessionStorage.getObject("zenith_app_user") ||
		localStorage.getObject("zenith_app_user");
	return user;
});
