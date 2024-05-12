import React, { useState } from "react";
import { View, Text, Image} from "react-native";
import { Button } from "react-native-paper";

import { styles } from "./Styles";
import { useTheme } from "../context/ThemeContext";
import { Divider } from "react-native-paper";
import { User, useUser } from "../context/UserContext";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "./CustomButton";
const theme = useTheme();

const ProfileInfo = (props: {user: User}) => {
  const theme = useTheme();
  const { user } = props;
  const [following, setFollowing] = useState(true);

  // const onFollowPress = () => {
  //   setFollowing(false);
  // };

  // const onUnfollowPress = () => {
  //   setFollowing(true);
  // }

  return (
    <View>
      <Image
        source={require("../assets/zenith-logo-login.png")}
        style={styles.logo}
        resizeMethod="scale"
        resizeMode="contain"
      />

      <View>
        <Text style={styles.profileHeader}>
          {user.fullname}
        </Text>
        <Text style={styles.profileSubHeader}>
          @{user.username}
        </Text>
      </View>

      <View style={styles.profileInfoBox}>
        <View style={styles.profileChildBox}>
          <Text style={{
            fontWeight: "bold"
          }}>
            {user.id}
          </Text>
          <Text>
            Posts
          </Text>
        </View>
        <View style={styles.profileChildBox}>
          <Text style={{
            fontWeight: "bold"
          }}>
            {user.id}
          </Text>
          <Text>
            Followers
          </Text>
        </View>
        <View style={styles.profileChildBox}>
          <Text style={{
            fontWeight: "bold"
          }}>
            {user.id}
          </Text>
          <Text>
            Following
          </Text>
        </View>
      </View>

      <View>
        {following ?
        
        (<CustomButton
          text="Follow"
          // onPress={onFollowPress}
          onPress={() => null}
          bgColor={theme.colors.neutral[9]}
          textColor={theme.colors.neutral[0]}
        />) 
        
        : 
        
        (<CustomButton
          text="Unfollow"
          // onPress={onUnfollowPress}
          onPress={() => null}
          bgColor={theme.colors.neutral[9]}
          textColor={theme.colors.neutral[0]}
        />)

        }
        
      </View>
    </View>
  );
};

export default ProfileInfo;
