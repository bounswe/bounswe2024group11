import React, { useState } from "react";
import { View, Text, Image } from "react-native";

import { styles } from "./Styles";
import { useTheme } from "../context/ThemeContext";
import { User, useUser } from "../context/UserContext";
import CustomButton from "./CustomButton";

const ProfileInfo = (props: { profileUser: User }) => {
  const theme = useTheme();
  const { profileUser } = props;
  const [following, setFollowing] = useState(true);
  const { user } = useUser();
  const onFollowPress = () => {
    setFollowing(false);
  };

  const onUnfollowPress = () => {
    setFollowing(true);
  };

  return (
    <View
      style={[
        {
          flexDirection: "column",
          flex: 1,
          padding: 24,

          alignItems: "center",
        },
      ]}
    >
      <Image
        source={require("../assets/zenith-logo-login.png")}
        style={styles.logo}
        resizeMethod="scale"
        resizeMode="contain"
      />

      <View>
        <Text style={styles.profileHeader}>{profileUser.fullname}</Text>
        <Text style={styles.profileSubHeader}>@{profileUser.username}</Text>
      </View>

      <View style={styles.profileInfoBox}>
        <View style={styles.profileChildBox}>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {profileUser.id}
          </Text>
          <Text>Posts</Text>
        </View>
        <View style={styles.profileChildBox}>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {profileUser.id}
          </Text>
          <Text>Followers</Text>
        </View>
        <View style={styles.profileChildBox}>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {profileUser.id}
          </Text>
          <Text>Following</Text>
        </View>
      </View>
      {user && user.user.id !== profileUser.id && (
        <View style={styles.profileInfoBox}>
          {following ? (
            <CustomButton
              text="Follow"
              onPress={onFollowPress}
              bgColor={theme.colors.neutral[9]}
              textColor={theme.colors.neutral[2]}
            />
          ) : (
            <CustomButton
              text="Unfollow"
              onPress={onUnfollowPress}
              bgColor={theme.colors.neutral[2]}
              textColor={theme.colors.neutral[9]}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default ProfileInfo;
