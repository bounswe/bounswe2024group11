import React, { useEffect } from "react";

import { RouteProp, NavigationProp } from "@react-navigation/native";

import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";

import { RootStackParamList } from "../components/Types";
import { styles } from "../components/Styles";
import ProfileInfo from "../components/ProfileInfo";

type ProfileScreenProps = {
  navigation: NavigationProp<RootStackParamList, "Profiles">;
  route: RouteProp<RootStackParamList, "Profiles">;
};

function ProfileScreen({ navigation, route }: ProfileScreenProps) {
  const { profileUserId } = route.params;

  useEffect(() => {
    console.log("Profile screen for user", profileUserId);
  });
  return (
    <ScrollView
      style={[
        styles.container,
        {
          flexDirection: "column",
        },
      ]}
    >
      <ProfileInfo profileUserId={profileUserId} />
    </ScrollView>
  );
}

export default ProfileScreen;
