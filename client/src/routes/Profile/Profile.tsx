import * as Ariakit from "@ariakit/react";
import { Button } from "@ariakit/react";
import { Suspense } from "react";
import { useFetcher, useParams } from "react-router-dom";
import {
    Await,
    useLoaderData,
    useRouteLoaderData,
} from "react-router-typesafe";
import { Avatar } from "../../components/avatar";
import { BookmarkedForum } from "../../components/bookmarked-forums";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { QuizzesTaken } from "../../components/quizzes-taken";
import { ProfileLoading } from "../_loading";
import { AchievementBadge } from "../Achievements/Badge";
import { homeLoader } from "../Home/Home.data";
import {
    BlockAction,
    FollowAction,
    profileLoader,
    UnBlockAction,
    UnFollowAction,
} from "./Profile.data";

export const Profile = () => {
    const { profileData } = useLoaderData<typeof profileLoader>();
    const blockFetcher = useFetcher<typeof BlockAction>();
    const unblockFetcher = useFetcher<typeof UnBlockAction>();
    const followFetcher = useFetcher<typeof FollowAction>();
    const unfollowFetcher = useFetcher<typeof UnFollowAction>();
    const { username } = useParams<{ username: string }>();
    const { user, logged_in } =
        useRouteLoaderData<typeof homeLoader>("home-main");

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
                    id,
                }) => {
                    const author = {
                        avatar: avatar,
                        full_name: full_name || "",
                        username: username || "",
                    };

                    return (
                        <main className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
                            <header className="flex flex-row items-center gap-4">
                                <Avatar author={author} size={96} />
                                <div className="flex-1">
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
                                {user?.username !== username && logged_in && (
                                    <>
                                        {!is_blocked ? (
                                            <blockFetcher.Form
                                                method="POST"
                                                action={`block/`}
                                            >
                                                <Button
                                                    className={buttonClass({
                                                        intent: "destructive",
                                                        size: "medium",
                                                    })}
                                                    type="submit"
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
                                            >
                                                <Button
                                                    className={buttonClass({
                                                        intent: "tertiary",
                                                        size: "medium",
                                                    })}
                                                    type="submit"
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
                                            >
                                                <Button
                                                    className={buttonClass({
                                                        intent: "destructive",
                                                        size: "medium",
                                                    })}
                                                    type="submit"
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
                                            >
                                                <Button
                                                    className={buttonClass({
                                                        intent: "secondary",
                                                        size: "medium",
                                                    })}
                                                    type="submit"
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
                                )}
                            </header>
                            <section className="z-20 flex w-full flex-row items-center justify-between">
                                <div className="flex flex-col gap-2">
                                    <h2 className="font-medium">
                                        Achievements
                                    </h2>
                                    <ul
                                        className="flex flex-row gap-4"
                                        role="list"
                                        aria-label="User achievements"
                                    >
                                        {achievements
                                            .filter((a) => a.earned_at !== null)
                                            .map((a) => (
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
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span
                                        className="rounded-2 bg-cyan-100 px-4 py-1 text-center text-lg font-medium text-cyan-900"
                                        role="status"
                                        aria-label="User score"
                                    >
                                        {score}
                                    </span>
                                </div>
                            </section>
                            <BookmarkedForum forums={bookmarked_forums} />
                            <Ariakit.Separator className="my-4" />
                            <QuizzesTaken
                                quizzes={quizzes_taken}
                            ></QuizzesTaken>
                        </main>
                    );
                }}
            </Await>
        </Suspense>
    );
};
