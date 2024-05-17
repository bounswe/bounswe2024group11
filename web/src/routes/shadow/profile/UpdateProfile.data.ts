import { makeAction } from "react-router-typesafe";

export const updateProfileAction = makeAction(
	async ({ request, params, context }) => {
		console.log(request, params, context);
		return null;
	},
);
