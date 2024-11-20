import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";

interface VoteButtonViewsProps {
  is_upvoted: boolean;
  upvotes_count: number;
  is_downvoted: boolean;
  downvotes_count: number;
  questionId: number;
  onVoteChange: (is_upvoted: boolean, is_downvoted: boolean) => void;
}

const VoteButtonsView: React.FC<VoteButtonViewsProps> = ({
  is_upvoted,
  upvotes_count,
  is_downvoted,
  downvotes_count,
  questionId,
  onVoteChange,
}) => {
  const handleUpvote = async () => {
    try {
      if (is_upvoted) {
        await axios.delete(
          `http://54.247.125.93/api/v1/forum-upvote/${questionId}/`
        );
        onVoteChange(false, is_downvoted);
      } else {
        await axios.post("http://54.247.125.93/api/v1/forum-upvote/", {
          forum_question: questionId,
        });
        onVoteChange(true, false);
      }
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };

  const handleDownvote = async () => {
    try {
      if (is_downvoted) {
        await axios.delete(
          `http://54.247.125.93/api/v1/forum-upvote/${questionId}/`
        );
        onVoteChange(is_upvoted, false);
      } else {
        await axios.post("http://54.247.125.93/api/v1/forum-upvote/", {
          forum_question: questionId,
        });
        onVoteChange(false, true);
      }
    } catch (error) {
      console.error("Error downvoting:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.iconButton, is_upvoted && styles.upvotedButton]}
        onPress={handleUpvote}
      >
        <Icon name="arrow-up" size={24} color={is_upvoted ? "#fff" : "#000"} />
      </TouchableOpacity>
      <Text style={styles.votesCount}>{upvotes_count - downvotes_count}</Text>
      <TouchableOpacity
        style={[styles.iconButton, is_downvoted && styles.downvotedButton]}
        onPress={handleDownvote}
      >
        <Icon
          name="arrow-down"
          size={24}
          color={is_downvoted ? "#fff" : "#000"}
        />
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
