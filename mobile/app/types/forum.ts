export type Tag = {
  id: string;
  name: string;
  description: string;
};

export type Author = {
  full_name: string;
  username: string;
  avatar: string;
};

export type Question = {
  id: string;
  title: string;
  body: string;
  tags: Tag[];
  author: Author;
  created_at: string;
  answers_count: number;
  is_bookmarked: boolean;
  is_upvoted: number | null;
  upvotes_count: number;
  is_downvoted: number | null;
  downvotes_count: number;
};

export type Answer = {
  id: string;
  body: string;
  author: Author;
  created_at: string;
  is_upvoted: boolean;
  upvotes_count: number;
  is_downvoted: boolean;
  downvotes_count: number;
};
