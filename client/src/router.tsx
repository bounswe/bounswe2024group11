import { RouteObject } from "react-router";
import { ErrorPage } from "./routes/_error";
import { Root } from "./routes/_root";
import { Achievements } from "./routes/Achievements/Achievements";
import { achievementsLoader } from "./routes/Achievements/Achievements.data";
import { Login } from "./routes/Auth/Login";
import { loginAction, loginLoader } from "./routes/Auth/Login.data";
import { logoutLoader } from "./routes/Auth/Logout.data";
import Register from "./routes/Auth/Register";
import { registerAction } from "./routes/Auth/Register.data";
import { Forum } from "./routes/Forum/Forum";
import {
    forumCreateAction,
    forumCreateLoader,
    forumLoader,
    forumShouldRevalidate,
} from "./routes/Forum/Forum.data";
import { NewForum } from "./routes/Forum/NewForum";
import { ForumQuestion } from "./routes/Forum/Question";
import {
    answerForumAction,
    bookmarkForumAction,
    deleteForumAction,
    downvoteForumAction,
    downvoteForumAnswerAction,
    forumQuestionLoader,
    upvoteForumAction,
    upvoteForumAnswerAction,
} from "./routes/Forum/Question.data";
import { Home } from "./routes/Home/Home";
import { homeLoader } from "./routes/Home/Home.data";
import { HomeMain } from "./routes/Home/Home.main";
import { Leaderboard } from "./routes/Leaderboard/Leaderboard";
import { leaderboardLoader } from "./routes/Leaderboard/Leaderboard.data";
import { Profile } from "./routes/Profile/Profile";
import { myProfileLoader, profileLoader } from "./routes/Profile/Profile.data";
import { NewQuiz } from "./routes/Quiz/NewQuiz/NewQuiz";
import {
    newQuizAction,
    newQuizLoader,
} from "./routes/Quiz/NewQuiz/NewQuiz.data";
import { TakeQuizPage } from "./routes/Quiz/Quiz";
import {
    quizLoader,
    quizReviewLoader,
    quizShouldRevalidate,
    takeQuizAction,
} from "./routes/Quiz/Quiz.data";
import { QuizReview } from "./routes/Quiz/Quiz.Review";
import { Quizzes } from "./routes/Quiz/Quizzes";
import { quizzesLoader } from "./routes/Quiz/Quizzes.data";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomeMain />,
                loader: homeLoader,
                id: "home-main",
                children: [
                    {
                        path: "/",
                        element: <Home />,
                        loader: homeLoader,
                        id: "home",
                    },
                    {
                        path: "achievements",
                        element: <Achievements />,
                        loader: achievementsLoader,
                    },
                    {
                        path: "leaderboard",
                        element: <Leaderboard />,
                        loader: leaderboardLoader,
                    },
                    {
                        path: "forum",
                        element: <Forum />,
                        loader: forumLoader,
                        shouldRevalidate: forumShouldRevalidate,
                    },
                    {
                        path: "forum/new",
                        element: <NewForum />,
                        loader: forumCreateLoader,
                        action: forumCreateAction,
                    },
                    {
                        path: "forum/:questionId",
                        element: <ForumQuestion />,
                        loader: forumQuestionLoader,
                        children: [
                            {
                                path: "bookmark",
                                action: bookmarkForumAction,
                            },
                            {
                                path: "upvote",
                                action: upvoteForumAction,
                            },
                            {
                                path: "downvote",
                                action: downvoteForumAction,
                            },
                            {
                                path: "answer",
                                action: answerForumAction,
                            },
                            {
                                path: "delete",
                                action: deleteForumAction,
                            },
                            {
                                path: "upvoteAnswer",
                                action: upvoteForumAnswerAction,
                            },
                            {
                                path: "downvoteAnswer",
                                action: downvoteForumAnswerAction,
                            },
                        ],
                    },
                    {
                        path: "quizzes",
                        element: <Quizzes />,
                        loader: quizzesLoader,
                        shouldRevalidate: quizShouldRevalidate,
                    },
                    {
                        path: "quizzes/new",
                        element: <NewQuiz />,
                        loader: newQuizLoader,
                        action: newQuizAction,
                        shouldRevalidate: quizShouldRevalidate,
                    },
                    {
                        path: "quizzes/:quizId/",
                        element: <TakeQuizPage />,
                        loader: quizLoader,
                        action: takeQuizAction,
                    },
                    {
                        path: "quizzes/:quizId/review",
                        element: <QuizReview />,
                        loader: quizReviewLoader,
                    },
                    {
                        path: "profile/",
                        element: <Profile />,
                        loader: myProfileLoader,
                    },
                    {
                        path: "profile/:username",
                        element: <Profile />,
                        loader: profileLoader,
                        children: [
                            {
                                path: "block",
                                action: BlockAction,
                            },
                            {
                                path: "unblock",
                                action: UnBlockAction,
                            },
                            {
                                path: "follow",
                                action: FollowAction,
                            },
                            {
                                path: "unfollow",
                                action: UnFollowAction,
                            },
                        ],
                    },
                ],
            },
            {
                path: "login",
                element: <Login />,
                action: loginAction,
                loader: loginLoader,
            },
            {
                path: "register",
                element: <Register />,
                action: registerAction,
            },
            {
                path: "logout",
                loader: logoutLoader,
                element: <Root />,
            },
        ],
    },
];
