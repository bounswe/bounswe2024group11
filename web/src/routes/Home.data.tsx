import { makeLoader } from "react-router-typesafe";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const homeAction = async ({ request }: { request: Request }) => {
	console.log("Home Action");
};

export const homeLoader = makeLoader(async ({ request }) => {
	console.log("Home Loader");
	return null;
});
