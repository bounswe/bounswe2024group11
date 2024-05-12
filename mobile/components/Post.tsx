import React from "react";

import { View, Text } from "react-native";
import { styles } from "./Styles";

type PostProps = {
  title: string;
  content: string;
  imgsource: string;
  likes: number;
  comments: number;
  bookmarked: boolean;
  onClick: () => void;
};

function Post({ props }: { props: PostProps }) {
  const { title, content, imgsource, likes, comments, bookmarked } = props;

  return (
    <View style={styles.post}>
      <Text>Post</Text>
    </View>
  );
}
