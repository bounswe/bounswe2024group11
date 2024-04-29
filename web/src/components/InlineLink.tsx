import { cva } from "class-variance-authority";

export const inlineLink = cva([
	"underline-offset-2",
	"text-slate-800",
	"hover:text-slate-950",
	"focus-visible:outline-none",
	"focus-visible:ring-slate-500",
	"ring-transparent",
	"focus-visible:ring-offset-4",
	"focus-visible:ring-2",
]);
