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
    avatar: nullable(file()),
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
        // Extract and validate form data
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
        const requestBody = Object.fromEntries(formData.entries());
        const {
            output: validatedRequest,
            issues: requestIssues,
            success: isRequestValid,
        } = safeParse(registerRequestSchema, requestBody);

        if (!isRequestValid) {
            logger.error("Invalid request body", requestIssues);
            return { error: "Invalid request body" };
        }

        // Make the API request
        const response = await apiClient.post(
            "/auth/register/",
            validatedRequest,
        );

        const {
            output: validatedResponse,
            issues: responseIssues,
            success: isResponseValid,
        } = safeParse(registerResponseSchema, response.data);

        if (!isResponseValid) {
            logger.error("Invalid response from server", responseIssues);
            return { error: "Invalid response from server" };
        }

        console.log(validatedResponse);
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

        // Show a generic error to the user
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
