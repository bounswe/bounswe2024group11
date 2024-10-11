import { cva } from "cva";

export const inputClass = cva(
    "py-2 px-3 rounded-md ring-1 ring-slate-200 leading-6 text-cyan-950 tracking-tight carret-cyan-900 focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:outline-none transition-all duration-300 rounded-1",
    {
        variants: {},
    },
);
