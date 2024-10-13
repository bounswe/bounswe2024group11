import { redirect } from "react-router-typesafe";
import { object, safeParse, string, union } from "valibot";
import { useToastStore } from "../store";
import { BASE_URL } from "../utils";

export const registerRequestSchema = object({
    username: string(),
    password: string(),
    email: string(),
    full_name: string(),
});

const registerResponseSuccessSchema = object({
    access: string(),
    refresh: string(),
});

const registerResponseErrorSchema = object({
    error: string(),
});

const registerResponseSchema = union([
    registerResponseSuccessSchema,
    registerResponseErrorSchema,
]);

export const registerAction = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const matchingPasswords =
        formData.get("password") === formData.get("confirm_password");
    if (!matchingPasswords) {
        useToastStore.getState().add(
            {
                type: "error",
                id: "register-error",
                data: {
                    message: "Passwords do not match",
                    description:
                        "Do you even remember the lyrics of your favorite song?",
                },
            },
            5000,
        );
        return { error: "Passwords do not match" };
    }
    formData.delete("confirm_password");
    const requestBody = Object.fromEntries(formData.entries());
    const {
        output: requestOutput,
        issues: requestIssues,
        success: requestSuccess,
    } = safeParse(registerRequestSchema, requestBody);
    if (!requestSuccess) {
        console.error(requestIssues);
        return { error: "Invalid request body" };
    }
    const response = await fetch(`${BASE_URL}/register/`, {
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
        success: responseSuccess,
        output: responseOutput,
    } = safeParse(registerResponseSchema, responseJson);
    if (!responseSuccess) {
        console.error(responseIssues);
        return { error: "Invalid response" };
    }

    if ("error" in responseOutput) {
        useToastStore.getState().add({
            id: responseOutput.error,
            type: "error",
            data: {
                message: responseOutput.error,
                description: "You think you can just waltz in here?",
            },
        });
        return { error: responseOutput.error };
    }

    useToastStore.getState().add({
        id: "register-success",
        type: "success",
        data: {
            message: "Registration successful",
            description: "Welcome to Turquiz. You are now a registered user",
        },
    });

    return redirect("/login");
};
