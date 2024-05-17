import { makeLoader } from "react-router-typesafe";

export const suggestionsLoader = makeLoader(async ({ request }) => {
	const url = new URL(request.url);
	const query = url.searchParams.get("query");
	console.log(query);
	console.log("Suggestions Loader");
	return [
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"o",
		"p",
		"q",
		"r",
		"s",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z",
	];
});
