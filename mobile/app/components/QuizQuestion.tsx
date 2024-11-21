import React from "react";
import { StyleSheet, View } from "react-native";
import { QuizQuestionType } from "../types/quiz";
import QuizQuestionBody from "./QuizQuestionBody";
import QuizQuestionButtons from "./QuizQuestionButtons";

interface QuizQuestionProps {
  title: string;
  description: string;
  is_review: boolean;
  quiz_type: number;
  question: QuizQuestionType;
  currentQuestionIndex: number;
  questions_length: number;
  selectedOption: number | null;
  onSelectOption: (option: number) => void;
  goToPreviousQuestion: () => void;
  goToNextQuestion: () => void;
  onSubmit: () => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  title,
  description,
  is_review,
  quiz_type,
  selectedOption,
  onSelectOption,
  currentQuestionIndex,
  questions_length,
  goToPreviousQuestion,
  goToNextQuestion,
  onSubmit,
}) => {
  return (
    <View style={styles.container}>
      {/* <QuizQuestionHeader title={title} description={description} /> */}
      <QuizQuestionBody
        question={question}
        quiz_type={quiz_type}
        is_review={is_review}
        selectedOption={selectedOption}
        onSelectOption={onSelectOption}
      />
      <QuizQuestionButtons
        currentQuestionIndex={currentQuestionIndex}
        questions_length={questions_length}
        is_review={is_review}
        goToPreviousQuestion={goToPreviousQuestion}
        goToNextQuestion={goToNextQuestion}
        onSubmit={onSubmit}
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
