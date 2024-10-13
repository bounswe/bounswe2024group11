import { cva } from "cva";

export const inputClass = cva(
    "py-2 px-3 rounded-md ring-1 border-none ring-slate-200 leading-6 text-cyan-900 tracking-tight carret-cyan-900 outline-none font-normal text-cya focus:ring-2 focus:ring-cyan-700 focus:outline-none transition-all duration-300 rounded-1",
    {
        variants: {
            invalid: {
                true: "ring-red-500",
                false: "",
            },
        },
    },
);

export const labelClass = cva(
    "text-slate-900 duration-100 transition-colors text-sm tracking-tight font-medium",
    {
        variants: {
            wrapper: {
                true: "flex flex-col gap-1",
                false: "",
            },
        },
        defaultVariants: {
            wrapper: true,
        },
    },
);
