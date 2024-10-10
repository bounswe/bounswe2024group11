export const BASE_URL = "http://localhost:3000";

export const joinUrl = (url: string) => {
    return `${BASE_URL}/${url.replace(/^\/|\/$/g, "")}`;
};
