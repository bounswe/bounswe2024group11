import { ActionFunction, LoaderFunction, redirect } from "react-router";
import { safeParse } from "valibot";
import apiClient, { getUserOrRedirect } from "../../api"; // Axios instance
import { logger } from "../../utils";
import { blockSchema, followSchema, profileSchema } from "./Profile.schema";

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
        logger.log(response.data);
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

export const BlockAction = (async ({ request }: { request: Request }) => {
    if (!getUserOrRedirect()) return null;
    try {
        const formData = await request.formData();
        const blocking = formData.get("blocking");
        const response = await apiClient.post(
            "/block/",
            { blocking },
            { headers: { "Content-Type": "application/json" } },
        );
        const { output, issues, success } = safeParse(
            blockSchema,
            response.data,
        );
        if (!success) {
            logger.log(issues);
            throw new Error("Failed to parse block response");
        }
        return output;
    } catch (error) {
        logger.error("Error in BlockAction", error);
        throw new Error("Failed to process block action");
    }
}) satisfies ActionFunction;

export const UnBlockAction = (async ({ request }: { request: Request }) => {
    if (!getUserOrRedirect()) return null;
    try {
        const formData = await request.formData();
        const blocking = formData.get("blocking");
        await apiClient.delete(`/block/${blocking}/`, {
            headers: { "Content-Type": "application/json" },
        });

        return null;
    } catch (error) {
        logger.error("Error in UnblockAction", error);
        throw new Error("Failed to process unblock action");
    }
}) satisfies ActionFunction;

export const FollowAction = (async ({ request }: { request: Request }) => {
    if (!getUserOrRedirect()) return null;
    try {
        const formData = await request.formData();
        const following = formData.get("following");
        const response = await apiClient.post(
            "/follow/",
            { following },
            { headers: { "Content-Type": "application/json" } },
        );
        const { output, issues, success } = safeParse(
            followSchema,
            response.data,
        );
        if (!success) {
            logger.log(issues);
            throw new Error("Failed to parse follow response");
        }
        return output;
    } catch (error) {
        logger.error("Error in FollowingAction", error);
        throw new Error("Failed to process following action");
    }
}) satisfies ActionFunction;

export const UnFollowAction = (async ({ request }: { request: Request }) => {
    if (!getUserOrRedirect()) return null;
    try {
        const formData = await request.formData();
        const following = formData.get("following");
        await apiClient.delete(`/follow/${following}/`, {
            headers: { "Content-Type": "application/json" },
        });

        return null;
    } catch (error) {
        logger.error("Error in UnfollowAction", error);
        throw new Error("Failed to process unfollow action");
    }
}) satisfies ActionFunction;
