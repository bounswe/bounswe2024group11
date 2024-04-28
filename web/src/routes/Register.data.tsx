import { makeLoader } from "react-router-typesafe";

export const registerLoader = makeLoader(async ({ request }) => {
	console.log("registerLoader");
	return null;
});

export const registerAction = async ({ request }: { request: Request }) => {
	console.log("registerAction");
	return null;
};
