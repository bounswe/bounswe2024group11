import React from "react";

import { View } from "react-native";
import { Button, FAB, Icon } from "react-native-paper";

import { styles } from "./Styles";
import { RootStackParamList } from "./Types";
import { useTheme } from "../context/ThemeContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const CreatePostButton = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Feed">>();
  const handleCreatePost = () => {
    navigation.navigate("CreatePost");
  };

  const theme = useTheme();

  return (
    <View style={styles.createPostButton}>
      <FAB
        icon="plus"
        style={{
          backgroundColor: theme.colors.neutral[9],
        }}
        rippleColor={theme.colors.neutral[7]}
        color={theme.colors.neutral[0]}
        onPress={handleCreatePost}
      />
    </View>
  );
};

export default CreatePostButton;
