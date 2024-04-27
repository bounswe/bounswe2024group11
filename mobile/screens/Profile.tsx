import React from "react";

import { View, Text } from "react-native";
import { Button } from "react-native-paper";

import { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";

import { RootStackParamList } from "../components/Types";
import ProfileHeader from "../components/ProfileHeader";
import { useUser } from "../context/UserContext";
import { styles } from "../components/Styles";

type ProfileNavigationProp = MaterialBottomTabNavigationProp<
  RootStackParamList,
  "Profile"
>;

function Profile({ navigation }: { navigation: ProfileNavigationProp }) {
  const { user } = useUser();
  return (
    <View style={{ flex: 1 }}>
      <ProfileHeader navigation={navigation} />
      <View style={{ flex: 1 }}>
        {user && user.isLogged ? (
          <View style={styles.center}>
            <Text>Profile</Text>
          </View>
        ) : (
          <View
            style={[
              styles.center,
              {
                backgroundColor: "white",
              },
            ]}
          >
            <Text style={{ padding: 10 }}>Log in to view your profile</Text>
            <Button
              onPress={() => navigation.navigate("Login")}
              style={styles.headerButton}
              labelStyle={{ color: "white" }}
            >
              Log in
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}

export default Profile;
