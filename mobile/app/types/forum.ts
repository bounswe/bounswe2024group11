export type Tag = {
  id: string;
  name: string;
  description: string;
};

export type Author = {
  id: number;
  username: string;
  email: string;
  full_name: string;
  avatar: string;
};

export type Question = {
  id: string;
  title: string;
  question: string;
  tags: Tag[];
  author: Author;
  created_at: string;
  answers_count: number;
  is_bookmarked: number | null;
  is_upvoted: number | null;
  is_my_forum_question: number | null;
  upvotes_count: number;
  is_downvoted: number | null;
  downvotes_count: number;
  answers?: Answer[];
};

export type Answer = {
  id: string;
  body: string;
  author: Author;
  created_at: string;
  is_upvoted: number | null;
  is_my_answer: number | null;
  upvotes_count: number;
  is_downvoted: number | null;
  downvotes_count: number;
  forum_question: number;
  answers?: Answer[];
};
