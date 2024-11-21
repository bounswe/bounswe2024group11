import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface QuizQuestionButtonsProps {
  currentQuestionIndex: number;
  questions_length: number;
  is_review: boolean;
  goToPreviousQuestion: () => void;
  goToNextQuestion: () => void;
  onSubmit: () => void;
}

const QuizQuestionButtons: React.FC<QuizQuestionButtonsProps> = ({
  currentQuestionIndex,
  questions_length,
  is_review,
  goToNextQuestion,
  goToPreviousQuestion,
  onSubmit,
}) => {
  const screenWidth = Dimensions.get("window").width;
  const fullCardWidth = screenWidth - 80;
  const halfCardWidth = fullCardWidth / 2;

  return (
    <View style={styles.container}>
      {is_review ? (
        <>
          {currentQuestionIndex > 0 && (
            <TouchableOpacity
              style={[
                styles.button,
                styles.previousButton,
                { width: halfCardWidth },
              ]}
              onPress={goToPreviousQuestion}
            >
              <Text style={styles.previousButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          {currentQuestionIndex < questions_length - 1 ? (
            <TouchableOpacity
              style={[
                styles.button,
                styles.nextButton,
                { width: halfCardWidth },
              ]}
              onPress={goToNextQuestion}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.button,
                styles.submitButton,
                { width: halfCardWidth },
              ]}
              onPress={onSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <TouchableOpacity
          style={[styles.button, styles.checkButton, { width: fullCardWidth }]}
        >
          <Text style={styles.previousButtonText}>Check</Text>
        </TouchableOpacity>
      )}
      {}
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
    marginTop: 48,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    elevation: 1,
  },
  previousButton: {
    position: "absolute",
    left: 8,
    marginRight: 8,
    backgroundColor: "#FFFFFF",
  },
  nextButton: {
    position: "absolute",
    right: 8,
    marginLeft: 8,
    backgroundColor: "#020617",
  },
  checkButton: {
    position: "absolute",
    left: 16,
    backgroundColor: "#FFFFFF",
  },
  submitButton: {
    position: "absolute",
    right: 8,
    marginLeft: 8,
    backgroundColor: "#22D3EE",
  },
  previousButtonText: {
    alignSelf: "center",
  },
  nextButtonText: {
    color: "#FFFFFF",
    alignSelf: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    alignSelf: "center",
  },
});

export default QuizQuestionButtons;
