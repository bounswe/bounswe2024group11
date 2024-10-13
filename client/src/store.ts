import { create } from "zustand";
import { ToastProps } from "./components/toast";

type ToastStore = {
    toasts: ToastProps[];
    add: (toast: ToastProps, duration?: number) => void;
    remove: (id: string) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
    toasts: [],
    add: (toast, duration = 5000) => {
        set((state) => ({
            // if the toast already exists, don't add it again
            toasts: state.toasts.some((t) => t.id === toast.id)
                ? state.toasts
                : [...state.toasts, toast],
        }));

        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== toast.id),
            }));
        }, duration);
    },
    remove: (id) => {
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        }));
    },
}));
