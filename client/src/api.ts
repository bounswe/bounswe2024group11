// write a wrapper for await fetch to use token from localstorage as a bearer token

export const api = async (url: string, method: string, body: object) => {
    const token = localStorage.getItem("turquiz_app_access");
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    if (token) {
        headers.append("Authorization", `Bearer ${token}`);
    }
    const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(body),
    });
    return response.json();
};
