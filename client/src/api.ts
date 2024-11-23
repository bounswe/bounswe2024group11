import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "react-router";
import { USER } from "./constants";
import { useToastStore } from "./store";
import { BASE_URL } from "./utils";

const apiClient = axios.create({
    baseURL: BASE_URL, // Replace with your Django backend base URL
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Add auth tokens to every request
apiClient.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get("access_token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.resolve(error.reponse);
    },
);

// Handle token errors without refresh tokens or redirects
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error("Unauthorized access. Please log in again.");
            Cookies.remove("access_token");
            Cookies.remove("refresh_token"); // Remove tokens if they exist
        }
        return Promise.resolve(error.response);
    },
);

export const getUserOrRedirect = () => {
    const user = sessionStorage.getObject(USER) || localStorage.getObject(USER);
    const authToken = Cookies.get("access_token");
    if (!user || !authToken) {
        useToastStore.getState().add({
            id: `not-logged-in-${Date.now()}`,
            type: "info",
            data: {
                message: "Authentication required",
                description: "You need to log in to complete this action",
            },
        });
        redirect("/login");
    }
    return user;
};

export default apiClient;
