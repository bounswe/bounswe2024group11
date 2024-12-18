import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RootStackParamList } from "../../App";
import API_URL_GLOBAL from "../../config";
import ForumQuestionCard from "../components/ForumQuestionCard";
import { Question } from "../types/forum";

type ForumScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Forum: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [refreshing, setRefreshing] = useState(false); // Refreshing state

  const navigation = useNavigation<ForumScreenNavigationProp>();
  const isFocused = useIsFocused();
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${API_URL_GLOBAL}forum-questions/`);
      setQuestions(result.data.results);
    } catch (error) {
      console.error("Error fetching questions", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  useEffect(() => {
    if (isFocused) {
      fetchQuestions();
    }
  }, [isFocused]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchQuestions();
  };

  const handleBookmarkChange = (
    questionId: number,
    newBookmarkState: number | null
  ) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        Number(question.id) === questionId
          ? { ...question, is_bookmarked: newBookmarkState }
          : question
      )
    );
  };

  const handleVoteChange = (
    questionId: number,
    isUpvoteId: number | null,
    isDownvoteId: number | null
  ) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        Number(question.id) === questionId
          ? {
              ...question,
              is_upvoted: isUpvoteId,
              is_downvoted: isDownvoteId,
              upvotes_count: isUpvoteId
                ? question.is_upvoted
                  ? question.upvotes_count
                  : question.upvotes_count + 1
                : question.is_upvoted
                  ? question.upvotes_count - 1
                  : question.upvotes_count,
              downvotes_count: isDownvoteId
                ? question.is_downvoted
                  ? question.downvotes_count
                  : question.downvotes_count + 1
                : question.is_downvoted
                  ? question.downvotes_count - 1
                  : question.downvotes_count,
            }
          : question
      )
    );
  };

  const handleCreateQuestion = () => {
    (navigation as any).navigate("CreateQuestion"); // not sure about this solution
  };

  const handleDeleteQuestion = (deletedQuestionId: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter(
        (question) => Number(question.id) !== deletedQuestionId
      )
    );
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {loading ? ( // Show loading spinner while fetching data
        <ActivityIndicator size="large" color="#2196F3" />
      ) : (
        <FlatList
          data={questions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.navigate("ForumQuestionDetail", {
                  question: item,
                  onBookmarkChange: handleBookmarkChange,
                  onVoteChange: handleVoteChange,
                })
              }
            >
              <ForumQuestionCard
                item={item}
                onBookmarkChange={handleBookmarkChange}
                onVoteChange={handleVoteChange}
                onDelete={handleDeleteQuestion}
              />
            </TouchableOpacity>
          )}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleCreateQuestion}
      >
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
});
export default Forum;
