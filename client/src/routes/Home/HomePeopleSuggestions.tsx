import { UserCard } from "../../components/user-card";
import { Author } from "../../schemas";

export const HomePeopleSuggestions = ({ people }: { people: Author[] }) => {
    return (
        <section className="flex flex-col gap-2">
            <h2 className="text-sm leading-6 text-slate-500">
                We believe you might be interested in
            </h2>
            <div className="flex gap-2">
                {people.map((author) => {
                    if (author.is_followed === 1) return null;
                    return <UserCard user={author} key={author.id} />;
                })}
            </div>
        </section>
    );
};
