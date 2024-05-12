import React from "react";

import { View, Text } from "react-native";

import { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";

import FeedHeader from "../components/FeedHeader";
import CreatePostButton from "../components/CreatePostButton";
import Post from "../components/Post";
import { RootStackParamList } from "../components/Types";
import { useUser } from "../context/UserContext";
import { styles } from "../components/Styles";

type FeedNavigationProp = MaterialBottomTabNavigationProp<
  RootStackParamList,
  "Feed"
>;

function Feed({ navigation }: { navigation: FeedNavigationProp }) {
  const { user, setUser } = useUser();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FeedHeader navigation={navigation} />
      <View style={styles.center}>
        <Post props={{authorImg: 'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg', likes: 5, authorNS: "Arda Vural", authorUsername: "arda_vural", title: "ARDA HAS BECOME A HERO", content: "AA s  s  a dsfkpsdfnsd vjsdnvdsjvsj vsjdvfnsdlnvsd vnksd vldjsvnsdjl",bookmarked: true, imgsource: 'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg', onClickFunction: () => console.log("arda") }} />
      </View>
      {user && <CreatePostButton navigation={navigation} />}
    </View>
  );
}

export default Feed;
