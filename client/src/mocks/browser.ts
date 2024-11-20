import { setupWorker } from "msw/browser";
import { authHandlers } from "./handlers.auth";
import { forumHandlers } from "./handlers.forum";
import { quizHandlers } from "./handlers.quiz";

export const worker = setupWorker(
    ...authHandlers,
    ...quizHandlers,
    ...forumHandlers,
);
