import React from "react";

import { View, Text } from "react-native";
import { Button } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, Image, ImageSourcePropType } from "react-native";

import { NavigationProp } from "@react-navigation/native";

import { RootStackParamList } from "../components/Types";
import ProfileHeader from "../components/ProfileHeader";
import { useUser } from "../context/UserContext";
import { styles } from "../components/Styles";
import { useTheme } from "../context/ThemeContext";

import ProfileInfo from "../components/ProfileInfo";
import CustomOutput from "../components/CustomOutput";

type ProfileNavigationProp = NavigationProp<RootStackParamList, "Profile">;

function Profile({ navigation }: { navigation: ProfileNavigationProp }) {
  const { user } = useUser();
  const theme = useTheme();
  return (
    <ScrollView
      style={[
        styles.container,
        {
          flexDirection: "column",
        },
      ]}
    >
      <ProfileHeader />
      <View style={styles.container}>
        {user ? (
          <View
            style={[
              styles.center,
              {
                flexDirection: "column",
                flex: 1,
              },
            ]}
          >
            <ProfileInfo profileUserId={user.user.id} />
            {/* <Divider style={styles.divider}/>   
            <Image
              source={require("../assets/zenith-logo-login.png")}
              style={styles.logo}
              resizeMethod="scale"
              resizeMode="contain"
            />
            <Divider style={styles.divider}/>   
            <CustomOutput
              field_name="Full Name"
              value={user.fullname}
              image="account"
            />
            <CustomOutput
              field_name="E-mail"
              value={user.email}
              image="email"
            />
            <CustomOutput
              field_name="User Name"
              value={user.username}
              image="heart"
            />          
            <Divider style={styles.divider}/>
            <View
            style={[
              styles.center,
              {
                flexDirection: 'row',        
                justifyContent: "space-between",
                paddingHorizontal: 10       
              },
            ]}>
              <View>
                <Text>
                  Posts
                </Text>
                <Text>
                  {user.id}
                </Text>
              </View>
              <View>
                <Text>
                  Follewers
                </Text>
                <Text>
                  {user.id}
                </Text>
              </View>
              <View>
                <Text>
                  Following
                </Text>
                <Text>
                  {user.id}
                </Text>
              </View>
            </View>
            */}
          </View>
        ) : (
          <View
            style={[
              styles.center,
              {
                backgroundColor: "white",
                marginTop: 24,
              },
            ]}
          >
            <Text style={{ padding: 10 }}>Log in to view your profile</Text>
            <Button
              onPress={() => navigation.navigate("Auth")}
              style={styles.headerButton}
              labelStyle={{ color: theme.colors.neutral[0] }}
            >
              Log in
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default Profile;
