import React from "react";
import { StyleSheet, View } from "react-native";
import { QuizQuestionType } from "../types/quiz";
import QuizQuestionBody from "./QuizQuestionBody";
import QuizQuestionButtons from "./QuizQuestionButtons";

interface QuizQuestionProps {
  title: string;
  description: string;
  quiz_type: number;
  question: QuizQuestionType;
  currentQuestionIndex: number;
  questions_length: number;
  selectedOption: string | null;
  onSelectOption: (option: string) => void;
  goToPreviousQuestion: () => void;
  goToNextQuestion: () => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  title,
  description,
  quiz_type,
  selectedOption,
  onSelectOption,
  currentQuestionIndex,
  questions_length,
  goToPreviousQuestion,
  goToNextQuestion,
}) => {
  return (
    <View style={styles.container}>
      {/* <QuizQuestionHeader title={title} description={description} /> */}
      <QuizQuestionBody
        question={question}
        quiz_type={quiz_type}
        selectedOption={selectedOption}
        onSelectOption={onSelectOption}
      />
      <QuizQuestionButtons
        currentQuestionIndex={currentQuestionIndex}
        questions_length={questions_length}
        goToPreviousQuestion={goToPreviousQuestion}
        goToNextQuestion={goToNextQuestion}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    height: "100%",
  },
});

export default QuizQuestion;
