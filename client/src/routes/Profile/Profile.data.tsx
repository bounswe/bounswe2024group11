import { LoaderFunction, redirect } from "react-router";
import { safeParse } from "valibot";
import apiClient, { getUserOrRedirect } from "../../api"; // Axios instance
import { logger } from "../../utils";
import { forumSchema } from "../Forum/Forum.schema";

export const profileLoader = (async ({ params }) => {
    if (!getUserOrRedirect()) {
        return redirect("/login");
    }
    const page = 1;
    const per_page = 5;

    try {
        const response = await apiClient.get("/forum-questions/", {
            params: { page, per_page },
        });

        const { output, success, issues } = safeParse(
            forumSchema,
            response.data,
        );
        if (!success) {
            throw new Error("Failed to parse forum response");
        }

        return output;
    } catch (error) {
        logger.error(`Error fetching profile:`, error);
        throw new Error(`Failed to load profile`);
    }
}) satisfies LoaderFunction;
