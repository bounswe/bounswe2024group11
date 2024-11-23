import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { QuizOverview } from "../types/quiz";

interface QuizDetailTextProps {
  item: QuizOverview;
}

const QuizDetailText: React.FC<QuizDetailTextProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ready to start to {item.title} quiz?</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.info}>
        The quiz consists of {item.questions.length} questions. You can move the
        next or previous question using the buttons below. will be provided{" "}
        {item.questions.length} minutes to complete the quiz.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    paddingVertical: 12,
  },
  description: {
    fontSize: 20,
    paddingVertical: 12,
  },
  info: {
    paddingTop: 80,
    fontSize: 16,
  },
});

export default QuizDetailText;
