import React from "react";

import { RouteProp, NavigationProp } from "@react-navigation/native";

import { View } from "react-native";
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
  return (
    <View>
      <ProfileInfo profileUserId={profileUserId} />
    </View>
  );
}

export default ProfileScreen;
