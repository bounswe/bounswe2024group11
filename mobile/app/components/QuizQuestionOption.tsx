import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

interface QuizQuestionOptionProps {
  option: string;
  isSelected: boolean;
  is_review: boolean;
  status: "correct" | "wrong" | "empty" | "regular";
}

const QuizQuestionOption: React.FC<QuizQuestionOptionProps> = ({
  option,
  isSelected,
  is_review,
  status,
}) => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const cardHeight = screenHeight / 4;
  const cardWidth = screenWidth / 2 - 40;

  return (
    <View
      key={option}
      style={[
        styles.option,
        isSelected && styles.selectedOption,
        status === "correct" && styles.correctOption,
        status === "wrong" && styles.wrongOption,
        status === "empty" && styles.emptyOption,
        { width: cardWidth, height: cardHeight },
      ]}
    >
      <Text style={[styles.text, isSelected && styles.selectedText]}>
        {option}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  option: {
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
    elevation: 2,
  },
  selectedOption: {
    backgroundColor: "#0891B2",
    elevation: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedText: {
    color: "#FFFFFF",
  },
  correctOption: {
    backgroundColor: "#22c55e",
  },
  wrongOption: {
    backgroundColor: "#ef4444",
  },
  emptyOption: {
    backgroundColor: "#eab308",
  },
});

export default QuizQuestionOption;
