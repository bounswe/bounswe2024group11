export type RootStackParamList = {
  Home: undefined;
  Auth: undefined;
  Feed: undefined;
  Post: { post_id: number };
  Search: undefined;
  Profile: undefined;
  Profiles: { profileUserId: number };
  CreatePost: { setSuccess: (success: boolean) => void };
  EditPost: { postId: number };
  EditProfile: {
    authorImg: string;
    authorBio: string;
    setSuccess: (success: boolean) => void;
  };
};

interface PostProps {
  postId: number;
  authorNS: string;
  authorImg: string;
  authorUsername: string;
  title: string;
  content: string;
  imgsource: string;
  likes: number;
  bookmarked: boolean;
  isLiked: boolean;
}
