export const QuizLoading = () => {
    return (
        <div className="relative flex max-w-screen-xl flex-col items-stretch gap-16 py-12 pl-0 pr-0">
            <div className="grid grid-cols-3 items-stretch justify-stretch gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="skeleton-loading h-8 w-1/2 rounded-2 bg-slate-200"
                        style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                ))}
            </div>
            <div className="grid grid-cols-1 items-stretch justify-stretch gap-4 md:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="skeleton-loading h-64 w-full rounded-2 bg-slate-200"
                        style={{ animationDelay: `-${i * 0.1}s` }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export const ForumLoading = () => {
    return (
        <div className="relative flex max-w-screen-xl flex-col items-stretch gap-16 py-12 pl-0 pr-0">
            <div className="grid grid-cols-3 items-stretch justify-stretch gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="skeleton-loading h-8 w-1/2 rounded-2 bg-slate-200"
                        style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                ))}
            </div>
            <div className="grid grid-cols-1 items-stretch justify-stretch gap-4 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="skeleton-loading h-64 w-full rounded-2 bg-slate-200"
                        style={{ animationDelay: `-${i * 0.1}s` }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export const AchievementLoading = () => {
    return (
        <div className="relative flex max-w-screen-xl flex-col items-stretch gap-16 pl-0 pr-0">
            <div className="flex flex-col gap-16">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div className="flex flex-col gap-4" key={i}>
                        <div className="skeleton-loading h-8 w-1/3 rounded-2 bg-slate-200 md:w-1/6"></div>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {Array.from({
                                length: Math.floor(Math.random() * 3) + 3,
                            }).map((_, i) => (
                                <div
                                    key={i}
                                    className="skeleton-loading h-16 w-full rounded-2 bg-slate-200"
                                    style={{ animationDelay: `-${i * 0.1}s` }}
                                ></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const ProfileLoading = () => {
    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <div className="flex flex-row items-center gap-4">
                <div className="skeleton-loading h-24 w-24 rounded-full bg-slate-200" />
                <div className="flex flex-1 flex-col gap-2">
                    <div className="skeleton-loading h-6 w-24 bg-slate-200 pt-2 text-2xl font-semibold"></div>
                    <div className="skeleton-loading h-6 w-16 text-lg text-slate-500"></div>
                </div>
            </div>
            <div className="z-20 flex w-full flex-row items-center justify-between">
                <div className="flex flex-col gap-2">
                    <div className="skeleton-loading h-6 w-40 bg-slate-200 pt-2 text-2xl font-semibold"></div>
                    <div className="flex flex-row gap-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i}>
                                <div className="skeleton-loading h-16 w-16 rounded-2 bg-slate-200" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-16 flex flex-col gap-8">
                <div className="skeleton-loading h-6 w-48 bg-slate-200 text-2xl font-semibold"></div>

                <div className="grid w-full grid-cols-1 flex-col items-center gap-8 md:grid-cols-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div className="skeleton-loading h-64 w-full rounded-2 bg-slate-200" />
                    ))}
                </div>
            </div>
        </div>
    );
};
