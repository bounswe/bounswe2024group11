import React from "react";

import { View, Text } from "react-native";

import { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";

import FeedHeader from "../components/FeedHeader";
import CreatePostButton from "../components/CreatePostButton";

import { RootStackParamList } from "../components/Types";
import { useUser } from "../context/UserContext";
import { styles } from "../components/Styles";
import { isNewBackTitleImplementation } from "react-native-screens";

type FeedNavigationProp = MaterialBottomTabNavigationProp<
  RootStackParamList,
  "Feed"
>;

function Feed({ navigation }: { navigation: FeedNavigationProp }) {
  const { user, setUser } = useUser();

  const onClick = () => {
    console.log("Post clicked");

    navigation.navigate("Post");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FeedHeader navigation={navigation} />
      <View style={styles.center}>
        <Text>Feed</Text>
      </View>
      {user && <CreatePostButton navigation={navigation} />}
    </View>
  );
}

export default Feed;
