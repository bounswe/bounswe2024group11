import { RouteObject } from "react-router-dom";
import { ErrorPage } from "./routes/_error";
import { Root } from "./routes/_root";
import { Register } from "./routes/Auth/Register";
import { Forum } from "./routes/Forum/Forum";
import { ForumQuestion } from "./routes/Forum/Question";
import { Home } from "./routes/Home/Home";
import { HomeMain } from "./routes/Home/Home.main";
import { Leaderboard } from "./routes/Leaderboard/Leaderboard";
import { leaderboardLoader } from "./routes/Leaderboard/Leaderboard.data";

import { Login } from "./routes/Auth/Login";
import { loginAction, loginLoader } from "./routes/Auth/Login.data";
import { logoutLoader } from "./routes/Auth/Logout.data";
import { registerAction } from "./routes/Auth/Register.data";

import {
    forumCreateAction,
    forumCreateLoader,
    forumLoader,
    forumShouldRevalidate,
} from "./routes/Forum/Forum.data";
import { NewForum } from "./routes/Forum/NewForum";
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
import { homeLoader } from "./routes/Home/Home.data";
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
                        path: "quizzes/:quizId/take",
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
                        path: "profile",
                        element: <div>Profile</div>,
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
