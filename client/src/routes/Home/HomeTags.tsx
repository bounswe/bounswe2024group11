import { NewInterestTag } from "../../components/interest-tag";
import { Tag } from "../Forum/Forum.schema";

export const RelatedTags = ({ tags }: { tags: Tag[] }) => {
    return (
        <>
            <section className="flex flex-col gap-4">
                <h2 className="flex items-center gap-2 text-lg font-medium text-slate-900">
                    <span>
                        Wanna explore new tags?
                        <span className="font-regular text-slate-500">
                            {" (^_^) "}
                        </span>
                    </span>
                    <span className="rounded-2 bg-slate-100 px-2 py-1 text-base font-regular text-slate-700">
                        {tags.length}
                    </span>
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
