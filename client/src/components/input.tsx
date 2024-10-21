import { cva } from "cva";

export const inputClass = cva(
    "rounded-md carret-cyan-900 font-normal text-cya rounded-1 border-none px-3 py-2 leading-6 tracking-tight text-cyan-900 outline-none ring-1 transition-all duration-300 focus:outline-none focus:ring-2",
    {
        variants: {
            invalid: {
                true: "after:rounded-t-md ring-red-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-red-500 after:transition-all after:duration-300 after:content-[attr(aria-description)] focus:ring-cyan-700",
                false: "ring-slate-200 hover:ring-slate-400 focus:ring-cyan-700",
            },
        },
        defaultVariants: {
            invalid: false,
        },
    },
);

export const labelClass = cva(
    "text-sm font-medium tracking-tight text-slate-900 transition-colors duration-100",
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
