import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { Author } from "../types/forum";

interface ProfileButtonProps {
  author: Author;
}

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ProfileScreen"
>;

const ProfileButton: React.FC<ProfileButtonProps> = ({ author }) => {
  const [isProfileActive, setIsProfileActive] = useState(false);
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleProfileNavigation = () => {
    setIsProfileActive(!isProfileActive);
    navigation.navigate("ProfileScreen", { username: author.username });
  };

  return (
    <TouchableOpacity
      style={styles.profileIcon}
      onPress={handleProfileNavigation}
    >
      <Icon
        name="account-circle"
        color={isProfileActive ? "blue" : "grey"}
        size={24}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});

export default ProfileButton;
