import { redirect } from "react-router-typesafe";
import { object, safeParse, string, union } from "valibot";
import { USER, USER_TOKEN_ACCESS, USER_TOKEN_REFRESH } from "../constants";
import { useToastStore } from "../store";
import { BASE_URL } from "../utils";

export const loginRequestSchema = object({
    username: string(),
    password: string(),
});

const loginSuccessResponseSchema = object({
    access: string(),
    refresh: string(),
    user: object({
        full_name: string(),
        username: string(),
        email: string(),
    }),
});

const loginErrorResponseSchema = object({
    error: string(),
});

const loginResponseSchema = union([
    loginSuccessResponseSchema,
    loginErrorResponseSchema,
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
        console.error(requestIssues);
        return { error: "Invalid request body" };
    }
    const response = await fetch(`${BASE_URL}/token/`, {
        method: "POST",
        body: JSON.stringify(requestOutput),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    const responseJson = await response.json();

    const {
        issues: responseIssues,
        output: responseOutput,
        success: responseSuccess,
    } = safeParse(loginResponseSchema, responseJson);
    if (!responseSuccess) {
        console.error(responseIssues);
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

    if (persistentLogin) {
        localStorage.setItem(USER_TOKEN_ACCESS, responseOutput.access);
        localStorage.setItem(USER_TOKEN_REFRESH, responseOutput.refresh);
        localStorage.setObject(USER, responseOutput.user);
    } else {
        sessionStorage.setItem(USER_TOKEN_ACCESS, responseOutput.access);
        sessionStorage.setItem(USER_TOKEN_REFRESH, responseOutput.refresh);
        sessionStorage.setObject(USER, responseOutput.user);
    }
    return redirect("/");
};
