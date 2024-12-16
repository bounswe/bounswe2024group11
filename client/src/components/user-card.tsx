import { Button } from "@ariakit/react";
import { useState } from "react";
import { Link, useFetcher } from "react-router-dom";
import { FollowAction } from "../routes/Profile/Profile.data";
import { Author } from "../schemas";
import { Avatar } from "./avatar";
import { buttonClass, buttonInnerRing } from "./button";

export const UserCard = ({ user }: { user: Author }) => {
    const followFetcher = useFetcher<typeof FollowAction>();
    const [isFollowDisabled, setIsFollowDisabled] = useState(false);
    return (
        <div className="flex gap-4 rounded-1 bg-white p-4 ring ring-slate-200">
            <Link
                to={`/profile/${user.username}`}
                className="flex flex-row items-center gap-4"
            >
                <Avatar author={user} size={48} />
                <div className="flex w-full max-w-48 flex-col items-start">
                    <span className="font-medium text-slate-900">
                        {user.full_name}
                    </span>
                    <p className="text-sm text-slate-500">@{user.username}</p>
                </div>
            </Link>
            <followFetcher.Form
                method="POST"
                action={`follow/`}
                onSubmit={() => setIsFollowDisabled(true)}
            >
                <Button
                    className={buttonClass({
                        intent: "secondary",
                        size: "medium",
                        className: "w-20",
                    })}
                    type="submit"
                    disabled={isFollowDisabled}
                >
                    <span
                        className={buttonInnerRing({
                            intent: "secondary",
                        })}
                    />
                    <span>Follow</span>
                </Button>
                <input type="hidden" name="following" value={user.id}></input>
            </followFetcher.Form>
        </div>
    );
};
