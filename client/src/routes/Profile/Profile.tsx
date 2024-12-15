import * as Ariakit from "@ariakit/react";
import { Button } from "@ariakit/react";
import { RiArrowRightLine } from "@remixicon/react";
import { Suspense, useState } from "react";
import { Link, useFetcher, useParams } from "react-router-dom";
import {
    Await,
    useLoaderData,
    useRouteLoaderData,
} from "react-router-typesafe";
import { Avatar } from "../../components/avatar";
import { buttonClass, buttonInnerRing } from "../../components/button";
import { ForumQuestionCard } from "../../components/forum-card";
import { QuizCard } from "../../components/quiz-card";
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
    const [dialogOpen, setDialogOpen] = useState(false);

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
                                        Achievements{" "}
                                        <span className="text-sm text-slate-500">
                                            ({earnedAchievements.length})
                                        </span>
                                    </h2>

                                    <div className="flex items-center gap-4">
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
                                                See All
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
                                                <Ariakit.PopoverDescription className="text-balance text-slate-300">
                                                    You can earn Turquiz points
                                                    by completing quizzes.{" "}
                                                    <br />
                                                    You will get a point for
                                                    each correct answer in a
                                                    quiz from 10 points to 30
                                                    points depending on the
                                                    difficulty of the quiz.
                                                </Ariakit.PopoverDescription>
                                                <hr className="border-slate-700" />
                                                <Ariakit.PopoverDescription className="text-balance text-slate-300">
                                                    Using a hint in a question
                                                    will decrease the points
                                                    earned by 50%. There's no
                                                    penalty for incorrect
                                                    answers.
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
                            <Ariakit.Separator className="my-4" />
                            <section
                                aria-label="User posts"
                                className="flex flex-col gap-4"
                            >
                                <h2 className="flex items-center gap-2 text-lg font-medium text-slate-900">
                                    <span>Bookmarked Forum Questions</span>
                                    <span className="rounded-2 bg-slate-100 px-2 py-1 text-base font-regular text-slate-700">
                                        {bookmarked_forums.length}
                                    </span>
                                </h2>
                                <div className="grid w-full grid-cols-1 flex-col items-center gap-8 md:grid-cols-2">
                                    {bookmarked_forums.map((post) => (
                                        <ForumQuestionCard
                                            onTagClick={() => {}}
                                            key={post.id}
                                            question={post}
                                        />
                                    ))}
                                </div>
                            </section>
                            <Ariakit.Separator className="my-4" />
                            <section
                                aria-label="User posts"
                                className="flex flex-col gap-4"
                            >
                                <h2 className="flex items-center gap-2 text-lg font-medium text-slate-900">
                                    <span>Quizzes Taken</span>
                                    <span className="rounded-2 bg-slate-100 px-2 py-1 text-base font-regular text-slate-700">
                                        {quizzes_taken.length}
                                    </span>
                                </h2>
                                <div className="grid w-full grid-cols-1 flex-col items-center gap-8 md:grid-cols-2">
                                    {quizzes_taken.map((quiz) => (
                                        <QuizCard
                                            quiz_key={String(quiz.id)}
                                            quiz={quiz}
                                            onTagClick={() => {}}
                                        />
                                    ))}
                                </div>
                            </section>
                        </main>
                    );
                }}
            </Await>
        </Suspense>
    );
};
