import React from "react";

import { View, Text, Image } from "react-native";
import { Appbar, Button } from "react-native-paper";

import { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";

import { RootStackParamList } from "./Types";
import { styles } from "./Styles";
import { useUser } from "../context/UserContext";

type ProfileNavigationProp = MaterialBottomTabNavigationProp<
  RootStackParamList,
  "Profile"
>;

const ProfileHeader = ({
  navigation,
}: {
  navigation: ProfileNavigationProp;
}) => {
  const { user, setUser } = useUser();
  const handleLogOut = () => {
    setUser(null);
    navigation.navigate("Auth");
  };

  return (
    <Appbar.Header style={styles.appBar}>
      <Appbar.Content
        title={
          <View style={styles.headerLogo}>
            <Image
              source={require("../assets/zenith-logo.png")}
              style={styles.headerLogoImage}
            />
            <Text style={styles.headerText}>Zenith</Text>
          </View>
        }
      />

      <Appbar.Content
        title={
          <View style={styles.headerRight}>
            {user && (
              <Button
                mode="contained"
                onPress={handleLogOut}
                style={styles.headerButton}
              >
                Log Out
              </Button>
            )}
          </View>
        }
      />
    </Appbar.Header>
  );
};

export default ProfileHeader;
