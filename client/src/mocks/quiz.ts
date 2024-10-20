import { Term } from "../types/mockTerm";
import { Options } from "../types/quizQuestion";
import { animalTerms, carTerms, fruitTerms } from "./mockQuizzes";

type TermKey = keyof Term;

const generateQuiz = (type: number) => {
    const shuffleArray = <T>(array: T[]): T[] =>
        [...array].sort(() => Math.random() - 0.5);

    const createOptions = (
        term: Term,
        termsArray: Term[],
        correctAnswerKey: TermKey,
        optionKey: TermKey,
    ): Options[] => {
        const shuffledTerms = shuffleArray([...termsArray]);
        const wrongOptions = shuffledTerms
            .filter((t) => t[correctAnswerKey] !== term[correctAnswerKey])
            .slice(0, 3);

        return shuffleArray([
            ...wrongOptions.map((t) => ({
                id: `${t[correctAnswerKey]}-${Math.random()}`,
                text: t[optionKey],
                is_correct: "false",
            })),
            {
                id: `${term[correctAnswerKey]}-${Math.random()}`,
                text: term[optionKey],
                is_correct: "true",
            },
        ]);
    };

    const createQuestion = (term: Term, text: string, options: Options[]) => ({
        id: `${term.en}-${Math.random()}`,
        text,
        options,
        selected_option_id: "",
    });

    const getQuestions = (
        termsArray: Term[],
        textGenerator: (term: Term) => string,
        correctAnswerKey: TermKey,
        optionKey: TermKey,
    ) =>
        termsArray.map((term) =>
            createQuestion(
                term,
                textGenerator(term),
                createOptions(term, termsArray, correctAnswerKey, optionKey),
            ),
        );

    if (type === 1) {
        // Type 1: Asking for English translations of Turkish car terms
        return shuffleArray(
            getQuestions(
                carTerms,
                (term) => `What is the English translation of "${term.tr}"?`,
                "tr",
                "en",
            ),
        ).slice(0, 10);
    } else if (type === 2) {
        // Type 2: Asking for Turkish translations of English animal terms
        return shuffleArray(
            getQuestions(
                animalTerms,
                (term) => `What is the Turkish translation of "${term.en}"?`,
                "en",
                "tr",
            ),
        ).slice(0, 10);
    } else if (type === 3) {
        // Type 3: Asking for the English meaning of fruits
        return shuffleArray(
            getQuestions(
                fruitTerms,
                (term) => `What is the meaning of the word "${term.en}"?`,
                "en",
                "sense",
            ),
        ).slice(0, 10);
    }

    return [];
};

export const quizDataType1 = generateQuiz(1);
export const quizDataType2 = generateQuiz(2);
export const quizDataType3 = generateQuiz(3);
