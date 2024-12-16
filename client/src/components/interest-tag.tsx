import * as Ariakit from "@ariakit/react";
import { Button } from "@ariakit/react";
import { RiAddLine, RiCloseLine } from "@remixicon/react";
import { useFetcher } from "react-router-dom";
import { Tag } from "../routes/Forum/Forum.schema";
import {
    addInterestAction,
    deleteInterestAction,
} from "../routes/Profile/Profile.data";
import { buttonClass } from "./button";

export const InterestTag = ({ tag }: { tag: Tag }) => {
    const interestDeleteFetcher = useFetcher<typeof deleteInterestAction>();
    return (
        <interestDeleteFetcher.Form
            action={`/interest/delete/${tag.linked_data_id}`}
            method="POST"
        >
            <input
                type="hidden"
                name="linked_data_id"
                value={tag.linked_data_id}
            />
            <span
                key={tag.linked_data_id}
                className="transition-color flex items-center gap-2 rounded-1 bg-white text-slate-800 ring ring-slate-200"
            >
                <span className="py-1 pl-4 text-xs font-medium uppercase tracking-wide">
                    {tag.name}
                </span>
                <Ariakit.PopoverProvider>
                    <Ariakit.PopoverDisclosure className="flex-none p-2 hover:bg-slate-200 active:bg-red-100 active:text-red-800">
                        <RiCloseLine size={16} />
                        <span className="sr-only">Remove</span>
                    </Ariakit.PopoverDisclosure>
                    <Ariakit.Popover
                        gutter={8}
                        className="z-50 max-w-md rounded-2 bg-red-100 p-4 text-red-950 ring ring-red-800/20"
                    >
                        <Ariakit.PopoverArrow className="text-red-200" />
                        <Ariakit.PopoverHeading className="font-medium">
                            No longer interested?
                        </Ariakit.PopoverHeading>
                        <Ariakit.PopoverDescription className="text-balance text-sm text-red-950/70">
                            You want to delete{" "}
                            <span className="font-medium text-red-950">
                                {tag.name}
                            </span>{" "}
                            from your interests? If you want to bring that back,
                            you can do so from Home
                        </Ariakit.PopoverDescription>
                        <div className="mt-4 flex justify-start gap-2">
                            <Ariakit.Button
                                className={buttonClass({
                                    intent: "destructive",
                                    className: "ring-offset-red-200",
                                })}
                                type="submit"
                            >
                                Delete
                            </Ariakit.Button>
                        </div>
                    </Ariakit.Popover>
                </Ariakit.PopoverProvider>
            </span>
        </interestDeleteFetcher.Form>
    );
};

export const NewInterestTag = ({ tag }: { tag: Tag }) => {
    const interestAddFetcher = useFetcher<typeof addInterestAction>();
    return (
        <interestAddFetcher.Form
            action={`/interest/add/${tag.linked_data_id}`}
            method="POST"
        >
            <input
                type="hidden"
                name="linked_data_id"
                value={tag.linked_data_id}
            />
            <span
                key={tag.linked_data_id}
                className="transition-color flex items-center gap-2 rounded-1 bg-white text-slate-800 ring ring-slate-200"
            >
                <span className="py-1 pl-4 text-xs font-medium uppercase tracking-wide">
                    {tag.name}
                </span>
                <Button
                    type="submit"
                    className="flex-none p-2 hover:bg-slate-200 active:bg-slate-100 active:text-slate-800"
                >
                    <RiAddLine size={16} />

                    <span className="sr-only">Add</span>
                </Button>
            </span>
        </interestAddFetcher.Form>
    );
};

export const StaticTag = ({ tag }: { tag: Tag }) => {
    return (
        <span
            key={tag.linked_data_id}
            className="transition-color flex items-center gap-2 rounded-1 bg-white text-slate-800 ring ring-slate-200"
        >
            <span className="px-4 py-2 text-xs font-medium uppercase tracking-wide">
                {tag.name}
            </span>
        </span>
    );
};
