import { RouteProp } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../App";

type QuizResultScreenRouteProp = RouteProp<RootStackParamList, "QuizResult">;

type Props = {
  route: QuizResultScreenRouteProp;
};

const QuizResult: React.FC<Props> = ({ route }) => {
  const { quizResult } = route.params;

  return (
    <View style={styles.container}>
      <Text>QuizResult</Text>
      <Text>Correct: {quizResult.correct_answer_count}</Text>
      <Text>Wrong: {quizResult.wrong_answer_count}</Text>
      <Text>Empty: {quizResult.empty_answer_count}</Text>
      <Text>Score: {quizResult.score}</Text>
      <Text>Achievement: {quizResult.achievement}</Text>

      <Text>Interaction</Text>
      <Text>Rate Quiz</Text>
      <Text>Give Feedback</Text>
      {/* <Text></Text> */}

      <Text>Navigation</Text>
      <Text>Review Quiz</Text>
      <Text>Re-attempt Quiz</Text>
      <Text>Continue</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
});

export default QuizResult;
