type PageHeadProps = {
    title: string;
    description: string;
    children?: React.ReactNode;
};

export const PageHead = ({ title, description, children }: PageHeadProps) => {
    return (
        <div className="flex w-full flex-1 gap-2">
            <div className="flex flex-1 flex-col items-start gap-1">
                <h1 className="font-display text-4xl font-medium">{title}</h1>
                <p className="max-w-xl text-balance text-slate-500">
                    {description}
                </p>
            </div>
            {children}
        </div>
    );
};
