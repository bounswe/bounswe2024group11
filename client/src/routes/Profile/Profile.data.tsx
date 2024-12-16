import { ActionFunction, LoaderFunction, redirect } from "react-router";
import { defer } from "react-router-typesafe";
import { safeParse } from "valibot";
import apiClient, { getUserOrRedirect } from "../../api"; // Axios instance
import { useToastStore } from "../../store";
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

    const profilePromise = apiClient
        .get(`/profile/${userName}/`)
        .then((response) => {
            const { output, success, issues } = safeParse(
                profileSchema,
                response.data,
            );
            if (!success) {
                throw new Error("Failed to parse forum response");
            }
            return output;
        })
        .catch((error) => {
            logger.error(`Error fetching profile:`, error);
            throw new Error(`Failed to load profile`);
        });

    return defer({
        profileData: profilePromise,
    });
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
            useToastStore.getState().add({
                id: `block-error-${Date.now()}`,
                type: "error",
                data: {
                    message: "Oops, that didn't work! 🤦‍♂️",
                    description:
                        "Looks like we fumbled the blocking attempt. Want to give it another shot?",
                },
            });
            throw new Error("Failed to parse block response");
        } else {
            useToastStore.getState().add({
                id: `block-success-${Date.now()}`,
                type: "success",
                data: {
                    message: "Mission accomplished! 🎯",
                    description: "That user won't be bothering you anymore.",
                },
            });
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
        useToastStore.getState().add({
            id: `unblock-success-${Date.now()}`,
            type: "success",
            data: {
                message: "Welcome back! 🤝",
                description:
                    "The user has been unblocked and can interact again.",
            },
        });
        return null;
    } catch (error) {
        useToastStore.getState().add({
            id: `unblock-failure-${Date.now()}`,
            type: "error",
            data: {
                message: "Well, this is awkward... 😅",
                description:
                    "We couldn't unblock the user. Give it another try?",
            },
        });
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
            useToastStore.getState().add({
                id: `follow-error-${Date.now()}`,
                type: "error",
                data: {
                    message: "Whoopsie! 🫂",
                    description:
                        "The follow button seems shy today. Mind trying again?",
                },
            });
            throw new Error("Failed to parse follow response");
        } else {
            useToastStore.getState().add({
                id: `follow-success-${Date.now()}`,
                type: "success",
                data: {
                    message: "You're all set! 🌟",
                    description: "Successfully following this awesome user!",
                },
            });
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
        useToastStore.getState().add({
            id: `unfollow-success-${Date.now()}`,
            type: "success",
            data: {
                message: "All done! 👋",
                description: "You've unfollowed this user.",
            },
        });
        return null;
    } catch (error) {
        useToastStore.getState().add({
            id: `unfollow-failure-${Date.now()}`,
            type: "error",
            data: {
                message: "Not so fast! 🏃‍♂️",
                description: "Couldn't unfollow right now. Care to try again?",
            },
        });

        logger.error("Error in UnfollowAction", error);
        throw new Error("Failed to process unfollow action");
    }
}) satisfies ActionFunction;
