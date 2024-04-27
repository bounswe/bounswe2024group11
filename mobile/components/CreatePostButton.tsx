import React from "react";

import { View } from "react-native";
import { Button, Icon } from "react-native-paper";

import { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";

import { styles } from "./Styles";
import { RootStackParamList } from "./Types";

type FeedNavigationProp = MaterialBottomTabNavigationProp<
  RootStackParamList,
  "Feed"
>;

const CreatePostButton = ({
  navigation,
}: {
  navigation: FeedNavigationProp;
}) => {
  const handleCreatePost = () => {};

  return (
    <View>
      <Button
        mode="elevated"
        onPress={handleCreatePost}
        style={styles.createPostButton}
        buttonColor="#1F232E"
        rippleColor="#1F232E"
        textColor="white"
      >
        <Icon source="plus" size={20} color="white" />
      </Button>
    </View>
  );
};

export default CreatePostButton;
