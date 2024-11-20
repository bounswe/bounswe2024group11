import Cookies from "js-cookie";
import { redirect } from "react-router-typesafe";
import { object, safeParse, string, union } from "valibot";
import apiClient from "../../api";
import { USER } from "../../constants";
import { useToastStore } from "../../store";
import { logger } from "../../utils";

export const loginRequestSchema = object({
    username: string(),
    password: string(),
});

const loginResponseSuccessSchema = object({
    access: string(),
    refresh: string(),
    user: object({
        full_name: string(),
        username: string(),
        email: string(),
    }),
});

const loginResponseErrorSchema = object({
    error: string(),
});

const loginResponseSchema = union([
    loginResponseSuccessSchema,
    loginResponseErrorSchema,
]);

export const loginAction = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const persistentLogin = formData.get("keep_me_logged_in") === "on";
    formData.delete("keep_me_logged_in");
    const requestBody = Object.fromEntries(formData.entries());
    const {
        output: requestOutput,
        issues: requestIssues,
        success: requestSuccess,
    } = safeParse(loginRequestSchema, requestBody);
    if (!requestSuccess) {
        logger.error(requestIssues);
        return { error: "Invalid request body" };
    }

    try {
        const response = await apiClient.post("/auth/login/", requestOutput);
        const {
            issues: responseIssues,
            output: responseOutput,
            success: responseSuccess,
        } = safeParse(loginResponseSchema, response.data);

        if (!responseSuccess) {
            logger.error(responseIssues);
            return { error: "Invalid response" };
        }

        if ("error" in responseOutput) {
            useToastStore.getState().add({
                id: `login-error-${requestOutput.username}-${requestOutput.password}`,
                type: "error",
                data: {
                    message: responseOutput.error,
                    description: "What do you do when you forget your keys?",
                },
            });
            return { error: responseOutput.error };
        }

        const options = persistentLogin ? { expires: 30 } : undefined;
        Cookies.set("access_token", responseOutput.access, options);
        Cookies.set("refresh_token", responseOutput.refresh, options);

        if (persistentLogin) {
            localStorage.setObject(USER, responseOutput.user);
        } else {
            sessionStorage.setObject(USER, responseOutput.user);
        }

        useToastStore.getState().add({
            id: "login-success",
            type: "success",
            data: {
                message: "Welcome back buddy!",
                description: "Ready to kick some quiz butt?",
            },
        });

        return redirect("/");
    } catch (error) {
        logger.error("Login failed:", error);
        useToastStore.getState().add({
            id: "login-error",
            type: "error",
            data: {
                message: "Login failed",
                description: "Something went wrong. Please try again.",
            },
        });
        return { error: "Login failed" };
    }
};

export const loginLoader = async () => {
    logger.log(
        "Hello from loginLoader using logger utility",
        "This is param1",
        "This is param2",
    );
    const user = localStorage.getObject(USER) || sessionStorage.getObject(USER);
    if (user) {
        return redirect("/");
    }
    return null;
};
