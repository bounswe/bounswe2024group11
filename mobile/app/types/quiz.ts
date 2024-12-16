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
  is_my_quiz: boolean; // This field is used in the profile tab screen
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

export type SubmittedAnswerType = {
  id: number;
  take_quiz: number;
  question: number;
  answer: number;
  is_hint_used: boolean;
};

export type QuizResultType = {
  id: number;
  quiz: number;
  answers: SubmittedAnswerType[];
  correct_answer_count: number;
  wrong_answer_count: number;
  empty_answer_count: number;
  score: number;
  achievement: number | null;
  date: string;
  user: number;
};
