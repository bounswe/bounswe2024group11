import { href } from "../router";
import type { LoginSuccess, RegisterSuccess } from "../schema/user";
import { makeLoader, redirect } from "react-router-typesafe";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const profileAction = async ({
	request,
}: { request: Request }): Promise<
	LoginSuccess | { error: string } | Response
> => {
	const responseJson = { token: "token" };
	return responseJson as RegisterSuccess;
};

export const profileLoader = makeLoader(async ({ request }) => {
	return null;
});
