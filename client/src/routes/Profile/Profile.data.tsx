import { LoaderFunction, redirect } from "react-router";
import { safeParse } from "valibot";
import apiClient, { getUserOrRedirect } from "../../api"; // Axios instance
import { logger } from "../../utils";
import { profileSchema } from "./Profile.schema";

export const myProfileLoader = (async () => {
    const user = getUserOrRedirect();
    if (!user) {
        return redirect("/login");
    }

    if ("username" in user) return redirect(`/profile/${user.username}/`);
}) satisfies LoaderFunction;

export const profileLoader = (async ({ params }) => {
    const userName = params.username ?? "";

    try {
        const response = await apiClient.get(`/profile/${userName}/`);

        const { output, success, issues } = safeParse(
            profileSchema,
            response.data,
        );
        if (!success) {
            logger.log(issues);
            throw new Error("Failed to parse forum response");
        }

        return output;
    } catch (error) {
        logger.error(`Error fetching profile:`, error);
        throw new Error(`Failed to load profile`);
    }
}) satisfies LoaderFunction;
