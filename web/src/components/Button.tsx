import { cva } from "class-variance-authority";

export const buttonInnerRing = cva(
	[
		"gradient-mask",
		"absolute",
		"inset-[1px]",
		"width-full",
		"height-full",
		"rounded-[7px]",
		"border",
		"transition-all",
	],
	{
		variants: {
			intent: {
				primary: [
					"border-cyan-400",
					"group-hover:border-cyan-500",
					"group-active:border-cyan-600",
				],
				secondary: ["border-white/25"],
				fixed: ["border-white/25"],
				tertiary: ["border-white/50"],
				destructive: ["border-red-400"],
			},
		},
		defaultVariants: {
			intent: "primary",
		},
	},
);

export const button = cva(
	[
		"font-medium",
		"text-white",
		"text-center",
		"flex",
		"items-center",
		"justify-center",
		"rounded-2",
		"relative",
		"group",
		"transition-all",
		"duration-300",
		"focus-visible:ring-slate-300",
		"focus-visible:ring-3",
		"focus-visible:outline-none",
	],
	{
		variants: {
			intent: {
				primary: [
					"bg-cyan-500",
					"hover:bg-cyan-600",
					"bg-gradient-to-b",
					"from-white/15",
					"to-white/0",
					"ring-0",
					"ring-offset-1",
					"ring-cyan-50",
					"active:bg-cyan-700",
					"active:ring-3",
					"active:ring-cyan-200",
				],
				secondary: [
					"bg-slate-800",
					"hover:bg-slate-900",
					"bg-gradient-to-b",
					"from-white/15",
					"to-white/0",
					"ring-0",
					"ring-offset-1",
					"ring-slate-50",
					"ring-offset-1",
					"active:ring-2",
					"active:ring-slate-300",
				],
				destructive: [
					"bg-red-600",
					"hover:bg-red-700",
					"bg-gradient-to-b",
					"from-white/15",
					"to-white/0",
					"ring-0",
					"ring-offset-1",
					"ring-red-50",
					"active:bg-red-800",
					"active:ring-2",
					"active:ring-red-200",
				],
				tertiary: [
					"bg-transparent",
					"hover:bg-slate-200",
					"active:bg-slate-300",
					"text-slate-900",
				],
			},
			icon: {
				left: ["flex", "items-center", "gap-2", "pl-1"],
				right: ["flex", "items-center", "gap-2", "pr-1"],
				none: [],
			},
			size: {
				small: ["text-xs", "py-1", "px-2"],
				medium: ["text-sm", "py-2", "px-4"],
			},
		},
		defaultVariants: {
			intent: "primary",
			size: "medium",
			icon: "none",
		},
	},
);

export const button2 = cva(
	[
		"text-center",
		"flex",
		"items-center",
		"justify-center",
		"rounded-2",
		"group",
		"transition-all",
		"duration-300",
		"focus-visible:ring-slate-300",
		"focus-visible:ring-3",
		"focus-visible:outline-none",
	],
	{
		variants: {
			intent: {
				edit: [
					"font-bold",
					"bg-transparent",
					"hover:bg-slate-200",
					"active:bg-slate-300",
					"text-slate-900",
				],
				fixed: [
					"font-medium",
					"text-white",
					"bg-slate-800",
					"hover:bg-slate-900",
					"bg-gradient-to-b",
					"from-white/15",
					"to-white/0",
					"ring-0",
					"ring-offset-1",
					"ring-slate-50",
					"ring-offset-1",
					"active:ring-2",
					"active:ring-slate-300",
					"fixed",
					"bottom-10",
					"right-11",
				],
			},
			icon: {
				left: ["flex", "items-center", "gap-2", "pl-1"],
				right: ["flex", "items-center", "gap-2", "pr-1"],
				none: [],
			},
			size: {
				xsmall: ["text-xs", "py-0", "px-0"],
				small: ["text-xs", "py-1", "px-2"],
				medium: ["text-sm", "py-2", "px-4"],
			},
		},
		defaultVariants: {
			intent: "fixed",
			size: "medium",
			icon: "none",
		},
	},
);
