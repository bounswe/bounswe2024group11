export type RootStackParamList = {
  Home: undefined;
  Auth: undefined;
  Feed: undefined;
  Post: { props: PostProps };
  Search: undefined;
  Profile: undefined;
  CreatePost: undefined;
};

interface PostProps {
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
