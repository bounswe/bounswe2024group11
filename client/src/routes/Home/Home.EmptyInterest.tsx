import { RiPenNibLine } from "@remixicon/react";
import { useState } from "react";
import { useFetcher } from "react-router-dom";
import { inputClass, labelClass } from "../../components/input";
import { Tag } from "../Forum/Forum.schema";
import { interestAction } from "./Home.data";

export const HomeEmptyInterest = () => {
    const interestFetcher = useFetcher<typeof interestAction>();
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    return (
        <div className="max-auto flex max-w-2xl flex-col items-center gap-4 self-center py-4 text-center">
            <div className="rounded-full bg-slate-100 p-5">
                <RiPenNibLine className="h-7 text-slate-400" size={32} />
            </div>
            <div className="flex flex-col items-center gap-4">
                <p className="text-base text-slate-600">
                    We have no idea what you are interested in. <br />
                    Search for tags and we'll customize your feed for you.
                </p>
            </div>
            <interestFetcher.Form className="self-stretch">
                <fieldset className="flex w-full flex-col items-stretch gap-2 text-start">
                    <input type="hidden" name="interests" value="empty" />
                    <label
                        className={labelClass({
                            className: "flex-1",
                        })}
                    >
                        Search for tags
                        <input
                            type="text"
                            className={inputClass()}
                            placeholder="automobile, fashion, tech, sports"
                            required
                            aria-label="Search for tags"
                        />
                    </label>
                </fieldset>
            </interestFetcher.Form>
        </div>
    );
};
