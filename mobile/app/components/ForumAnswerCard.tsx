import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { Answer } from "../types/forum";
import AuthorView from "./AuthorView";
import VoteButtonsView from "./VoteButtonsView";

interface ForumAnswerCardProps {
  item: Answer;
}

const ForumAnswerCard: React.FC<ForumAnswerCardProps> = ({ item }) => {
  return (
    <View>
      <Card style={{ borderRadius: 10, marginBottom: 10, padding: 10 }}>
        <View style={styles.container}>
          <AuthorView author={item.author} />
          {/* <Text style={styles.posted_time}>Posted {getRelativeTime(new Date(item.created_at))}</Text> */}
          <Text style={styles.posted_time}>Posted</Text>
        </View>
        <Text>{item.body}</Text>
        <VoteButtonsView
          is_upvoted={item.is_upvoted}
          upvotes_count={item.upvotes_count}
          is_downvoted={item.is_downvoted}
          downvotes_count={item.downvotes_count}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // alignItems: 'center',
    justifyContent: "space-between",
    marginBottom: 10,
  },
  posted_time: {
    color: "grey",
    marginLeft: 10,
    // justifyContent: 'flex-end',
  },
});

export default ForumAnswerCard;
