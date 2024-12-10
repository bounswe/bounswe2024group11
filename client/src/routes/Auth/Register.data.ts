import { redirect } from "react-router";
import {
    array,
    file,
    nullable,
    object,
    record,
    safeParse,
    string,
    union,
} from "valibot";
import apiClient from "../../api";
import { useToastStore } from "../../store";
import { logger } from "../../utils";

export const registerRequestSchema = object({
    username: string(),
    password: string(),
    email: string(),
    full_name: string(),
    avatar_file: nullable(file()),
});

const registerResponseSuccessSchema = object({
    access: string(),
    refresh: string(),
});

const registerResponseErrorSchema = record(string(), array(string()));

const registerResponseSchema = union([
    registerResponseSuccessSchema,
    registerResponseErrorSchema,
]);

export const registerAction = async ({ request }: { request: Request }) => {
    console.log("Register action triggered");

    try {
        // Extract form data
        const formData = await request.formData();
        const matchingPasswords =
            formData.get("password") === formData.get("confirm_password");

        if (!matchingPasswords) {
            useToastStore.getState().add({
                type: "error",
                id: "register-error",
                data: {
                    message: "Passwords do not match",
                    description: "Double-check your passwords, please.",
                },
            });
            return { error: "Passwords do not match" };
        }

        formData.delete("confirm_password");

        // Create a new FormData for the API request
        const apiFormData = new FormData();

        // Get the file separately
        const avatarFile = formData.get("avatar_file");

        // Add all other fields to FormData
        for (const [key, value] of formData.entries()) {
            if (key !== "avatar_file") {
                apiFormData.append(key, value);
            }
        }

        // Add the file if it exists and is not empty
        if (avatarFile instanceof File && avatarFile.size > 0) {
            apiFormData.append("avatar_file", avatarFile);
        }

        // Validate the request data
        const requestBody = Object.fromEntries(formData.entries());
        const { success: isRequestValid, issues: requestIssues } = safeParse(
            registerRequestSchema,
            requestBody,
        );

        if (!isRequestValid) {
            logger.error("Invalid request body", requestIssues);
            return { error: "Invalid request body" };
        }

        // Make the API request with FormData
        const response = await apiClient.post("/auth/register/", apiFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        const {
            output: validatedResponse,
            issues: responseIssues,
            success: isResponseValid,
        } = safeParse(registerResponseSchema, response.data);

        if (!isResponseValid) {
            logger.error("Invalid response from server", responseIssues);
            return { error: "Invalid response from server" };
        }

        const errorMessages =
            "username" in validatedResponse
                ? validatedResponse.username
                : "email" in validatedResponse
                  ? validatedResponse.email
                  : "full_name" in validatedResponse
                    ? validatedResponse.full_name
                    : "password" in validatedResponse
                      ? validatedResponse.password
                      : [];

        if (errorMessages[0]) {
            useToastStore.getState().add({
                id: "register-error",
                type: "error",
                data: {
                    message: errorMessages.join(", "),
                    description: "Something went wrong during registration.",
                },
            });
            return { error: errorMessages.join(", ") };
        } else {
            useToastStore.getState().add({
                id: "register-success",
                type: "success",
                data: {
                    message: "Registration successful",
                    description:
                        "Welcome to Turquiz. You are now a registered user. Enjoy!",
                },
            });
            return redirect("/login");
        }
    } catch (error) {
        logger.error("An error occurred during registration", error);

        useToastStore.getState().add({
            type: "error",
            id: "register-failed",
            data: {
                message: "Registration failed",
                description: "An unexpected error occurred. Please try again.",
            },
        });

        return { error: "Registration failed" };
    }
};
