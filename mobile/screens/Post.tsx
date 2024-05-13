import React from "react";
import { View, Text } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../components/Types";

type PostNavigationProp = StackNavigationProp<RootStackParamList, "Post">;

function Post({ navigation }: { navigation: PostNavigationProp }) {
  return (
    <View>
      <Text>Post</Text>
    </View>
  );
}

export default Post;
