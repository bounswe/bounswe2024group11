import { Button } from "@ariakit/react";
import { RiExternalLinkLine } from "@remixicon/react";
import { Link, useFetcher } from "react-router-dom";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { inputClass } from "../../components/input";
import { proficiencyChangeAction } from "./Profile.data";

export const ProficiencyChange = ({
    proficiency,
    username,
}: {
    proficiency: 1 | 2 | 3 | null;
    username: string | undefined;
}) => {
    const proficiencyFetcher = useFetcher<typeof proficiencyChangeAction>();
    const isSubmitting = proficiencyFetcher.state === "submitting";

    if (!proficiency) return null;
    if (!username) return null;

    return (
        <proficiencyFetcher.Form
            className="flex flex-col items-start gap-4"
            action={`/profile/${username}/proficiency/`}
            method="POST"
        >
            <div className="flex items-end gap-6">
                <label className="flex flex-col items-start gap-2">
                    <span className="text-sm font-medium">
                        Change Your Proficiency
                    </span>
                    <input
                        type="hidden"
                        name="username"
                        value={username}
                    ></input>

                    <select
                        defaultValue={proficiency}
                        name="proficiency"
                        disabled={isSubmitting}
                        className={inputClass({
                            className: "w-48",
                        })}
                    >
                        <option value="1">Beginner (1-8)</option>
                        <option value="2">Intermediate (9-16)</option>
                        <option value="3">Advanced (17-25)</option>
                    </select>
                </label>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={buttonClass({
                        icon: "left",
                        intent: "secondary",
                        size: "medium",
                        className: "w-20",
                    })}
                >
                    {isSubmitting ? "Saving..." : "Save"}
                    <span
                        className={buttonInnerRing({
                            intent: "secondary",
                        })}
                    ></span>
                </Button>
            </div>
            <Link
                role="link"
                aria-label="Evaluate Your English Proficiency"
                rel="noreferrer"
                target="_blank"
                to="https://www.cambridgeenglish.org/test-your-english/general-english/"
                className="flex items-center gap-2 text-cyan-800 underline-offset-2 hover:text-cyan-950 hover:underline"
            >
                <span className="text-sm font-medium">
                    Evaluate Your English Proficiency
                </span>
                <RiExternalLinkLine className="h-4 w-4" />
            </Link>
        </proficiencyFetcher.Form>
    );
};
