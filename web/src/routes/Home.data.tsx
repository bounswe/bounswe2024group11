import { makeLoader } from "react-router-typesafe";

export const homeLoader = makeLoader(async ({ request }) => {
	console.log("homeLoader");
	return null;
});
