import { setupWorker } from "msw/browser";
import { authHandlers } from "./handlers.auth";
import { quizHandlers } from "./handlers.quiz";

export const worker = setupWorker(...authHandlers, ...quizHandlers);
