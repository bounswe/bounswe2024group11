import { cva } from "cva";

export const radioOptionClass = cva(
    "rounded-full px-4 py-1.5 text-center font-medium transition-all",
    {
        variants: {
            selected: {
                true: "bg-slate-700 text-white",
                false: "bg-slate-100 text-slate-900 hover:bg-slate-200",
            },
        },
    },
);
