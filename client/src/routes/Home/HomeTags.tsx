import { NewInterestTag } from "../../components/interest-tag";
import { Tag } from "../Forum/Forum.schema";

export const RelatedTags = ({ tags }: { tags: Tag[] }) => {
    return (
        <>
            <section className="flex flex-col gap-2">
                <h2 className="text-sm leading-6 text-slate-500">
                    We believe you might be interested in
                </h2>
                <div className="flex gap-2">
                    {tags.map((tag) => (
                        <NewInterestTag tag={tag} key={tag.linked_data_id} />
                    ))}
                </div>
            </section>
        </>
    );
};
