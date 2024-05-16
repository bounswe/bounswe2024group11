import { makeAction } from "react-router-typesafe";

export const updateBioAction = makeAction(
	async ({ request, params, context }) => {
		console.log("updateBioAction");
		return null;
	},
);
