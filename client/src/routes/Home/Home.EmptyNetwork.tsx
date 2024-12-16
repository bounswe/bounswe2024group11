import { RiUser5Line } from "@remixicon/react";
import { Link } from "react-router-dom";
import { buttonClass, buttonInnerRing } from "../../components/button";

export const HomeEmptyNetwork = () => {
    return (
        <div className="max-auto flex max-w-2xl flex-col items-center gap-4 self-center py-6 text-center">
            <div className="rounded-full bg-slate-100 p-5">
                <RiUser5Line className="h-7 text-slate-400" size={32} />
            </div>
            <div className="flex flex-col items-center gap-4">
                <p className="text-base text-slate-600">
                    Hey, you are not following anyone yet. <br />
                    Why not start simple and explore the forum?
                </p>
                <Link
                    to="/forum/"
                    className={buttonClass({
                        intent: "secondary",
                        size: "medium",
                    })}
                    role="button"
                    aria-label="Start exploring the forum"
                >
                    <span
                        className={buttonInnerRing({
                            intent: "secondary",
                        })}
                        aria-hidden="true"
                    />
                    <span>Discover Forum</span>
                </Link>
            </div>
        </div>
    );
};
