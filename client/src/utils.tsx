export const BASE_URL = "http://localhost:8000/api/v1";

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

export const getRelativeTime = (
    date: Date,
    rtfOptions: Intl.RelativeTimeFormatOptions = {
        numeric: "auto",
        style: "long",
    },
) => {
    const rtf = new Intl.RelativeTimeFormat("en", rtfOptions);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return rtf.format(-seconds, "second");
    if (minutes < 60) return rtf.format(-minutes, "minute");
    if (hours < 24) return rtf.format(-hours, "hour");
    if (days < 7) return rtf.format(-days, "day");
    if (days < 30) return rtf.format(-days, "day");
    return "more than a month ago";
};

export const pluralize = (count: number, singular: string, plural: string) => {
    return count === 1 ? "1 " + singular : count + " " + plural;
};

export const getNumberDifference = (
    value1: number | null,
    value2: number | null,
) => {
    if (value1 === null || value2 === null) return 0;
    return value1 - value2;
};
