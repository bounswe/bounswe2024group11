import { LoaderFunction } from "react-router";
import { defer } from "react-router-typesafe";
import { safeParse } from "valibot";
import { useToastStore } from "../../store";
import { BASE_URL, logger } from "../../utils";
import { leaderboardSchema } from "./Leaderboard.schema";

export const leaderboardLoader = (async ({ request }) => {
    const url = new URL(request.url);

    const leaderboardPromise = fetch(`${BASE_URL}/leaderboard/`)
        .then(async (response) => {
            const data = await response.json(); // Await the JSON parsing
            const { output, success, issues } = safeParse(
                leaderboardSchema,
                data,
            );

            if (!success) {
                logger.error("Failed to parse leaderboard response:", issues);
                throw new Error("Failed to parse leaderboard response");
            }

            return output;
        })
        .catch((error) => {
            logger.error("Error fetching leaderboard:", error);
            useToastStore.getState().add({
                id: "leaderboard-error",
                type: "error",
                data: {
                    message: "Failed to load leaderboard",
                    description:
                        "Failed to load leaderboard. Please try again.",
                },
            });
            throw new Error("Failed to load leaderboard");
        });

    return defer({
        leaderboardData: leaderboardPromise,
    });
}) satisfies LoaderFunction;
