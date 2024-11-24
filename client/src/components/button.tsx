import { cva } from "cva";

export const buttonInnerRing = cva(
    [
        "gradient-mask",
        "absolute",
        "inset-[1px]",
        "width-full",
        "height-full",
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
                secondary: ["border-cyan-100/30"],
                fixed: ["border-white/25"],
                tertiary: ["border-white/50"],
                destructive: ["border-red-400"],
            },
            rounded: {
                default: ["rounded-[7px]"],
                full: ["rounded-full"],
            },
        },
        defaultVariants: {
            intent: "primary",
            rounded: "default",
        },
    },
);

export const buttonClass = cva(
    [
        "font-medium",
        "text-center",
        "flex",
        "items-center",
        "justify-center",
        "group",
        "transition-all",
        "duration-100",
        "focus-visible:ring-slate-300",
        "focus-visible:ring-3",
        "focus-visible:outline-none",
        "outline-none",
        "cursor-pointer",
        "disabled:hover:bg-slate-800",
        "disabled:active:ring-0",
        "disabled:cursor-default",
        "disabled:opacity-50",
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
                    "active:ring-cyan-100",
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
                left: ["flex", "items-center", "gap-2", "pl-3"],
                right: ["flex", "items-center", "gap-2", "pr-3"],
                only: ["flex", "items-center", "gap-1", "p-0", "aspect-auto"],
                none: [],
            },
            size: {
                small: ["text-xs", "py-1", "px-2"],
                medium: ["text-sm", "py-2", "px-4"],
                large: ["text-base", "py-3", "px-6"],
            },
            rounded: {
                default: ["rounded-2"],
                full: ["rounded-full"],
            },
            position: {
                fixed: ["fixed"],
                relative: ["relative"],
            },
        },
        defaultVariants: {
            intent: "primary",
            size: "medium",
            icon: "none",
            rounded: "default",
            position: "relative",
        },
    },
);

//bookmark: orange]
//upvote: cyan
//downvote: red

export const toggleButtonClass = cva(
    [
        "flex",
        "items-center",
        "justify-center",
        "rounded-2",
        "transition-all",
        "duration-100",
        "focus-visible:ring-slate-300",
        "focus-visible:ring-3",
        "focus-visible:outline-none",
        "outline-none",
        "cursor-pointer",
        "disabled:hover:bg-slate-800",
        "disabled:active:ring-0",
        "disabled:cursor-default",
        "disabled:opacity-50",
        "p-3",
    ],
    {
        variants: {
            intent: {
                bookmark: [],
                upvote: [],
                downvote: [],
                delete: [],
            },
            state: {
                on: [],
                off: [],
            },
        },
        compoundVariants: [
            {
                intent: "bookmark",
                state: "on",
                class: ["bg-orange-200", "text-orange-800"],
            },
            {
                intent: "bookmark",
                state: "off",
                class: [
                    "bg-slate-100",
                    "hover:bg-orange-100",
                    "hover:text-orange-800",
                    "text-slate-700",
                ],
            },
            {
                intent: "upvote",
                state: "on",
                class: ["bg-cyan-500", "text-white"],
            },
            {
                intent: "upvote",
                state: "off",
                class: ["bg-slate-100", "text-slate-800"],
            },
            {
                intent: "downvote",
                state: "on",
                class: ["bg-red-100", "text-red-800"],
            },
            {
                intent: "downvote",
                state: "off",
                class: ["bg-slate-100", "text-slate-800"],
            },
            {
                intent: "delete",
                state: "on",
                class: ["bg-red-600", "text-white"],
            },
            {
                intent: "delete",
                state: "off",
                class: ["bg-slate-100", "text-slate-800"],
            },
        ],
    },
);
