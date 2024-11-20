type PageHeadProps = {
    title: string;
    description: string;
};

export const PageHead = ({ title, description }: PageHeadProps) => {
    return (
        <div className="flex flex-1 flex-col items-start gap-1">
            <h1 className="font-display text-4xl font-medium">{title}</h1>
            <p className="max-w-lg text-balance text-slate-500">
                {description}
            </p>
        </div>
    );
};
