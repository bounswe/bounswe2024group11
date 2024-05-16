import { makeAction } from "react-router-typesafe";

export const followProfileAction = makeAction(
	async ({ request, params, context }) => {
		console.log(request, params, context);
		console.log("followProfileAction");
		return null;
	},
);
