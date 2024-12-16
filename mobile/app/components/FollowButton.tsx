import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface FollowButtonProps {
  isFollowing: boolean;
  handleFollowToggle: () => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  isFollowing,
  handleFollowToggle,
}) => {
  return (
    <TouchableOpacity
      onPress={handleFollowToggle}
      style={[
        styles.button,
        { backgroundColor: isFollowing ? "#5BADCE" : "white" },
      ]}
    >
      <View style={styles.buttonContent}>
        <Text
          style={[
            styles.buttonText,
            { color: isFollowing ? "white" : "#5BADCE" },
          ]}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Text>
        <Icon
          name={isFollowing ? "account-minus" : "account-plus"}
          size={20}
          color={isFollowing ? "white" : "#5BADCE"}
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    borderWidth: 1,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    marginRight: 8,
  },
  icon: {
    marginLeft: 8,
  },
});

export default FollowButton;
