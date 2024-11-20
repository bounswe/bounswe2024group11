import { create } from "zustand";
import { Toast } from "./components/toast";

type ToastStore = {
    toasts: Toast[];
    add: (toast: Toast) => void;
    remove: (id: string) => void;
    duration: number;
    timer: NodeJS.Timeout | null;
    maxToasts: number;
};

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
