export const BASE_URL = "http://localhost:3000";

export const joinUrl = (url: string) => {
    return `${BASE_URL}/${url.replace(/^\/|\/$/g, "")}`;
};

export async function enableMocking() {
    if (import.meta.env.VITE_ENABLE_MOCKS === "false") {
        return;
    }

    const { worker } = await import("./mocks/browser");

    return worker.start();
}
