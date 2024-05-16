import { makeAction } from "react-router-typesafe";

export const bookmarkAction = makeAction(async () => {
	console.log("bookmark action");
	return null;
});
