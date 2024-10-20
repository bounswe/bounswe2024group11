import { PageHead } from "../components/page-head";

export const Home = () => {
    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <PageHead
                title="Welcome to Turquiz"
                description="Turquiz is a platform that helps you to get prolific in
                    English. You can take quizzes and use forums to improve your
                    English."
            />
        </div>
    );
};
