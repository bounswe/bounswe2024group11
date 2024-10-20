import { PageHead } from "../components/page-head";

export const Forum = () => {
    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <PageHead
                title="Forum"
                description="Ask questions, share knowledge, and learn from others."
            />
        </div>
    );
};
