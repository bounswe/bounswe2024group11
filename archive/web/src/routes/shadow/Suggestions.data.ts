import { Params } from "react-router-dom";
import { makeAction, makeLoader } from "react-router-typesafe";

export const suggestionsLoader = makeLoader(async ({ request, params }) => {
	console.log("Suggestions Loader");
	console.log(params);

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
