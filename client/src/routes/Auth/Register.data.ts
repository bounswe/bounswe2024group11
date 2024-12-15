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
    const showErrorToast = (message: string, description?: string) => {
        useToastStore.getState().add({
            type: "error",
            id: `register-error-${Date.now()}`, // Unique ID for each error
            data: {
                message,
                description: description || "Please try again.",
            },
        });
    };

    try {
        // Extract form data
        const formData = await request.formData();
        const password = formData.get("password");
        const confirmPassword = formData.get("confirm_password");

        // Validate passwords match
        if (!password || !confirmPassword || password !== confirmPassword) {
            showErrorToast(
                "Passwords do not match",
                "Please ensure both passwords are identical.",
            );
            return { error: "Passwords do not match" };
        }

        formData.delete("confirm_password");

        // Create and populate API FormData
        const apiFormData = new FormData();
        const avatarFile = formData.get("avatar_file");

        for (const [key, value] of formData.entries()) {
            if (key !== "avatar_file") {
                apiFormData.append(key, value as string);
            }
        }

        if (avatarFile instanceof File && avatarFile.size > 0) {
            apiFormData.append("avatar_file", avatarFile);
        }

        // Validate request data
        const requestBody = Object.fromEntries(formData.entries());
        const requestValidation = safeParse(registerRequestSchema, requestBody);

        if (!requestValidation.success) {
            logger.error("Invalid request body", requestValidation.issues);
            showErrorToast(
                "Invalid form data",
                "Please check all required fields are filled correctly.",
            );
            return { error: "Invalid request body" };
        }

        // Make API request
        const response = await apiClient.post("/auth/register/", apiFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        const responseValidation = safeParse(
            registerResponseSchema,
            response.data,
        );

        if (!responseValidation.success) {
            logger.error(
                "Invalid response from server",
                responseValidation.issues,
            );
            showErrorToast(
                "Server error",
                "Received invalid response from server. Please try again.",
            );
            return { error: "Invalid response from server" };
        }

        const validatedResponse = responseValidation.output;

        // Handle API validation errors
        if (!("access" in validatedResponse)) {
            const errorFields = Object.entries(validatedResponse);
            if (errorFields.length > 0) {
                const [field, messages] = errorFields[0];
                showErrorToast(
                    `${field.charAt(0).toUpperCase() + field.slice(1)} error`,
                    messages.join(". "),
                );
                return { error: messages.join(". ") };
            }
        }

        // Success case
        useToastStore.getState().add({
            id: "register-success",
            type: "success",
            data: {
                message: "Registration successful",
                description:
                    "Welcome to Turquiz! You can now log in with your credentials.",
            },
        });

        return redirect("/login");
    } catch (error) {
        logger.error("An error occurred during registration", error);
        showErrorToast(
            "Registration failed",
            error instanceof Error
                ? error.message
                : "An unexpected error occurred.",
        );
        return { error: "Registration failed" };
    }
};
