import { create } from "zustand";
import { Toast } from "./components/toast";
import { QuizQuestion } from "./routes/Quiz/Quiz.schema";

type ToastStore = {
    toasts: Toast[];
    add: (toast: Toast) => void;
    remove: (id: string) => void;
    duration: number;
    timer: NodeJS.Timeout | null;
    maxToasts: number;
};

type QuestionsStore = {
    questions: Record<number, { type: number; question: QuizQuestion }>;
    add: (type: number, question: QuizQuestion) => void;
    remove: (id: number) => void;
};

export const useQuestionsStore = create<QuestionsStore>((set) => ({
    questions: {},
    add: (type, question) => {
        set((state) => {
            return {
                questions: {
                    ...state.questions,
                    [question.id]: { type, question },
                },
            };
        });
    },
    remove: (id) => {
        set((state) => {
            const { [id]: _, ...newQuestions } = state.questions;
            return {
                questions: newQuestions,
            };
        });
    },
}));

export const useToastStore = create<ToastStore>((set) => ({
    toasts: [],
    duration: 5000,
    timer: null,
    maxToasts: 5,
    add: (toast) => {
        set((state) => {
            let newToasts = state.toasts.some((t) => t.id === toast.id)
                ? state.toasts
                : [...state.toasts, toast];

            if (newToasts.length > state.maxToasts) {
                newToasts = newToasts.slice(1);
            }

            if (state.timer) {
                clearTimeout(state.timer);
            }

            const newTimer = setTimeout(() => {
                set({ toasts: [], timer: null });
            }, state.duration);

            return { toasts: newToasts, timer: newTimer };
        });
    },
    remove: (id) => {
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        }));
    },
}));
