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
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="skeleton-loading h-16 w-full rounded-2 bg-slate-200"
                        style={{ animationDelay: `-${i * 0.1}s` }}
                    ></div>
                ))}
            </div>
        </div>
    );
};
