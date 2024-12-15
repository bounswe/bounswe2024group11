import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RootStackParamList } from "../../App";
import QuizCard from "../components/QuizCard";
import { QuizOverview } from "../types/quiz";
import API_URL_GLOBAL from "../../config";

//const API_URL = "http://138.68.97.90/api/v1/quizzes/";
const API_URL = `${API_URL_GLOBAL}quizzes/`;

type QuizScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const QuizFeed: React.FC = () => {
  const [quizzes, setQuizzes] = useState<QuizOverview[]>([]);

  const navigation = useNavigation<QuizScreenNavigationProp>();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const result = await axios.get(`${API_URL}`);
        setQuizzes(result.data.results);
      } catch (error) {
        console.error("Error fetching questions", error);
      }
    };

    if (isFocused) {
      fetchQuestions();
    }
  }, [isFocused]);

  const handleCreateQuiz = () => {
    navigation.navigate("CreateQuiz");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quizzes</Text>
      <Text style={styles.titleText}>
        Test your knowledge of various topics.
      </Text>
      <FlatList
        data={quizzes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("QuizDetail", { quiz: item });
            }}
          >
            <QuizCard item={item} />
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleCreateQuiz}
      >
        <Icon name="plus" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 24,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "normal",
    marginBottom: 24,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    backgroundColor: "#0ea5e9",
    // borderColor: "#0ea5e9",
    // borderWidth: 1,
    elevation: 16,
  },
});

export default QuizFeed;
