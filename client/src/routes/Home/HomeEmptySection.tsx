import { RiSearchLine } from "@remixicon/react";

export const HomeEmptySection = ({
    title,
    description,
}: {
    title: string;
    description: string;
}) => {
    return (
        <section className="flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-medium text-slate-900">
                <span>{title}</span>
            </h2>
            <div className="flex flex-col items-center gap-4 py-20">
                <div className="rounded-full bg-slate-50 p-5 text-slate-400">
                    <RiSearchLine size={24} />
                </div>
                <span className="max-w-lg text-balance text-center text-sm text-slate-500">
                    {description}
                </span>
            </div>
        </section>
    );
};
