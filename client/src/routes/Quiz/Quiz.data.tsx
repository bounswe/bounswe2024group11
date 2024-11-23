import { LoaderFunction } from "react-router";
import { safeParse } from "valibot";
import apiClient from "../../api";
import { logger } from "../../utils";
import { quizDetailsSchema } from "./Quiz.schema";

export const quizLoader = (async ({ params }) => {
    const { quizId } = params;

    if (!quizId) {
        throw new Error("Quiz ID is required.");
    }

    try {
        const response = await apiClient.get(`/quizzes/${quizId}`);

        const data = response.data; // Extract data from axios response
        logger.log(data);

        const { output, issues, success } = safeParse(quizDetailsSchema, data);

        if (!success) {
            logger.error("Failed to parse quiz response:", issues);
            throw new Error(`Failed to parse quiz response: ${issues}`);
        }

        return output;
    } catch (error) {
        logger.error(`Error fetching quiz with ID: ${quizId}`, error);
        throw new Error(`Failed to fetch quiz with ID: ${quizId}`);
    }
}) satisfies LoaderFunction;

// export const hintAction = (async ({ params }) => {
//     const synset_id = params.synset_id;
//     const targetLang = params.target_lang;
//     const word = params.word;
//     getUserOrRedirect();
//     try {
//         const response = await apiClient.get(
//             `/hint/?synset_id=${synset_id}&word=${word}&target_lang=${targetLang}/`,
//         );

//         if (response.status === 204) {
//             useToastStore.getState().add({
//                 id: `hint-success-${synset_id}`,
//                 type: "success",
//                 data: {
//                     message: "Question deleted",
//                     description:
//                         "The question hint has been retrieved successfully",
//                 },
//             });
//         }

//         return response.data;
//     } catch (error) {
//         logger.error("Error in hintAction", error);
//         useToastStore.getState().add({
//             id: `hint-error-${synset_id}`,
//             type: "error",
//             data: {
//                 message: "Failed to get question hint",
//                 description:
//                     "Unable to get the question hint. Please try again.",
//             },
//         });
//         throw new Error("Failed to delete question");
//     }
// }) satisfies ActionFunction;
