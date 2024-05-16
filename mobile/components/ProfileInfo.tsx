import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

import { styles } from "./Styles";
import { useTheme } from "../context/ThemeContext";
import { User, useUser } from "../context/UserContext";
import CustomButton from "./CustomButton";
import { get } from "./StorageHandler";

const ProfileInfo = (props: { profileUserId: number }) => {
  const { profileUserId } = props;

  const theme = useTheme();
  const { user } = useUser();

  const [following, setFollowing] = useState(true);
  const [profileInfo, setProfileInfo] = useState<User | undefined>(user?.user);

  useEffect(() => {}, []);

  const onFollowPress = () => {
    setFollowing(!following);
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
        <Text style={styles.profileHeader}>{profileInfo?.fullname}</Text>
        <Text style={styles.profileSubHeader}>@{profileInfo?.username}</Text>
      </View>

      <View style={styles.profileInfoBox}>
        <View style={styles.profileChildBox}>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {profileInfo?.id}
          </Text>
          <Text>Posts</Text>
        </View>
        <View style={styles.profileChildBox}>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {profileInfo?.id}
          </Text>
          <Text>Followers</Text>
        </View>
        <View style={styles.profileChildBox}>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {profileInfo?.id}
          </Text>
          <Text>Following</Text>
        </View>
      </View>
      {user && user.user.id !== profileInfo?.id && (
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
              onPress={onFollowPress}
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
