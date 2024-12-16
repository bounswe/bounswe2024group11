import { Separator } from "@ariakit/react";
import { Suspense, useState } from "react";
import {
    Await,
    useLoaderData,
    useRouteLoaderData,
} from "react-router-typesafe";
import { InterestTag } from "../../components/interest-tag";
import { radioOptionClass } from "../../components/radio-option";
import { QuizLoading } from "../_loading";
import { homeLoader, userLoader } from "./Home.data";
import { HomeEmptyInterest } from "./Home.EmptyInterest";
import { HomeEmptyNetwork } from "./Home.EmptyNetwork";
import { AddInterestBlock } from "./HomeAddInterest";
import { HomeForumFeed } from "./HomeForum";
import { HomeQuizFeed } from "./HomeQuiz";
import { HomeStaticContent } from "./HomeStatic";
import { RelatedTags } from "./HomeTags";

export const INITIAL_DISPLAY_COUNT = 6;
export const LOAD_MORE_COUNT = 6;

type FeedType = "personal" | "network" | "forum" | "quiz";
const availableFeedTypes: FeedType[] = ["personal", "network"];

export const fakeInterests = [
    {
        id: 1,
        name: "Technology",
        linked_data_id: "bn:00030858n",
        description:
            "The practical application of science to commerce or industry",
    },
    {
        id: 2,
        name: "Art",
        linked_data_id: "bn:00030858n",
        description:
            "The practical application of science to commerce or industry",
    },
    {
        id: 3,
        name: "Sports",
        linked_data_id: "bn:00030858n",
        description:
            "The practical application of science to commerce or industry",
    },
];

export const Home = () => {
    const { logged_in, user } =
        useRouteLoaderData<typeof userLoader>("home-main");
    const rawData = useLoaderData<typeof homeLoader>();

    const [feedType, setFeedType] = useState<FeedType>("personal");

    if (rawData === null)
        return (
            <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
                <HomeStaticContent />
                <Separator className="border-slate-200" />
            </div>
        );
    const { data } = rawData;
    const title = logged_in
        ? "Welcome " + user.full_name
        : "Welcome to Turquiz";
    const description = logged_in
        ? `Look what we found for you! Fresh content, just for you`
        : "Turquiz is a platform that helps you to get prolific in English. You can take quizzes and use forums to improve your English.";

    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <Suspense fallback={<QuizLoading />}>
                <Await
                    resolve={data}
                    children={({ feedData, profileData }) => {
                        const score = profileData?.score;
                        const hasNotInterests =
                            profileData.interests.length === 0;
                        const hasNoFollowings =
                            profileData.followings.length === 0;

                        return (
                            <>
                                <div className="flex flex-1 flex-col items-center gap-6 rounded-4 bg-slate-50 py-10">
                                    <figure className="relative h-24 w-24">
                                        <img
                                            src={profileData?.avatar}
                                            alt="Turquiz App Logo"
                                            className="h-24 w-24 rounded-full object-cover"
                                            height={96}
                                            width={96}
                                        />
                                        <span className="absolute bottom-0 left-0 right-0 -mb-4 flex justify-center">
                                            <span className="flex h-8 min-w-8 items-center justify-center rounded-full border-2 border-cyan-800 bg-cyan-900 px-2 text-center text-sm font-medium text-white ring-4 ring-cyan-900/20">
                                                {score} TP
                                            </span>
                                        </span>
                                    </figure>
                                    <div className="flex flex-1 flex-col items-center gap-1">
                                        <h1 className="font-display text-4xl font-medium">
                                            {title}
                                        </h1>
                                        <p className="max-w-2xl text-balance text-center text-base text-slate-500">
                                            {hasNotInterests
                                                ? "Hey, looks like you are new around here. Let's explore Turquiz together."
                                                : description}
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-3">
                                            {profileData.interests.map(
                                                (tag) => (
                                                    <InterestTag tag={tag} />
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="mx-auto flex gap-1 self-start rounded-full bg-slate-50 p-1 ring ring-slate-200">
                                    {availableFeedTypes.map((option) => (
                                        <label
                                            key={option}
                                            className="flex cursor-pointer items-center gap-2"
                                        >
                                            <input
                                                type="radio"
                                                value={option}
                                                checked={feedType === option}
                                                onChange={(e) =>
                                                    setFeedType(
                                                        e.target
                                                            .value as FeedType,
                                                    )
                                                }
                                                className="sr-only"
                                            />
                                            <span
                                                className={radioOptionClass({
                                                    selected:
                                                        feedType === option,
                                                    className: "min-w-32",
                                                })}
                                            >
                                                {option}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                <span className="text-sm uppercase tracking-widest text-slate-600">
                                    {feedType === "personal"
                                        ? "Based on your interests"
                                        : "From the people you follow"}
                                </span>

                                <Separator className="border-slate-200" />

                                {feedType === "personal" && hasNotInterests && (
                                    <>
                                        <HomeEmptyInterest />
                                        <AddInterestBlock />
                                    </>
                                )}

                                {feedType === "personal" &&
                                    !hasNotInterests && (
                                        <>
                                            <RelatedTags
                                                tags={
                                                    feedData.related_tags_for_forum_questions
                                                }
                                            />
                                            <Separator className="border-slate-200" />
                                            <HomeForumFeed
                                                forumQuestions={
                                                    feedData.forum_questions_by_interests
                                                }
                                                title="Forum Questions For You"
                                            />
                                            <Separator className="border-slate-200" />
                                            <HomeQuizFeed
                                                quizzes={
                                                    feedData.quizzes_by_interests
                                                }
                                                title="Quizzes For You"
                                            />
                                        </>
                                    )}

                                {feedType === "network" && hasNoFollowings && (
                                    <HomeEmptyNetwork />
                                )}

                                {feedType === "network" && !hasNoFollowings && (
                                    <>
                                        <HomeForumFeed
                                            forumQuestions={
                                                feedData.forum_questions_by_followed_users
                                            }
                                            title="Recent Forum Questions"
                                        />
                                        <Separator className="border-slate-200" />
                                        <HomeQuizFeed
                                            quizzes={
                                                feedData.quizzes_by_followed_users
                                            }
                                            title="Recent Quizzes"
                                        />
                                    </>
                                )}

                                {feedType === "forum" && (
                                    <HomeForumFeed
                                        forumQuestions={[
                                            ...feedData.forum_questions_by_interests,
                                            ...feedData.forum_questions_by_followed_users,
                                        ]}
                                        title="All Forums"
                                    />
                                )}

                                {feedType === "quiz" && (
                                    <HomeQuizFeed
                                        quizzes={[
                                            ...feedData.quizzes_by_interests,
                                            ...feedData.quizzes_by_followed_users,
                                        ]}
                                        title="All Quizzes"
                                    />
                                )}

                                <Separator className="border-slate-200" />
                                <HomeStaticContent />
                                <Separator className="border-slate-200" />
                            </>
                        );
                    }}
                />
            </Suspense>
        </div>
    );
};
