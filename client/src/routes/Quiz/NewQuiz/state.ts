import { create } from "zustand";
import { Tag } from "../../Forum/Forum.schema";
import { QuizCreate, QuizQuestionCreate } from "../Quiz.schema";

interface Choice {
    choice_text: string;
    is_correct: boolean;
}

interface QuizState {
    quiz: QuizCreate;
    setQuizField: (field: keyof QuizCreate, value: any) => void;
    addQuestion: (question: QuizQuestionCreate) => void;
    updateQuestion: (
        index: number,
        updatedQuestion: Partial<QuizQuestionCreate>,
    ) => void;
    deleteQuestion: (index: number) => void;
    addTag: (tag: Tag) => void;
    removeTag: (tagId: string) => void;
    setType: (type: number) => void;
    reorderQuestions: (startIndex: number, endIndex: number) => void;
    updateQuestionChoices: (questionIndex: number, choices: Choice[]) => void;
    removeQuestionTag: (questionIndex: number) => void;
    resetQuiz: () => void;
    getValidationErrors: () => string[];
    getQuizForSubmission: () => QuizCreate;
}

const createInitialChoices = (): Choice[] => [
    { choice_text: "", is_correct: true },
    { choice_text: "", is_correct: false },
    { choice_text: "", is_correct: false },
    { choice_text: "", is_correct: false },
];

const initialQuiz: QuizCreate = {
    title: "",
    description: "",
    tags: [],
    type: 1,
    questions: [],
};

// Utility function to shuffle array
const shuffleArray = <T>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export const useQuizStore = create<QuizState>((set, get) => ({
    quiz: initialQuiz,

    setQuizField: (field, value) =>
        set((state) => ({
            quiz: {
                ...state.quiz,
                [field]: value,
            },
        })),

    addQuestion: (question) => {
        const newQuestion = {
            ...question,
            question_text: question.question_tag?.name || "",
            choices: question.choices?.length
                ? question.choices
                : createInitialChoices(),
            hints: question.hints || [],
        };

        set((state) => ({
            quiz: {
                ...state.quiz,
                questions: [...state.quiz.questions, newQuestion],
            },
        }));
    },

    updateQuestion: (index, updatedQuestion) =>
        set((state) => ({
            quiz: {
                ...state.quiz,
                questions: state.quiz.questions.map((q, i) =>
                    i === index
                        ? {
                              ...q,
                              ...updatedQuestion,
                              question_text:
                                  updatedQuestion.question_tag?.name ||
                                  q.question_text,
                          }
                        : q,
                ),
            },
        })),

    deleteQuestion: (index) =>
        set((state) => ({
            quiz: {
                ...state.quiz,
                questions: state.quiz.questions.filter((_, i) => i !== index),
            },
        })),

    reorderQuestions: (startIndex: number, endIndex: number) =>
        set((state) => {
            const questions = [...state.quiz.questions];
            const [removed] = questions.splice(startIndex, 1);
            questions.splice(endIndex, 0, removed);
            return {
                quiz: {
                    ...state.quiz,
                    questions,
                },
            };
        }),

    updateQuestionChoices: (questionIndex: number, choices: Choice[]) => {
        // Ensure correct answer is always at index 0
        const sortedChoices = [...choices].sort((a, b) => {
            if (a.is_correct) return -1;
            if (b.is_correct) return 1;
            return 0;
        });

        set((state) => ({
            quiz: {
                ...state.quiz,
                questions: state.quiz.questions.map((q, i) =>
                    i === questionIndex ? { ...q, choices: sortedChoices } : q,
                ),
            },
        }));
    },

    removeQuestionTag: (questionIndex: number) =>
        set((state) => ({
            quiz: {
                ...state.quiz,
                questions: state.quiz.questions.map((q, i) =>
                    i === questionIndex
                        ? {
                              ...q,
                              question_tag: null,
                              question_text: "",
                              choices: createInitialChoices(),
                          }
                        : q,
                ),
            },
        })),

    addTag: (tag) =>
        set((state) => ({
            quiz: {
                ...state.quiz,
                tags: [...state.quiz.tags, tag],
            },
        })),

    removeTag: (tagId) =>
        set((state) => ({
            quiz: {
                ...state.quiz,
                tags: state.quiz.tags.filter((t) => t.linked_data_id !== tagId),
                questions: state.quiz.questions.map((question) =>
                    question.question_tag?.linked_data_id === tagId
                        ? {
                              ...question,
                              question_tag: null,
                              question_text: "",
                              choices: createInitialChoices(),
                          }
                        : question,
                ),
            },
        })),

    setType: (type: number) => {
        set((state) => ({
            quiz: {
                ...initialQuiz,
                title: state.quiz.title,
                description: state.quiz.description,
                type,
            },
        }));
    },

    resetQuiz: () => set({ quiz: initialQuiz }),

    getValidationErrors: () => {
        const state = get();
        const errors: string[] = [];

        if (!state.quiz.title) errors.push("Title is required");
        if (!state.quiz.description) errors.push("Description is required");

        state.quiz.questions.forEach((question, index) => {
            if (!question.question_tag) {
                errors.push(`Question ${index + 1} tag is required`);
            }
            if (!question.question_text.trim()) {
                errors.push(`Question ${index + 1} text is required`);
            }

            const hasCorrectChoice = question.choices.some(
                (choice) => choice.is_correct,
            );
            if (!hasCorrectChoice) {
                errors.push(`Question ${index + 1} must have a correct answer`);
            }

            question.choices.forEach((choice, choiceIndex) => {
                if (!choice.choice_text.trim()) {
                    errors.push(
                        `Choice ${choiceIndex + 1} for Question ${index + 1} is required`,
                    );
                }
            });
        });

        return errors;
    },

    getQuizForSubmission: () => {
        const state = get();
        return {
            ...state.quiz,
            questions: state.quiz.questions.map((question) => ({
                ...question,
                question_text:
                    question.question_tag?.name || question.question_text,
                choices: shuffleArray(question.choices),
            })),
        };
    },
}));
