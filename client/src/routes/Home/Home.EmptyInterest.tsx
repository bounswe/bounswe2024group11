import { RiPenNibLine } from "@remixicon/react";

export const HomeEmptyInterest = () => {
    return (
        <div className="flex w-full max-w-xl flex-col items-center gap-4 self-center py-6 text-center">
            <div className="rounded-full bg-slate-100 p-5">
                <RiPenNibLine className="h-7 text-slate-400" size={32} />
            </div>
            <div className="flex flex-col items-center gap-4">
                <p className="text-base text-slate-600">
                    We have no idea what you are interested in. <br />
                    Add tags and we'll customize your feed for you.
                </p>
            </div>
        </div>
    );
};
