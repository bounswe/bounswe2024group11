import type { User } from "../../types/user";
import { makeLoader } from "react-router-typesafe";

export const authLoader = makeLoader(async () => {
	const user: User | null =
		sessionStorage.getObject("zenith_app_user") ||
		localStorage.getObject("zenith_app_user");
	return user;
});
