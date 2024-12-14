import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Question } from "../types/forum";
import AuthorView from "./AuthorView";
import BookmarkButton from "./BookmarkButton";
import VoteButtonsView from "./VoteButtonsView";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

interface ForumQuestionCardProps {
  item: Question;
}

const ForumQuestionCard: React.FC<ForumQuestionCardProps> = ({ item }) => {
  const [question, setQuestion] = useState(item);

  const handleVoteChange = (
    isUpvoteId: number | null,
    isDownvoteId: number | null
  ) => {
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      is_upvoted: isUpvoteId,
      is_downvoted: isDownvoteId,
      upvotes_count: isUpvoteId
        ? prevQuestion.is_upvoted
          ? prevQuestion.upvotes_count
          : prevQuestion.upvotes_count + 1
        : prevQuestion.is_upvoted
          ? prevQuestion.upvotes_count - 1
          : prevQuestion.upvotes_count,
      downvotes_count: isDownvoteId
        ? prevQuestion.is_downvoted
          ? prevQuestion.downvotes_count
          : prevQuestion.downvotes_count + 1
        : prevQuestion.is_downvoted
          ? prevQuestion.downvotes_count - 1
          : prevQuestion.downvotes_count,
    }));
  };

  const handleBookmarkChange = (newBookmarkState: number | null) => {
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      is_bookmarked: newBookmarkState,
    }));
  };

  return (
    <View>
      <Card style={styles.card}>
        <View style={styles.container}>
          <AuthorView author={item.author} />
          <View style={styles.buttonsContainer}>
            {question.is_my_forum_question && (
              <EditButton questionId={question.id} />
            )}
            {question.is_my_forum_question && (
              <DeleteButton questionId={Number(question.id)} />
            )}
            <BookmarkButton
              initialBookmarkState={question.is_bookmarked}
              questionId={Number(question.id)}
              onBookmarkChange={handleBookmarkChange}
            />
          </View>
        </View>
        <Text style={styles.title}>{question.title}</Text>
        <Text style={styles.body}>{question.question}</Text>
        <View style={styles.tagsContainer}>
          {(question.tags || []).map((tag, index) => (
            <Text key={`${tag.id}-${index}`} style={styles.tag}>
              #{tag.name}
            </Text>
          ))}
        </View>
        <View style={styles.footer}>
          <View style={styles.answersContainer}>
            <Icon name="comment-text-outline" size={24} color="grey" />
            <Text style={styles.answersCount}>
              {question.answers_count} Answers
            </Text>
          </View>
          <VoteButtonsView
            is_upvoted={question.is_upvoted}
            upvotes_count={question.upvotes_count}
            is_downvoted={question.is_downvoted}
            downvotes_count={question.downvotes_count}
            questionId={Number(question.id)}
            onVoteChange={handleVoteChange}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  body: {
    color: "grey",
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  tag: {
    backgroundColor: "#f0f0f0",
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  answersContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  answersCount: {
    marginLeft: 10,
  },
});

export default ForumQuestionCard;
