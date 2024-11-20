import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

interface QuizQuestionOptionProps {
  option: string;
  isSelected: boolean;
}

const QuizQuestionOption: React.FC<QuizQuestionOptionProps> = ({
  option,
  isSelected,
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
});

export default QuizQuestionOption;
