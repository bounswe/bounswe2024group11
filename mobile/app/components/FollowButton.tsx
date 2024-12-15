// FollowButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface FollowButtonProps {
  isFollowing: boolean;
  handleFollowToggle: () => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  isFollowing,
  handleFollowToggle,
}) => {
  return (
    <TouchableOpacity onPress={handleFollowToggle} style={styles.button}>
      <Text style={styles.buttonText}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#5BADCE",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default FollowButton;
