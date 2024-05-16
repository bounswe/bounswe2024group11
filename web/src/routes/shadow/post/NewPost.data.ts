import { makeAction } from "react-router-typesafe";

export const newPostAction = makeAction(async () => {
	console.log("New Post Action");
	return null;
});
