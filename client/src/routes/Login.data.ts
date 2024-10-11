import { redirect } from "react-router-typesafe";
import { number, object, safeParse, string } from "valibot";
import { BASE_URL } from "../utils";

const loginResponseSchema = object({
    token: string(),
    user: object({
        id: number(),
        username: string(),
        email: string(),
    }),
});

export const loginAction = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const response = await fetch(`${BASE_URL}/api/v2/login/`, {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData.entries())), // Sending the form data
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    const responseJson = await response.json();

    if (!response.ok) {
        switch (response.status) {
            case 400:
                return {
                    error: responseJson.error,
                };
            case 401:
                return {
                    error: responseJson.error,
                };
            default:
                return {
                    error: "Unknown error",
                };
        }
    }
    const { issues, output, success } = safeParse(
        loginResponseSchema,
        responseJson,
    );
    if (!success) {
        console.error(issues);
        return { error: "Invalid response" };
    }
    if (formData.get("keep_me_logged_in") === "on") {
        localStorage.setItem("turquiz_app_token", output.token);
        localStorage.setObject("turquiz_app_user", output.user);
    } else {
        sessionStorage.setItem("turquiz_app_token", output.token);
        sessionStorage.setObject("turquiz_app_user", output.user);
    }
    return redirect("/");
};
