import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

import { styles } from "./Styles";
import { useTheme } from "../context/ThemeContext";
import { User, useUser } from "../context/UserContext";
import CustomButton from "./CustomButton";
import { get } from "./StorageHandler";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./Types";

type EditProfileNavigationProp = NavigationProp<
  RootStackParamList,
  "EditProfile"
>; //componentta nası çalışıyor???

const ProfileInfo = (props: { profileUserId: number }) => {
  const navigation = useNavigation<EditProfileNavigationProp>();
  const { profileUserId } = props;

  const theme = useTheme();
  const { user } = useUser();

  const [success, setSuccess] = useState(false);

  const [authorBio, setAuthorBio] = useState("");
  const [authorImg, setAuthorImg] = useState("");
  const [authorUsername, setAuthorUsername] = useState("");
  const [authorFullName, setAuthorFullName] = useState("");
  //const [authorSurname, setAuthorSurname] = useState("");
  const [postNumber, setPostNumber] = useState(0);
  const [followersNumber, setFollowersNumber] = useState(0);
  const [followingNumber, setFollowingNumber] = useState(0);

  const [isMuted, setIsMuted] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    console.log("Fetching profile info", profileUserId);
    get({
      endpoint: `profiles/${profileUserId}`,
      token: user?.token,
      data: {},
    })
      .then((response) => {
        console.log(response);
        setAuthorImg(response.picture);
        setAuthorBio(response.biography);
        setPostNumber(response.post_count);
        setFollowersNumber(response.follower_count);
        setFollowingNumber(response.following_count);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [success]);

  useEffect(() => {
    get({
      endpoint: `users/${profileUserId}`,
      token: user?.token,
      data: {},
    })
      .then((response) => {
        console.log(response);
        setAuthorUsername(response.username);
        setAuthorFullName(response.fullname);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [success]);

  const onFollowPress = () => {
    setIsFollowed(!isFollowed);
  };
  const onBlockPress = () => {
    setIsBlocked(!isBlocked);
  };
  const onMutePress = () => {
    setIsMuted(!isMuted);
  };

  const onEditPress = () => {
    navigation.navigate("EditProfile", {
      authorImg,
      authorBio,
      setSuccess,
    }); //authorSurname
  };

  return (
    <View
      style={[
        {
          flexDirection: "column",
          flex: 1,
          padding: 24,

          alignItems: "center",
          justifyContent: "space-between",
        },
      ]}
    >
      {authorImg === "" ? null : (
        <Image
          source={{ uri: authorImg }}
          style={styles.logo}
          resizeMethod="scale"
          resizeMode="contain"
        />
      )}

      <View>
        <Text style={styles.profileHeader}>{authorFullName}</Text>
        <Text style={styles.profileSubHeader}>@{authorUsername}</Text>
      </View>
      <View>
        <Text>{authorBio}</Text>
      </View>
      <View style={styles.profileInfoBox}>
        <View style={styles.profileChildBox}>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {postNumber}
          </Text>
          <Text>Posts</Text>
        </View>
        <View style={styles.profileChildBox}>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {followersNumber}
          </Text>
          <Text>Followers</Text>
        </View>
        <View style={styles.profileChildBox}>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {followingNumber}
          </Text>
          <Text>Following</Text>
        </View>
      </View>
      {user && user.user.id !== profileUserId && (
        <View style={styles.profileInfoBox}>
          <CustomButton
            text={isFollowed ? "Follow" : "Unfollow"}
            onPress={onFollowPress}
            bgColor={theme.colors.neutral[9]}
            textColor={theme.colors.neutral[2]}
          />
          <CustomButton
            text={isBlocked ? "Block" : "Unblock"}
            onPress={onBlockPress}
            bgColor={theme.colors.neutral[9]}
            textColor={theme.colors.neutral[2]}
          />
          <CustomButton
            text={isMuted ? "Mute" : "Unmute"}
            onPress={onMutePress}
            bgColor={theme.colors.neutral[9]}
            textColor={theme.colors.neutral[2]}
          />
        </View>
      )}
      {user && user.user.id == profileUserId && (
        <View style={styles.profileInfoBox}>
          <CustomButton
            text="Edit"
            onPress={onEditPress}
            bgColor={theme.colors.neutral[9]}
            textColor={theme.colors.neutral[2]}
          />
        </View>
      )}
    </View>
  );
};

export default ProfileInfo;
