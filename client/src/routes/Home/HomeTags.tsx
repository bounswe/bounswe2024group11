import { Button } from "@ariakit/react";
import { buttonClass } from "../../components/button";
import { Tag } from "../Forum/Forum.schema";

export const RelatedTags = ({ tags }: { tags: Tag[] }) => {
    return (
        <>
            <section className="flex flex-col gap-4">
                <h2 className="flex items-center gap-2 text-lg font-medium text-slate-900">
                    <span>
                        Your Interests
                        <span className="font-regular text-slate-500">
                            {" (^_^) "}
                        </span>
                    </span>
                    <span className="rounded-2 bg-slate-100 px-2 py-1 text-base font-regular text-slate-700">
                        {tags.length}
                    </span>
                </h2>
                <div className="flex flex-col gap-2">
                    {tags.map((tag) => (
                        <Button
                            key={tag.linked_data_id}
                            className={buttonClass({
                                intent: "secondary",
                                size: "medium",
                            })}
                        >
                            <span>{tag.name}</span>
                        </Button>
                    ))}
                </div>
            </section>
        </>
    );
};
