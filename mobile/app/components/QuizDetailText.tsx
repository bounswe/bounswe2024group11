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
        The quiz consists of {item.question_count} questions. You can move the
        next or previous question using the buttons below. will be provided{" "}
        {item.question_count} minutes to complete the quiz.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {},
  description: {},
  info: {},
});

export default QuizDetailText;
