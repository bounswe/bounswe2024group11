export type LoggedinUser = {
  id?: number;
  username: string;
  email: string;
  full_name: string;
  avatar: string;
  is_following?: boolean;
};
