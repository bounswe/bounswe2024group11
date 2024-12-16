import * as Ariakit from "@ariakit/react";
import { Button } from "@ariakit/react";
import { RiArrowRightLine } from "@remixicon/react";
import { Suspense, useEffect, useState } from "react";
import { Link, useFetcher, useParams } from "react-router-dom";
import {
    Await,
    useLoaderData,
    useRouteLoaderData,
} from "react-router-typesafe";
import { Avatar } from "../../components/avatar";
import { BlockingModal } from "../../components/blockings-modal";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { InterestTag, StaticTag } from "../../components/interest-tag";
import { pluralize } from "../../utils";
import { ProfileLoading } from "../_loading";
import { AchievementBadge } from "../Achievements/Badge";
import { userLoader } from "../Home/Home.data";
import { BookmarkedForum } from "./BookmarkedForumQuestions";
import {
    BlockAction,
    FollowAction,
    profileLoader,
    UnBlockAction,
    UnFollowAction,
} from "./Profile.data";
import { QuizzesTaken } from "./QuizzesTaken";

export const Profile = () => {
    const { profileData } = useLoaderData<typeof profileLoader>();
    const blockFetcher = useFetcher<typeof BlockAction>();
    const unblockFetcher = useFetcher<typeof UnBlockAction>();
    const followFetcher = useFetcher<typeof FollowAction>();
    const unfollowFetcher = useFetcher<typeof UnFollowAction>();
    const { username } = useParams<{ username: string }>();
    const { user, logged_in } =
        useRouteLoaderData<typeof userLoader>("home-main");
    const [dialogOpen, setDialogOpen] = useState(false);

    const [isBlockDisabled, setIsBlockDisabled] = useState(false);
    const [isUnblockDisabled, setIsUnblockDisabled] = useState(false);
    const [isFollowDisabled, setIsFollowDisabled] = useState(false);
    const [isUnfollowDisabled, setIsUnfollowDisabled] = useState(false);
    const isMe = user?.username === username;

    useEffect(() => {
        if (blockFetcher.state === "idle") {
            setIsBlockDisabled(false);
        }
    }, [blockFetcher.state]);

    useEffect(() => {
        if (unblockFetcher.state === "idle") {
            setIsUnblockDisabled(false);
        }
    }, [unblockFetcher.state]);

    useEffect(() => {
        if (followFetcher.state === "idle") {
            setIsFollowDisabled(false);
        }
    }, [followFetcher.state]);

    useEffect(() => {
        if (unfollowFetcher.state === "idle") {
            setIsUnfollowDisabled(false);
        }
    }, [unfollowFetcher.state]);

    return (
        <Suspense fallback={<ProfileLoading />}>
            <Await resolve={profileData}>
                {({
                    bookmarked_forums,
                    full_name,
                    avatar,
                    achievements,
                    score,
                    quizzes_taken,
                    is_blocked,
                    is_following,
                    blockings,
                    id,
                    interests,
                    followers,
                    followings,
                }) => {
                    const author = {
                        avatar: avatar,
                        full_name: full_name || "",
                        username: username || "",
                    };
                    const earnedAchievements = achievements.filter(
                        (a) => a.earned_at !== null,
                    );
                    const displayedAchievements = earnedAchievements
                        .reverse()
                        .slice(0, 5);
                    const remainingCount = Math.max(
                        0,
                        earnedAchievements.length - 5,
                    );

                    return (
                        <main className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
                            <header className="flex flex-col items-stretch gap-6">
                                <div className="flex flex-row items-center gap-4">
                                    <Avatar author={author} size={96} />
                                    <div className="flex-1">
                                        <div>
                                            <h1 className="pt-2 text-2xl font-semibold">
                                                {full_name}
                                            </h1>
                                            <p
                                                className="text-lg text-slate-500"
                                                aria-label="Username"
                                            >
                                                @{username}
                                            </p>
                                        </div>
                                    </div>
                                    {!isMe ? (
                                        <>
                                            {!is_blocked ? (
                                                <blockFetcher.Form
                                                    method="POST"
                                                    action={`block/`}
                                                    onSubmit={() =>
                                                        setIsBlockDisabled(true)
                                                    }
                                                >
                                                    <Button
                                                        className={buttonClass({
                                                            intent: "destructive",
                                                            size: "medium",
                                                            className: "w-20",
                                                        })}
                                                        type="submit"
                                                        disabled={
                                                            isBlockDisabled
                                                        }
                                                    >
                                                        <span
                                                            className={buttonInnerRing(
                                                                {
                                                                    intent: "destructive",
                                                                },
                                                            )}
                                                        />
                                                        <span>Block</span>
                                                    </Button>
                                                    <input
                                                        type="hidden"
                                                        name="blocking"
                                                        value={id}
                                                    ></input>
                                                </blockFetcher.Form>
                                            ) : (
                                                <unblockFetcher.Form
                                                    method="POST"
                                                    action={`unblock/`}
                                                    onSubmit={() =>
                                                        setIsUnblockDisabled(
                                                            true,
                                                        )
                                                    }
                                                >
                                                    <Button
                                                        className={buttonClass({
                                                            intent: "tertiary",
                                                            size: "medium",
                                                            className: "w-20",
                                                        })}
                                                        type="submit"
                                                        disabled={
                                                            isUnblockDisabled
                                                        }
                                                    >
                                                        <span
                                                            className={buttonInnerRing(
                                                                {
                                                                    intent: "tertiary",
                                                                },
                                                            )}
                                                        />
                                                        <span>Unblock</span>
                                                    </Button>
                                                    <input
                                                        type="hidden"
                                                        name="blocking"
                                                        value={is_blocked}
                                                    ></input>
                                                </unblockFetcher.Form>
                                            )}
                                            {is_following ? (
                                                <unfollowFetcher.Form
                                                    method="POST"
                                                    action={`unfollow/`}
                                                    onSubmit={() =>
                                                        setIsUnfollowDisabled(
                                                            true,
                                                        )
                                                    }
                                                >
                                                    <Button
                                                        className={buttonClass({
                                                            intent: "destructive",
                                                            size: "medium",
                                                            className: "w-20",
                                                        })}
                                                        type="submit"
                                                        disabled={
                                                            isUnfollowDisabled
                                                        }
                                                    >
                                                        <span
                                                            className={buttonInnerRing(
                                                                {
                                                                    intent: "destructive",
                                                                },
                                                            )}
                                                        />
                                                        <span>Unfollow</span>
                                                    </Button>
                                                    <input
                                                        type="hidden"
                                                        name="following"
                                                        value={is_following}
                                                    ></input>
                                                </unfollowFetcher.Form>
                                            ) : (
                                                <followFetcher.Form
                                                    method="POST"
                                                    action={`follow/`}
                                                    onSubmit={() =>
                                                        setIsFollowDisabled(
                                                            true,
                                                        )
                                                    }
                                                >
                                                    <Button
                                                        className={buttonClass({
                                                            intent: "secondary",
                                                            size: "medium",
                                                            className: "w-20",
                                                        })}
                                                        type="submit"
                                                        disabled={
                                                            isFollowDisabled
                                                        }
                                                    >
                                                        <span
                                                            className={buttonInnerRing(
                                                                {
                                                                    intent: "secondary",
                                                                },
                                                            )}
                                                        />
                                                        <span>Follow</span>
                                                    </Button>
                                                    <input
                                                        type="hidden"
                                                        name="following"
                                                        value={id}
                                                    ></input>
                                                </followFetcher.Form>
                                            )}
                                        </>
                                    ) : null}
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="rounded-1 bg-slate-800 px-2 py-1 text-sm font-medium text-slate-100">
                                        {pluralize(
                                            followers.length,
                                            "follower",
                                            "followers",
                                        )}
                                    </span>{" "}
                                    <span className="rounded-1 bg-slate-800 px-2 py-1 text-sm font-medium text-slate-100">
                                        {pluralize(
                                            followings.length,
                                            "following",
                                            "followings",
                                        )}
                                    </span>
                                </div>
                            </header>
                            <Ariakit.Separator className="ring-slate-200" />

                            <section>
                                <div className="flex flex-wrap gap-3">
                                    {interests.map((tag) => {
                                        if (!tag) return null;
                                        if (isMe)
                                            return (
                                                <InterestTag
                                                    key={tag.linked_data_id}
                                                    tag={tag}
                                                />
                                            );
                                        return (
                                            <StaticTag
                                                key={tag.linked_data_id}
                                                tag={tag}
                                            />
                                        );
                                    })}
                                </div>
                            </section>
                            <Ariakit.Separator className="ring-slate-200" />
                            <section className="z-20 flex w-full flex-row items-center justify-between">
                                <div className="flex flex-col gap-2">
                                    <h2 className="font-medium">
                                        Achievements{" "}
                                        <span className="text-sm text-slate-500">
                                            ({earnedAchievements.length})
                                        </span>
                                    </h2>

                                    <div className="flex flex-col items-start gap-4">
                                        <ul
                                            className="flex flex-row gap-4"
                                            role="list"
                                            aria-label="User achievements"
                                        >
                                            {displayedAchievements.map((a) => (
                                                <li key={a.achievement.slug}>
                                                    <AchievementBadge
                                                        achievement={
                                                            a.achievement
                                                        }
                                                        is_earned={true}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                        {remainingCount > 0 && (
                                            <Link
                                                to="/achievements"
                                                className={buttonClass({
                                                    intent: "ghost",
                                                    icon: "right",
                                                })}
                                            >
                                                All Turquiz Badges
                                                <RiArrowRightLine size={16} />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Ariakit.PopoverProvider
                                        open={dialogOpen}
                                        setOpen={setDialogOpen}
                                        placement="bottom-end"
                                    >
                                        <Ariakit.PopoverDisclosure
                                            aria-label="Open the dialog for score information"
                                            className={buttonClass({
                                                intent: "secondary",
                                                size: "medium",
                                            })}
                                        >
                                            <span
                                                aria-label={
                                                    "Your score:" + score
                                                }
                                                role="status"
                                            >
                                                {score} TP
                                            </span>
                                        </Ariakit.PopoverDisclosure>
                                        <Ariakit.Popover className="top-2 flex max-w-lg flex-col gap-2 overflow-hidden rounded-2 bg-slate-800 text-white shadow-lg ring-1 ring-slate-900">
                                            <Ariakit.PopoverHeading className="bg-slate-900 p-5 text-2xl font-medium">
                                                {score} Turquiz Points
                                            </Ariakit.PopoverHeading>
                                            <div className="flex flex-col gap-4 px-6 pb-6 pt-3">
                                                <Ariakit.PopoverDescription className="flex flex-col gap-2 text-balance text-slate-300">
                                                    <span className="text-slate-100">
                                                        Here's how points work:
                                                    </span>
                                                    Get quiz questions right,
                                                    earn TP points! Easy quizzes
                                                    get you 10, tough ones get
                                                    you 30. Using hints costs
                                                    half your points, but wrong
                                                    answers? No sweat!
                                                </Ariakit.PopoverDescription>

                                                <Ariakit.Button
                                                    className={buttonClass({
                                                        intent: "ghost",
                                                        className: "mt-3",
                                                    })}
                                                    onClick={() => {
                                                        setDialogOpen(false);
                                                    }}
                                                >
                                                    OK
                                                </Ariakit.Button>
                                            </div>
                                        </Ariakit.Popover>
                                    </Ariakit.PopoverProvider>
                                </div>
                            </section>
                            <Ariakit.Separator className="ring-slate-200" />

                            <BookmarkedForum forums={bookmarked_forums} />

                            <Ariakit.Separator className="my-4" />
                            <QuizzesTaken
                                quizzes={quizzes_taken}
                            ></QuizzesTaken>
                            <Ariakit.Separator className="my-4" />
                            {isMe && <BlockingModal blockings={blockings} />}
                        </main>
                    );
                }}
            </Await>
        </Suspense>
    );
};
