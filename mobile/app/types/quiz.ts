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

export type QuizQuestionType = {
  id: number;
  question_text: string;
  choices: QuizQuestionOptionType[];
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
};

// export type QuizQuestionOptionsType = {
//   A: string;
//   B: string;
//   C: string;
//   D: string;
// };

// export type QuizQuestionType = {
//   id: string;
//   text: string;
//   options: QuizQuestionOptionsType;
//   correct_answer: string;
// };
