import React from "react";

import { View, Text, Image } from "react-native";
import { Appbar, Button } from "react-native-paper";

import { NavigationProp, useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "./Types";
import { styles } from "./Styles";
import { useUser } from "../context/UserContext";
import { removeData } from "./StorageHandler";

const ProfileHeader = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Profile">>();
  const { user, setUser } = useUser();
  const handleLogOut = () => {
    removeData();
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
