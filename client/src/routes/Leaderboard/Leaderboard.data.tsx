import { LoaderFunction } from "react-router";
import { safeParse } from "valibot";
import apiClient from "../../api";
import { logger } from "../../utils";
import { leaderboardSchema } from "./Leaderboard.schema";

export const leaderboardLoader = (async ({ request }) => {
    try {
        const response = await apiClient.get("leaderboard/");
        // const response = await fetch(`${BASE_URL}/leaderboard/`);
        // const data = await response.json();
        const { output, issues, success } = safeParse(
            leaderboardSchema,
            response.data,
        );

        if (!success) {
            throw new Error(`Failed to parse post response: ${issues}`);
        }

        return output;
    } catch (error) {
        logger.error(`Error fetching leaderboard`, error);
        throw new Error(`Failed to load leaderboard`);
    }
}) satisfies LoaderFunction;
