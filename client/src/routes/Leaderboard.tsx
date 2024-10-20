import { PageHead } from "../components/page-head";

export const Leaderboard = () => {
    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <PageHead
                title="Leaderboard"
                description="Compete with others and see where you rank."
            />
        </div>
    );
};
