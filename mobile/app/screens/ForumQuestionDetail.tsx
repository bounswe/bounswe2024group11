import { RouteProp, useIsFocused } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { RootStackParamList } from "../../App";
import ForumAnswerCard from "../components/ForumAnswerCard";
import ForumQuestionCard from "../components/ForumQuestionCard";
import { Answer } from "../types/forum";
import { useNavigation } from "@react-navigation/native";

const API_URL = "http://138.68.97.90/api/v1/forum-questions/";
// const API_URL = "http://10.0.2.2:8000/api/v1/forum-questions/";

type ForumQuestionDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "ForumQuestionDetail"
>;

type Props = {
  route: ForumQuestionDetailScreenRouteProp;
};

const ForumQuestionDetail: React.FC<Props> = ({ route }) => {
  const { question, onBookmarkChange, onVoteChange } = route.params;
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [newAnswer, setNewAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Loading state for answers
  const isFocused = useIsFocused(); // Hook to track focus status
  const navigation = useNavigation<ForumQuestionDetailScreenRouteProp>();

  // Fetch answers when the screen is focused or question ID changes
  const fetchAnswers = async () => {
    setLoading(true); // Set loading to true when fetching
    try {
      const response = await axios.get(`${API_URL}${question.id}/answers/`);
      // Map the 'answer' field to 'body' field
      const mappedAnswers = response.data.results.map((item: any) => ({
        ...item,
        body: item.answer, // Map 'answer' to 'body'
      }));
      setAnswers(mappedAnswers || []);
    } catch (error) {
      console.error("Error fetching answers:", error);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchAnswers(); // Fetch answers when the screen is focused
    }
  }, [question.id, isFocused]);

  const handleCreateAnswer = async () => {
    if (!newAnswer.trim()) {
      Alert.alert("Error", "Answer cannot be empty.");
      return;
    }

    try {
      console.log("Submitting answer payload:", { answer: newAnswer });
      const response = await axios.post(`${API_URL}${question.id}/answers/`, {
        answer: newAnswer,
      });
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        { ...response.data, body: response.data.answer }, // Add new answer with correct structure
      ]);
      setNewAnswer(""); // Clear the input field
      fetchAnswers(); // Re-fetch answers after adding a new one
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error submitting answer:",
          error.response?.data || error.message
        );
        Alert.alert(
          "Error",
          error.response?.data?.message || "Failed to submit your answer."
        );
      } else {
        console.error("Error submitting answer:", error);
        Alert.alert("Error", "Failed to submit your answer.");
      }
    }
  };

  const handleDelete = async () => {
    try {
      //console.log(`Question with ID ${questionId} deleted successfully.`);
      (navigation as any).goBack(); // Navigates back to the Forum screen after deletion
    } catch (error) {
      console.error("Error deleting question:", error);
      Alert.alert("Error", "Failed to delete the question.");
    }
  };

  const handleAnswerDelete = (questionId: number, answerId: number) => {
    console.log(
      `Deleting answer with ID: ${answerId} for question ID: ${questionId}`
    );
    setAnswers((prevAnswers) =>
      prevAnswers.filter((answer) => Number(answer.id) !== answerId)
    );
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ForumQuestionCard
        item={question}
        onBookmarkChange={onBookmarkChange}
        onVoteChange={onVoteChange}
        onDelete={handleDelete}
      />

      {loading ? (
        // Displaying loading indicator while answers are being fetched
        <ActivityIndicator size="large" color="#2196F3" />
      ) : (
        <FlatList
          data={answers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ForumAnswerCard item={item} onAnswerDelete={handleAnswerDelete} />
          )}
        />
      )}

      <View style={styles.answerInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Write your answer..."
          value={newAnswer}
          onChangeText={setNewAnswer}
        />
        <Button title="Submit" onPress={handleCreateAnswer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  answerInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "grey",
  },
});

export default ForumQuestionDetail;
