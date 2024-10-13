import { cva } from "cva";

export const inputClass = cva(
    "py-2 px-3 rounded-md ring-1 border-none leading-6 text-cyan-900 tracking-tight carret-cyan-900 outline-none font-normal text-cya focus:ring-2  focus:outline-none transition-all duration-300 rounded-1",
    {
        variants: {
            invalid: {
                true: "ring-red-500 focus:ring-cyan-700 after:content-[attr(aria-description)] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-red-500 after:transition-all after:duration-300 after:rounded-t-md",
                false: "ring-slate-200 hover:ring-slate-400 focus:ring-cyan-700",
            },
        },
        defaultVariants: {
            invalid: false,
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
