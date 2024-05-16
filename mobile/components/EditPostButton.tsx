import React from "react";

import { View } from "react-native";
import { Button, FAB, Icon } from "react-native-paper";

import { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";

import { styles } from "./Styles";
import { RootStackParamList } from "./Types";
import { useTheme } from "../context/ThemeContext";

type FeedNavigationProp = MaterialBottomTabNavigationProp<
  RootStackParamList,
  "Feed"
>;

const EditPostButton = ({
  navigation,
}: {
  navigation: FeedNavigationProp;
}) => {
  const handleEditPost = () => {
    navigation.navigate("EditPost", {authorNS: "string",
      authorImg: "string",
      authorUsername: "string",
      title: "string",
      content: "string",
      imgsource: "string",
      likes: 1,
      bookmarked: true,
      isLiked: true});
  };

  const theme = useTheme();

  return (
    <View style={styles.createPostButton}>
      <FAB
        icon="car"
        style={{
          backgroundColor: theme.colors.neutral[9],
        }}
        rippleColor={theme.colors.neutral[7]}
        color={theme.colors.neutral[0]}
        onPress={handleEditPost}
      />
    </View>
  );
};

export default EditPostButton;
