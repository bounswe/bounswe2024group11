import { Author } from "./forum";
import { Tag } from "./tag";

export type rating = {
  score: number;
  count: number;
};

export type QuizQuestionOptionType = {
  id: number;
  choice_text: string;
  is_correct: boolean;
};

export type QuizQuestionHintType = {
  id: number;
  type: string;
  text: string;
};

export type QuizQuestionType = {
  id: number;
  question_text: string;
  choices: QuizQuestionOptionType[];
  hints: QuizQuestionHintType[];
};

export type QuizOverview = {
  id: string;
  title: string;
  description: string;
  difficulty: number;
  author: Author;
  tags: Tag[];
  type: number;
  created_at: string;
  num_taken: number;
  is_taken: boolean;
  rating: rating;
  questions: QuizQuestionType[];
};

export type QuizCardHeaderType = {
  difficulty: number;
  rating: rating;
};

export type QuizAnswerType = {
  question: number;
  answer: number | null;
  is_hint_used: boolean;
};

export type CreateQuizQuestionChoiceType = {
  choice_text: string;
  is_correct: boolean;
};

export type CreateQuizQuestionHintType = {
  type: string;
  text: string;
};

export type SuggestedHintsType = {
  synonyms: string[];
  definitions: string[];
  examples: string[];
  images: string[];
};

export type CreateQuizQuestionType = {
  question_text: string;
  choices: CreateQuizQuestionChoiceType[];
  hints: CreateQuizQuestionHintType[];
  point: number;
};
