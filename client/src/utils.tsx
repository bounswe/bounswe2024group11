export const BASE_URL = "http://localhost:8000/api/v1";

export async function enableMocking() {
    if (import.meta.env.VITE_ENABLE_MOCKS === "false") {
        return;
    }

    const { worker } = await import("./mocks/browser");

    return worker.start();
}

/*export const logger: typeof console.log = (...params) => {
    if (import.meta.env.VITE_LOGGING === "true") {
        console.log(...params);
    }
};*/

type Logger = {
    log: typeof console.log;
    error: typeof console.error;
    info: typeof console.info;
};

export const logger: Logger = {
    log: (...params) => {
        if (import.meta.env.VITE_LOGGING === "true") {
            console.log(...params);
        }
    },
    error: (...params) => {
        if (import.meta.env.VITE_LOGGING === "true") {
            console.error(...params);
        }
    },
    info: (...params) => {
        if (import.meta.env.VITE_LOGGING === "true") {
            console.info(...params);
        }
    },
};

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
