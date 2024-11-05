import { Author } from "./forum";
import { DummyTagForQuiz } from "./tag";

export type rating = {
  score: number;
  count: number;
};

export type QuizOverview = {
  id: string;
  type: number;
  title: string;
  description: string;
  author: Author;
  created_at: string;
  difficulty: string;
  is_taken: boolean;
  num_taken: number;
  question_count: number;
  rating: rating;
  tags: DummyTagForQuiz[];
};

export type QuizCardHeaderType = {
  difficulty: string;
  rating_score: number;
};
