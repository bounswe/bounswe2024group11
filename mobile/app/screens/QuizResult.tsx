import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { RootStackParamList } from "../../App";
import API_URL_GLOBAL from "../../config";
import { rateQuizType } from "../types/quiz";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type QuizResultScreenRouteProp = RouteProp<RootStackParamList, "QuizResult">;

type Props = {
  route: QuizResultScreenRouteProp;
};

const QuizResult: React.FC<Props> = ({ route }) => {
  const { quizResult } = route.params;

  const [rating, setRating] = useState<rateQuizType>({
    stars: 0,
    comment: "",
  });

  const navigation = useNavigation<NavigationProp>();

  const handleRating = (new_rating: number) => {
    const updatedRating = {
      stars: new_rating,
      comment: rating.comment,
    };
    setRating(updatedRating);
  };

  const handleFeedback = (new_comment: string) => {
    const updatedRating = {
      stars: rating.stars,
      comment: new_comment,
    };
    setRating(updatedRating);
  };

  const handleReview = () => {
    // navigation.navigate("ViewQuiz", { id: quizResult.quiz });
  };

  const handleReattempt = () => {
    // navigation.navigate("ViewQuiz", { id: quizResult.quiz });
  };

  const handleSubmit = async () => {
    const ENDPOINT = `${API_URL_GLOBAL}rate-quiz/`;
    const response = await axios.post(ENDPOINT, {
      quiz: quizResult.quiz,
      rating: rating.stars,
      comment: rating.comment,
    });
    console.log(response);

    navigation.navigate("MainTabs");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You've aced it!</Text>
      <View style={styles.numbersContainer}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Your Correct Answers:</Text>
          <Text style={styles.resultText}>
            {quizResult.correct_answer_count}
          </Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Your Wrong Answers:</Text>
          <Text style={styles.resultText}>{quizResult.wrong_answer_count}</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Your Empty Answers:</Text>
          <Text style={styles.resultText}>{quizResult.empty_answer_count}</Text>
        </View>
        <View style={styles.totalDivider}></View>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Total Question Count:</Text>
          <Text style={styles.resultText}>
            {quizResult.correct_answer_count +
              quizResult.wrong_answer_count +
              quizResult.empty_answer_count}
          </Text>
        </View>
      </View>

      <View style={styles.numbersContainer}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Total Hints Used:</Text>
          <Text style={styles.resultText}>
            {quizResult.answers.filter((answer) => answer.is_hint_used).length}
          </Text>
        </View>
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreTitle}>You got:</Text>
        <View style={styles.scoreBar}>
          <Text style={styles.scoreText}>{quizResult.score}</Text>
          <Text style={styles.scoreTitle}>/ {quizResult.max_score}</Text>
        </View>
      </View>

      <View style={styles.interactionContainer}>
        <View style={styles.ratingContainer}>
          <AirbnbRating
            defaultRating={rating.stars}
            onFinishRating={handleRating}
          />
        </View>
        <View style={styles.feedbackContainer}>
          <TextInput
            style={styles.feedbackInput}
            value={rating.comment}
            onChangeText={handleFeedback}
            placeholder="Give the quiz owner some feedback..."
            multiline
          />
        </View>
      </View>

      <View style={styles.navigationContainer}>
        <View style={styles.quizNavigationContainer}>
          <TouchableOpacity
            style={styles.quizNavigationButton}
            onPress={handleReview}
          >
            <Text>Review Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quizNavigationButton}
            onPress={handleReattempt}
          >
            <Text>Re-attempt Quiz</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.continueContainer}
          onPress={handleSubmit}
        >
          <View style={styles.continueButton}>
            <Text>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  numbersContainer: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    marginVertical: 8,
  },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 16,
    marginVertical: 8,
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  divider: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginHorizontal: 8,
  },
  totalDivider: {
    borderWidth: 1,
    borderColor: "#94a3b8",
    marginHorizontal: 8,
    marginTop: 16,
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#155e75",
    backgroundColor: "#67e8f9",
    marginTop: 32,
    padding: 16,
    alignItems: "center",
  },
  scoreTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  scoreText: {
    fontSize: 36,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  scoreBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  interactionContainer: {
    marginVertical: 8,
  },
  ratingContainer: {},
  feedbackContainer: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    marginVertical: 16,
  },
  feedbackInput: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  navigationContainer: {},
  quizNavigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  quizNavigationButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
  },
  continueContainer: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButton: {},
});

export default QuizResult;
