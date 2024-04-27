import React from "react";

import { View, Text, Image } from "react-native";
import { Appbar, Button } from "react-native-paper";

import { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";

import { styles } from "../components/Styles";
import { RootStackParamList } from "../components/Types";
import { useUser } from "../context/UserContext";

type FeedNavigationProp = MaterialBottomTabNavigationProp<
  RootStackParamList,
  "Feed"
>;

const FeedHeader = ({ navigation }: { navigation: FeedNavigationProp }) => {
  const goToLogin = () => {
    navigation.navigate("Login");
  };

  const { user, setUser } = useUser();
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
            {!user.isLogged && (
              <Button
                mode="contained"
                onPress={goToLogin}
                style={styles.headerButton}
              >
                Log In
              </Button>
            )}
          </View>
        }
      />
    </Appbar.Header>
  );
};

export default FeedHeader;
