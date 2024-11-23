import { ActionFunction, LoaderFunction } from "react-router";
import { safeParse } from "valibot";
import apiClient, { getUserOrRedirect } from "../../api";
import { logger } from "../../utils";
import { forumSchema } from "./Forum.schema";

export const forumLoader = (async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const per_page = Number(url.searchParams.get("per_page")) || 10;

    try {
        const response = await apiClient.get("/forum-questions/", {
            params: { page, per_page },
        });

        const { output, success, issues } = safeParse(
            forumSchema,
            response.data,
        );
        logger.log(issues);
        logger.log(output);
        if (!success) {
            throw new Error("Failed to parse forum response");
        }

        return output;
    } catch (error) {
        logger.error("Error fetching forum data", error);
        throw new Error("Failed to load forum questions");
    }
}) satisfies LoaderFunction;

export const forumCreateAction = (async ({ request }) => {
    if (!getUserOrRedirect()) return null;

    try {
        const formData = await request.formData();
        const formEntries = Object.fromEntries(formData);

        // Get the select element
        const selectElement = document.getElementById(
            "tags",
        ) as HTMLSelectElement;

        // Get all selected options and transform them into the required format
        const transformedTags = Array.from(selectElement.selectedOptions).map(
            (option) => ({
                name: option.text,
                linked_data_id: option.dataset.linkedId,
                description: option.dataset.description,
            }),
        );

        // Create a new object without the original tags
        const { tags: _, ...restEntries } = formEntries;

        // Create the final payload with the transformed tags
        const payload = {
            ...restEntries,
            tags: transformedTags,
        };

        const response = await apiClient.post("/forum-questions/", payload);

        return response;
    } catch (error) {
        logger.error("Error creating forum question", error);
        throw new Error("Failed to create forum question");
    }
}) satisfies ActionFunction;
