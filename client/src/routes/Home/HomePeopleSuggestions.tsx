import { UserCard } from "../../components/user-card";
import { Author } from "../../schemas";

export const HomePeopleSuggestions = ({ people }: { people: Author[] }) => {
    return (
        <section className="flex flex-col gap-2">
            <h2 className="text-sm leading-6 text-slate-500">
                These people stand out to you
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {people.map((author) => {
                    if (author.is_followed === 1) return null;
                    return <UserCard user={author} key={author.id} />;
                })}
            </div>
        </section>
    );
};
