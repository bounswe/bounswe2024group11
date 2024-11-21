import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";

interface VoteButtonViewsProps {
  is_upvoted: number | null; // Now holds the upvote ID or null
  upvotes_count: number;
  is_downvoted: number | null; // Now holds the downvote ID or null
  downvotes_count: number;
  questionId: number;
  onVoteChange: (
    is_upvoted: number | null,
    is_downvoted: number | null
  ) => void;
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
        const response = await axios.delete(
          `http://54.247.125.93/api/v1/forum-upvote/${is_upvoted}/`
        );
        console.log("Upvote deleted:", response.data);
        onVoteChange(null, null); // Clear upvote state
      } else if (is_downvoted) {
        const response = await axios.delete(
          `http://54.247.125.93/api/v1/forum-downvote/${is_downvoted}/`
        );
        console.log("Downvote deleted:", response.data);
        onVoteChange(null, null); // Clear downvote state
        const response2 = await axios.post(
          `http://54.247.125.93/api/v1/forum-upvote/`,
          { forum_question: questionId }
        );
        console.log("Upvote added:", response2.data);
        onVoteChange(response2.data.id, null); // Update upvote state
      } else {
        const response = await axios.post(
          `http://54.247.125.93/api/v1/forum-upvote/`,
          { forum_question: questionId }
        );
        console.log("Upvote added:", response.data);
        onVoteChange(response.data.id, null); // Update upvote state
      }
    } catch (error) {
      console.error("Error handling upvote:", error);
    }
  };

  const handleDownvote = async () => {
    try {
      if (is_downvoted) {
        const response = await axios.delete(
          `http://54.247.125.93/api/v1/forum-downvote/${is_downvoted}/`
        );
        console.log("Downvote deleted:", response.data);
        onVoteChange(null, null); // Clear downvote state
      } else if (is_upvoted) {
        const response = await axios.delete(
          `http://54.247.125.93/api/v1/forum-upvote/${is_upvoted}/`
        );
        console.log("Upvote deleted:", response.data);
        onVoteChange(null, null); // Clear upvote state
        const response2 = await axios.post(
          `http://54.247.125.93/api/v1/forum-downvote/`,
          { forum_question: questionId }
        );
        console.log("Downvote added:", response2.data);
        onVoteChange(null, response2.data.id); // Update downvote state
      } else {
        const response = await axios.post(
          `http://54.247.125.93/api/v1/forum-downvote/`,
          { forum_question: questionId }
        );
        console.log("Downvote added:", response.data);
        onVoteChange(null, response.data.id); // Update downvote state
      }
    } catch (error) {
      console.error("Error handling downvote:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.iconButton,
          is_upvoted ? styles.upvotedButton : undefined,
        ]}
        onPress={handleUpvote}
      >
        <Icon name="arrow-up" size={24} color={is_upvoted ? "#fff" : "#000"} />
      </TouchableOpacity>
      <Text style={styles.votesCount}>{upvotes_count - downvotes_count}</Text>
      <TouchableOpacity
        style={[
          styles.iconButton,
          is_downvoted ? styles.downvotedButton : undefined,
        ]}
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
