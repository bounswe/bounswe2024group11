import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Answer } from "../types/forum";
import AuthorView from "./AuthorView";
import VoteAnswerButtonsView from "./VoteAnswerButtonsView";
import DeleteAnswerButton from "./DeleteAnswerButton";
import EditAnswerButton from "./EditAnswerButton";

interface ForumAnswerCardProps {
  item: Answer;
  onAnswerDelete: (questionId: number, answerId: number) => void;
}

const ForumAnswerCard: React.FC<ForumAnswerCardProps> = ({
  item,
  onAnswerDelete,
}) => {
  const [answer, setAnswer] = useState(item);

  const handleVoteChange = (
    isUpvoteId: number | null,
    isDownvoteId: number | null
  ) => {
    setAnswer((prevAnswer) => ({
      ...prevAnswer,
      is_upvoted: isUpvoteId,
      is_downvoted: isDownvoteId,
      upvotes_count: isUpvoteId
        ? prevAnswer.is_upvoted
          ? prevAnswer.upvotes_count
          : prevAnswer.upvotes_count + 1
        : prevAnswer.is_upvoted
          ? prevAnswer.upvotes_count - 1
          : prevAnswer.upvotes_count,
      downvotes_count: isDownvoteId
        ? prevAnswer.is_downvoted
          ? prevAnswer.downvotes_count
          : prevAnswer.downvotes_count + 1
        : prevAnswer.is_downvoted
          ? prevAnswer.downvotes_count - 1
          : prevAnswer.downvotes_count,
    }));
  };

  return (
    <View>
      <Card style={{ borderRadius: 10, marginBottom: 10, padding: 10 }}>
        <View style={styles.container}>
          <AuthorView author={item.author} />
          <View style={styles.buttonsContainer}>
            {answer.is_my_answer && (
              <>
                <DeleteAnswerButton
                  questionId={Number(answer.forum_question)}
                  answerId={Number(answer.id)}
                  onDelete={onAnswerDelete}
                />
                <EditAnswerButton
                  questionId={Number(answer.forum_question)}
                  answerId={Number(answer.id)}
                />
              </>
            )}
            <Text style={styles.posted_time}>Posted</Text>
          </View>
        </View>
        <Text>{answer.body}</Text>
        <VoteAnswerButtonsView
          is_upvoted={answer.is_upvoted}
          upvotes_count={answer.upvotes_count}
          is_downvoted={answer.is_downvoted}
          downvotes_count={answer.downvotes_count}
          answerId={Number(answer.id)}
          onVoteChange={handleVoteChange}
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
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ForumAnswerCard;
