import { Quiz } from "./Quiz.schema";

export const questionTypeToQuestion = (
    questionType: Quiz["type"] | null,
    question: Quiz["questions"][number]["question_text"],
) => {
    switch (questionType) {
        case 1:
            return `What is the Turkish translation of '${question}'?`;
        case 2:
            return `What is the English translation of '${question}'?`;
        case 3:
            return `What is the sense of '${question}'?`;
        default:
            return `${question}?`;
    }
};
