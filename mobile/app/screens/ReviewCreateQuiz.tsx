import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RootStackParamList } from "../../App";
import { CreateQuizQuestionType } from "../types/quiz";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type CreateQuizQuestionScreenRouteProp = RouteProp<
  RootStackParamList,
  "ReviewCreateQuiz"
>;

interface Props {
  route: CreateQuizQuestionScreenRouteProp;
}

const ReviewCreateQuiz: React.FC<Props> = ({ route }) => {
  const { title, description, tags, quiz_type, questions, questionsCount } =
    route.params;

  const [editedQuestions, setEditedQuestions] =
    useState<CreateQuizQuestionType[]>(questions);

  // const API_URL = "http://138.68.97.90/api/v1";
  const API_URL = "http://10.0.2.2:8000/api/v1";
  const navigation = useNavigation<NavigationProp>();

  const moveQuestion = (index: number, direction: number) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= questionsCount) return;

    const updatedQuestions = [...editedQuestions];
    [updatedQuestions[index], updatedQuestions[targetIndex]] = [
      updatedQuestions[targetIndex],
      updatedQuestions[index],
    ];
    setEditedQuestions(updatedQuestions);
  };

  const filterHints = () => {
    const updatedQuestions = [...editedQuestions];
    updatedQuestions.forEach((question) => {
      if (question.hints[0]?.text === "") {
        question.hints = [];
      }
    });
    setEditedQuestions(updatedQuestions);
  };

  const createQuiz = async () => {
    const ENDPOINT = `${API_URL}/quizzes/`;

    filterHints();

    try {
      const response = await axios.post(`${ENDPOINT}`, {
        title,
        description,
        tags,
        type: quiz_type,
        questions: editedQuestions,
      });

      navigation.navigate("QuizFeed");
    } catch (error) {
      console.error("Error creating quiz", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Review your quiz</Text>
      <View style={styles.section}>
        <Text>Title: </Text>
        <Text>{title}</Text>
      </View>
      <View style={styles.section}>
        <Text>Description: </Text>
        <Text>{description}</Text>
      </View>
      <View style={styles.section}>
        <Text>Tags: </Text>
        <Text>{tags.map((tag) => tag.name).join(", ")}</Text>
      </View>
      <View style={styles.section}>
        <Text>Quiz Type: </Text>
        <Text>{quiz_type}</Text>
      </View>
      <View style={styles.section}>
        <Text>Question Count: </Text>
        <Text>{questionsCount}</Text>
      </View>
      <View>
        <FlatList
          data={editedQuestions}
          renderItem={({ item, index }) => (
            <View style={styles.questionContainer}>
              <View style={styles.questionText}>
                <Text>{item.question_text}</Text>
              </View>
              <View style={styles.questionPoint}>
                <Text>{item.point}</Text>
              </View>
              <View style={styles.questionActions}>
                <TouchableOpacity
                  style={styles.questionAction}
                  onPress={() => moveQuestion(index, -1)}
                >
                  <Icon name="arrow-up" size={20} color="#0f172a" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.questionAction}
                  onPress={() => moveQuestion(index, 1)}
                >
                  <Icon name="arrow-down" size={20} color="#0f172a" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={createQuiz}>
          <Text style={styles.buttonText}>Create Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  section: {
    flexDirection: "row",
    gap: 10,
  },
  questionContainer: {
    flexDirection: "row",
    gap: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginVertical: 4,
  },
  questionText: {
    flex: 1,
  },
  questionPoint: {
    width: 50,
  },
  questionActions: {
    flexDirection: "row",
    gap: 10,
  },
  questionAction: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  buttonContainer: {
    padding: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
    marginHorizontal: 24,
    marginVertical: 24,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#0ea5e9",
    backgroundColor: "#0ea5e9",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ReviewCreateQuiz;
