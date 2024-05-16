import { makeAction } from "react-router-typesafe";

export const followAction = makeAction(async ({ request, params, context }) => {
	console.log(request, params, context);
	console.log("followProfileAction");
	return null;
});
