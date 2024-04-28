import { makeLoader, redirect } from "react-router-typesafe";

export const loginAction = async ({ request }: { request: Request }) => {
	console.log("loginAction");
	return null;
};

export const loginLoader = makeLoader(() => {
	console.log("loginLoader");
	if (localStorage.getItem("zenith_app_token")) {
		return redirect("/");
	}
	return null;
});
