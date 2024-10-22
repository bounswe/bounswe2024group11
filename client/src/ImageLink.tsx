import { cva } from "cva";

export const imageLink = cva(
    [
        "hover:text-slate-950",
        "focus-visible:outline-none",
        "focus-visible:ring-slate-400",
        "ring-transparent",
        "focus-visible:ring-offset-0",
        "focus-visible:ring-3",
        "transition-all",
    ],
    {
        variants: {
            rounded: {
                true: "rounded-full",
                false: "",
            },
        },
        defaultVariants: {
            rounded: false,
        },
    },
);
