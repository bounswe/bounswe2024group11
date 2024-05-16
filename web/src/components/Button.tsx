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
		"text-center",
		"flex",
		"items-center",
		"justify-center",
		"rounded-2",
		"group",
		"relative",
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
					"active:ring-cyan-300",
					"text-white",
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
					"text-white",
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
					"text-white",
				],
				tertiary: [
					"bg-transparent",
					"hover:bg-slate-200",
					"active:bg-slate-300",
					"text-slate-950",
				],
			},
			icon: {
				left: ["flex", "items-center", "gap-2", "pl-2"],
				right: ["flex", "items-center", "gap-1", "pr-2"],
				only: ["flex", "items-center", "gap-1", "p-0", "aspect-auto"],
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
