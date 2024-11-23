import { cva } from "cva";
import { useToastStore } from "../store";

export type Toast = {
    id: string;
    type: "success" | "error" | "info" | "warning";
    data: {
        message: string;
        description?: string | undefined;
    };
};

export type ToastProps = {
    toast: Toast;
};

const toastBadgeClass = cva("absolute left-0 h-8 w-1 rounded-r-full", {
    variants: {
        type: {
            success: "bg-teal-500",
            error: "bg-red-500",
            warning: "bg-amber-500",
            info: "bg-cyan-500",
        },
    },
});

const typeToIcon: Record<Toast["type"], JSX.Element> = {
    success: (
        <path
            d="M10 17.5C5.85775 17.5 2.5 14.1422 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1422 2.5 17.5 5.85775 17.5 10C17.5 14.1422 14.1422 17.5 10 17.5ZM9.25225 13L14.5547 7.69675L13.4943 6.63625L9.25225 10.879L7.1305 8.75725L6.07 9.81775L9.25225 13Z"
            fill="#14B8A6"
        />
    ),
    error: (
        <path
            d="M10 17.5C5.85775 17.5 2.5 14.1422 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1422 2.5 17.5 5.85775 17.5 10C17.5 14.1422 14.1422 17.5 10 17.5ZM9.25 12.25V13.75H10.75V12.25H9.25ZM9.25 6.25V10.75H10.75V6.25H9.25Z"
            fill="#ef4444"
        />
    ),
    warning: (
        <path
            d="M10.617 3.27696L17.4045 15.1689C17.4671 15.2784 17.5 15.4027 17.5 15.5292C17.5 15.6557 17.4671 15.78 17.4045 15.8896C17.342 15.9992 17.2521 16.0901 17.1438 16.1534C17.0354 16.2167 16.9126 16.25 16.7875 16.25H3.21251C3.08743 16.25 2.96456 16.2167 2.85625 16.1534C2.74794 16.0901 2.65799 15.9992 2.59546 15.8896C2.53292 15.78 2.5 15.6557 2.5 15.5292C2.5 15.4027 2.53292 15.2784 2.59546 15.1689L9.38295 3.27696C9.44549 3.1674 9.53544 3.07643 9.64375 3.01318C9.75207 2.94992 9.87493 2.91663 10 2.91663C10.1251 2.91663 10.2479 2.94992 10.3562 3.01318C10.4646 3.07643 10.5545 3.1674 10.617 3.27696V3.27696ZM9.28748 12.6463V14.0878H10.7125V12.6463H9.28748ZM9.28748 7.60129V11.2049H10.7125V7.60129H9.28748Z"
            fill="#f59e0b"
        />
    ),
    info: (
        <path
            d="M10 17.5C5.85775 17.5 2.5 14.1422 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1422 2.5 17.5 5.85775 17.5 10C17.5 14.1422 14.1422 17.5 10 17.5ZM9.25 9.25V13.75H10.75V9.25H9.25ZM9.25 6.25V7.75H10.75V6.25H9.25Z"
            fill="#06b6d4"
        />
    ),
};

const ToastModal = ({ toast }: ToastProps) => {
    const index = useToastStore.getState().toasts.indexOf(toast);
    const length = useToastStore.getState().toasts.length;
    const order = length - index - 1;
    return (
        <div
            aria-hidden={order !== length - 1}
            role="alert-dialog"
            aria-modal="false"
            aria-description={toast.data.message}
            aria-live="polite"
            className="z-50 flex w-[24rem] max-w-full items-center gap-2 overflow-hidden rounded-2 bg-white px-3 py-2 ring-1 ring-slate-200"
            style={{
                transformOrigin: "top",
                transform: `translateY(-${order * 8}px) scale(${index === length - 1 ? 1 : Math.pow(0.96, order)})`,
                transition: "transform 0.3s",
            }}
        >
            <div
                className={toastBadgeClass({ type: toast.type })}
                aria-hidden="true"
            ></div>
            <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {typeToIcon[toast.type]}
            </svg>
            <div className="flex-1">
                <div className="flex flex-col">
                    <div
                        role="alert"
                        aria-atomic="true"
                        className="font-medium"
                    >
                        {toast.data.message}
                    </div>
                    {toast.data.description && (
                        <span className="text-sm text-slate-600">
                            {toast.data.description}
                        </span>
                    )}
                </div>
            </div>
            <button
                disabled={order !== 0}
                aria-roledescription="close button"
                aria-disabled={order !== 0}
                className="touch-hitbox relative rounded-full p-2 text-slate-400 transition-all hover:bg-slate-50 hover:text-slate-700 focus:text-slate-700 focus-visible:bg-slate-100 disabled:pointer-events-none disabled:opacity-50"
                onClick={() => {
                    useToastStore.getState().remove(toast.id);
                }}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9.99956 8.93955L13.7121 5.22705L14.7726 6.28755L11.0601 10.0001L14.7726 13.7126L13.7121 14.7731L9.99956 11.0606L6.28706 14.7731L5.22656 13.7126L8.93906 10.0001L5.22656 6.28755L6.28706 5.22705L9.99956 8.93955Z"
                        fill="currentColor"
                    />
                </svg>
            </button>
        </div>
    );
};

export const ToastWrapper = () => {
    const { toasts } = useToastStore();
    return (
        <div className="perspective-md fixed bottom-0 right-6 z-50 flex flex-col items-end gap-2 pb-10">
            {toasts.map((toast) => {
                return (
                    <div
                        key={toast.id}
                        className="animate-in absolute bottom-8"
                    >
                        <ToastModal toast={toast} />
                    </div>
                );
            })}
        </div>
    );
};
