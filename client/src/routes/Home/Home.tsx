import { Button, Separator } from "@ariakit/react";
import { Suspense, useState } from "react";
import {
    Await,
    useLoaderData,
    useRouteLoaderData,
} from "react-router-typesafe";
import { buttonClass } from "../../components/button";
import { ForumQuestionCard } from "../../components/forum-card";
import { QuizCard } from "../../components/quiz-card";
import { radioOptionClass } from "../../components/radio-option";
import { ForumQuestion, Tag } from "../Forum/Forum.schema";
import { QuizDetails } from "../Quiz/Quiz.schema";
import { homeLoader, userLoader } from "./Home.data";
import { HomeStaticContent } from "./HomeStatic";

const INITIAL_DISPLAY_COUNT = 6;
const LOAD_MORE_COUNT = 6;

const HomeForumFeed = ({
    forumQuestions,
    title,
}: {
    forumQuestions: ForumQuestion[];
    title: string;
}) => {
    const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
    const displayedForums = forumQuestions.slice(0, displayCount);

    const hasMore = displayCount < forumQuestions.length;

    return (
        <section className="flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-medium text-slate-900">
                <span>{title}</span>
                <span className="rounded-2 bg-slate-100 px-2 py-1 text-base font-regular text-slate-700">
                    {displayedForums.length}
                </span>
            </h2>
            <div className="grid w-full grid-cols-1 flex-col items-center gap-10 md:grid-cols-2">
                {displayedForums.map((post) => (
                    <ForumQuestionCard
                        key={post.id}
                        question={post}
                    ></ForumQuestionCard>
                ))}
            </div>
            {hasMore && (
                <div className="mt-4 flex justify-center">
                    <Button
                        onClick={() =>
                            setDisplayCount((prev) => prev + LOAD_MORE_COUNT)
                        }
                        className={buttonClass({
                            intent: "primary",
                            size: "medium",
                        })}
                    >
                        Load More
                    </Button>
                </div>
            )}
        </section>
    );
};

const HomeQuizFeed = ({
    quizzes,
    title,
}: {
    quizzes: QuizDetails[];
    title: string;
}) => {
    const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
    const displayedQuizzes = quizzes.slice(0, displayCount);
    const hasMore = displayCount < quizzes.length;

    return (
        <section className="flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-medium text-slate-900">
                <span>{title}</span>
                <span className="rounded-2 bg-slate-100 px-2 py-1 text-base font-regular text-slate-700">
                    {displayedQuizzes.length}
                </span>
            </h2>
            <div className="grid w-full grid-cols-1 flex-col items-center gap-10 md:grid-cols-2">
                {displayedQuizzes.map((quiz) => (
                    <QuizCard
                        key={quiz.id}
                        quiz_key={String(quiz.id)}
                        quiz={quiz}
                        onTagClick={() => {}}
                    />
                ))}
            </div>
            {hasMore && (
                <div className="mt-4 flex justify-center">
                    <Button
                        onClick={() =>
                            setDisplayCount((prev) => prev + LOAD_MORE_COUNT)
                        }
                        className={buttonClass({
                            intent: "primary",
                            size: "medium",
                        })}
                    >
                        Load More
                    </Button>
                </div>
            )}
        </section>
    );
};

const RelatedTags = ({ tags }: { tags: Tag[] }) => {
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

const availableFeedTypes = ["personal", "your network", "forum", "quiz"];

const fakeInterests = [
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

    const { feedData, profileData } = useLoaderData<typeof homeLoader>();

    const title = logged_in
        ? "Welcome " + user.full_name
        : "Welcome to Turquiz";

    const description = logged_in
        ? `While you were away, we have gathered some content for you.`
        : "Turquiz is a platform that helps you to get prolific in English. You can take quizzes and use forums to improve your English.";
    return (
        <div className="container flex max-w-screen-xl flex-col items-stretch gap-8 py-12">
            <Suspense fallback={<> </>}>
                <Await
                    resolve={Promise.all([feedData, profileData])}
                    children={([feedData, profileData]) => {
                        const interests =
                            feedData?.forum_questions_by_interests;
                        const profileComplete =
                            interests && interests.length >= 3;
                        const score = profileData?.score;

                        const [feedType, setFeedType] =
                            useState<(typeof availableFeedTypes)[number]>(
                                "interest",
                            );

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
                                                300 TP
                                            </span>
                                        </span>
                                    </figure>
                                    <div className="flex flex-1 flex-col items-center gap-1">
                                        <h1 className="font-display text-4xl font-medium">
                                            {title}
                                        </h1>
                                        <p className="max-w-xl text-balance text-lg text-slate-500">
                                            {description}
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-3">
                                            {fakeInterests.map((tag) => (
                                                <Button
                                                    key={tag.linked_data_id}
                                                    className="rounded-1 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-800 ring ring-slate-200 transition-colors hover:bg-slate-200"
                                                >
                                                    <span>{tag.name}</span>
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="mx-auto flex gap-1 self-start rounded-full bg-slate-50 p-1 ring ring-slate-200">
                                    {" "}
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
                                                    setFeedType(e.target.value)
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
                                <Separator className="border-slate-200" />
                                <RelatedTags
                                    tags={
                                        feedData.related_tags_for_forum_questions
                                    }
                                />
                                <HomeForumFeed
                                    forumQuestions={
                                        feedData.forum_questions_by_followed_users
                                    }
                                    title="Forum Questions by Followed Users"
                                />
                                <Separator className="border-slate-200" />
                                <HomeQuizFeed
                                    quizzes={feedData.quizzes_by_followed_users}
                                    title="Quizzes by Followed Users"
                                />
                                <Separator className="border-slate-200" />
                                <HomeForumFeed
                                    forumQuestions={
                                        feedData.forum_questions_by_interests
                                    }
                                    title="Forum Questions by Interests"
                                />
                                <Separator className="border-slate-200" />
                                <HomeQuizFeed
                                    quizzes={feedData.quizzes_by_interests}
                                    title="Quizzes by Interests"
                                />
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
