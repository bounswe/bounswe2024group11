import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface VoteButtonViewsProps {
  is_upvoted: boolean;
  upvotes_count: number;
  is_downvoted: boolean;
  downvotes_count: number;
}

const VoteButtonsView: React.FC<VoteButtonViewsProps> = ({
  is_upvoted,
  upvotes_count,
  is_downvoted,
  downvotes_count,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.iconButton, is_upvoted && styles.upvotedButton]}
      >
        <Icon name="arrow-up" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.votesCount}>{upvotes_count - downvotes_count}</Text>
      <TouchableOpacity
        style={[styles.iconButton, is_downvoted && styles.downvotedButton]}
      >
        <Icon name="arrow-down" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "#fff",
  },
  upvotedButton: {
    backgroundColor: "#4CAF50",
  },
  downvotedButton: {
    backgroundColor: "#F44336",
  },
  votesCount: {
    fontSize: 16,
    marginHorizontal: 5,
  },
});

export default VoteButtonsView;
