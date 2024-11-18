import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface QuizQuestionButtonsProps {
  currentQuestionIndex: number;
  questions_length: number;
  goToPreviousQuestion: () => void;
  goToNextQuestion: () => void;
}

const QuizQuestionButtons: React.FC<QuizQuestionButtonsProps> = ({
  currentQuestionIndex,
  questions_length,
  goToNextQuestion,
  goToPreviousQuestion,
}) => {
  return (
    <View style={styles.container}>
      {currentQuestionIndex > 0 && (
        <Text
          style={[styles.button, styles.previousButton]}
          onPress={goToPreviousQuestion}
        >
          Previous
        </Text>
      )}
      {currentQuestionIndex < questions_length - 1 && (
        <Text
          style={[styles.button, styles.nextButton]}
          onPress={goToNextQuestion}
        >
          Next
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  button: {
    padding: 16,
    borderRadius: 8,
    elevation: 1,
  },
  previousButton: {
    position: "absolute",
    left: 16,
    bottom: 16,
    backgroundColor: "#FFFFFF",
  },
  nextButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#020617",
    color: "#FFFFFF",
  },
});

export default QuizQuestionButtons;
