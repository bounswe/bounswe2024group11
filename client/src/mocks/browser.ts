import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { quizHandlers } from "./handlers.quiz";

export const worker = setupWorker(...handlers, ...quizHandlers);
