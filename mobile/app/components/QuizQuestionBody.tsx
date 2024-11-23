import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { QuizQuestionType } from "../types/quiz";
import QuizQuestionOptions from "./QuizQuestionOptions";

interface QuizQuestionBodyProps {
  question: QuizQuestionType;
  quiz_type: number;
  is_review: boolean;
  selectedOption: number | null;
  checkedOptions: number[];
  onSelectOption: (option: number) => void;
}

const QuizQuestionBody: React.FC<QuizQuestionBodyProps> = ({
  question,
  quiz_type,
  is_review,
  selectedOption,
  checkedOptions,
  onSelectOption,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {quiz_type == 1
          ? "What is the Turkish translation of "
          : quiz_type == 2
            ? "What is the English translation of "
            : "What is the sense of "}
        "{question.question_text}"?
      </Text>
      <QuizQuestionOptions
        options={question.choices}
        selectedOption={selectedOption}
        onSelectOption={onSelectOption}
        is_review={is_review}
        checkedOptions={checkedOptions}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "80%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 64,
    marginBottom: 32,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default QuizQuestionBody;
