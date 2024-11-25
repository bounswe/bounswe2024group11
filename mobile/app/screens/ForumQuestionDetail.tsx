import { RouteProp } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
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

const API_URL = "http://138.68.97.90/api/v1/forum-questions/";

type ForumQuestionDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "ForumQuestionDetail"
>;

type Props = {
  route: ForumQuestionDetailScreenRouteProp;
};

const ForumQuestionDetail: React.FC<Props> = ({ route }) => {
  const { question } = route.params;
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [newAnswer, setNewAnswer] = useState<string>("");

  useEffect(() => {
    const fetchAnswers = async () => {
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
      }
    };

    fetchAnswers();
  }, [question.id]);

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
        { ...response.data, body: response.data.answer }, // Add new answer with the correct structure
      ]);
      setNewAnswer(""); // Clear the input field
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

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ForumQuestionCard item={question} />

      <FlatList
        data={answers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ForumAnswerCard item={item} />}
      />

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
