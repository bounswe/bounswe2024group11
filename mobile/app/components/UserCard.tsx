import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LoggedinUser } from "../types/user";
import UserView from "./UserView";

interface UserCardProps {
  user: LoggedinUser;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowPress = () => {
    setIsFollowing(!isFollowing);
    // API CALL TO FOLLOW/UNFOLLOW WILL COME HERE
    console.log(isFollowing ? "Unfollowed" : "Followed");
  };
  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <UserView user={user} />
        <View style={styles.followButton}>
          <TouchableOpacity
            onPress={handleFollowPress}
            style={[
              styles.button,
              { backgroundColor: isFollowing ? "#ffffff" : "#5BADCE" }, // Dynamic background color
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                { color: isFollowing ? "#5BADCE" : "#ffffff" },
              ]}
            >
              {isFollowing ? "Following" : "Follow"}
            </Text>
            <Icon
              name={isFollowing ? "account-check" : "account-plus"}
              size={20}
              color={isFollowing ? "#5BADCE" : "#ffffff"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 24,
    padding: 24,
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  followButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5BADCE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 0.3,
  },
  buttonText: {
    color: "#ffffff",
    marginRight: 8,
    fontWeight: "bold",
  },
});

export default UserCard;
