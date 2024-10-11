import { cva } from "cva";

export const toastStyle = cva("", {
    variants: {
        type: {},
    },
});

type ToastProps = {
    type: "success" | "error" | "info" | "warning";
    message: string;
    onClose: () => void;
};

const typeToIcon: Partial<Record<ToastProps["type"], JSX.Element>> = {
    success: (
        <path
            d="M10 17.5C5.85775 17.5 2.5 14.1422 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1422 2.5 17.5 5.85775 17.5 10C17.5 14.1422 14.1422 17.5 10 17.5ZM9.25225 13L14.5547 7.69675L13.4943 6.63625L9.25225 10.879L7.1305 8.75725L6.07 9.81775L9.25225 13Z"
            fill="#38C793"
        />
    ),
    error: (
        <path
            d="M10 17.5C5.85775 17.5 2.5 14.1422 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1422 2.5 17.5 5.85775 17.5 10C17.5 14.1422 14.1422 17.5 10 17.5ZM9.25 12.25V13.75H10.75V12.25H9.25ZM9.25 6.25V10.75H10.75V6.25H9.25Z"
            fill="#DF1C41"
        />
    ),
    warning: (
        <path
            d="M10.617 3.27696L17.4045 15.1689C17.4671 15.2784 17.5 15.4027 17.5 15.5292C17.5 15.6557 17.4671 15.78 17.4045 15.8896C17.342 15.9992 17.2521 16.0901 17.1438 16.1534C17.0354 16.2167 16.9126 16.25 16.7875 16.25H3.21251C3.08743 16.25 2.96456 16.2167 2.85625 16.1534C2.74794 16.0901 2.65799 15.9992 2.59546 15.8896C2.53292 15.78 2.5 15.6557 2.5 15.5292C2.5 15.4027 2.53292 15.2784 2.59546 15.1689L9.38295 3.27696C9.44549 3.1674 9.53544 3.07643 9.64375 3.01318C9.75207 2.94992 9.87493 2.91663 10 2.91663C10.1251 2.91663 10.2479 2.94992 10.3562 3.01318C10.4646 3.07643 10.5545 3.1674 10.617 3.27696V3.27696ZM9.28748 12.6463V14.0878H10.7125V12.6463H9.28748ZM9.28748 7.60129V11.2049H10.7125V7.60129H9.28748Z"
            fill="#F27B2C"
        />
    ),
    info: (
        <path
            d="M10 17.5C5.85775 17.5 2.5 14.1422 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1422 2.5 17.5 5.85775 17.5 10C17.5 14.1422 14.1422 17.5 10 17.5ZM9.25 9.25V13.75H10.75V9.25H9.25ZM9.25 6.25V7.75H10.75V6.25H9.25Z"
            fill="#375DFB"
        />
    ),
};

export const Toast = ({ type, message, onClose }: ToastProps) => {
    return (
        <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center pb-10">
            <div className="animate-in flex gap-2 py-2 px-3 w-full max-w-96 items-center ring-slate-200 ring-1 rounded-2 shadow-card bg-white">
                <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {typeToIcon[type]}
                </svg>
                <span className="flex-1">{message}</span>
                <button
                    className="rounded-full text-slate-400 hover:text-slate-600 focus-visible:outline-none touch-hitbox relative"
                    onClick={() => {
                        onClose();
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
        </div>
    );
};