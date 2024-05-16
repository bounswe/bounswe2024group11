import { makeAction } from "react-router-typesafe";

export const unfollowAction = makeAction(async () => {
	console.log("unfollowAction");
	return null;
});
