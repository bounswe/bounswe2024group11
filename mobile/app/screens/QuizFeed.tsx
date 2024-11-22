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
import { RootStackParamList } from "../../App";
import QuizCard from "../components/QuizCard";
import { QuizOverview } from "../types/quiz";

// const API_URL = "http://54.247.125.93/api/v1/quizzes/";
const API_URL = "http://10.0.2.2:8000/api/v1/quizzes/";

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
});

export default QuizFeed;
