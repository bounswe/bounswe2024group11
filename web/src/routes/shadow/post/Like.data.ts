import { makeAction } from "react-router-typesafe";

export const likeAction = makeAction(async () => {
	console.log("likeAction");
	return null;
});
