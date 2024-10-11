export const BASE_URL = "http://localhost:3000";

export async function enableMocking() {
    if (import.meta.env.VITE_ENABLE_MOCKS === "false") {
        return;
    }

    const { worker } = await import("./mocks/browser");

    return worker.start();
}

Storage.prototype.setObject = function (key: string, value: object) {
    this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function (key: string) {
    const item = this.getItem(key);
    if (!item) {
        return null;
    }
    return JSON.parse(item);
};

localStorage;
