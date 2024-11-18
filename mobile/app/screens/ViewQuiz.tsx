import { RouteProp } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../App";
import QuizQuestion from "../components/QuizQuestion";
import { QuizQuestionType } from "../types/quiz";

type ViewQuizScreenRouteProp = RouteProp<RootStackParamList, "ViewQuiz">;

type Props = {
  route: ViewQuizScreenRouteProp;
};

const API_URL = "http://10.0.2.2:3000/quiz-questions";

const ViewQuiz: React.FC<Props> = ({ route }) => {
  const { id, type, title, description } = route.params;
  const [questions, setQuestions] = useState<QuizQuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>();

  //   const isFocused = useIsFocused();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const result = await axios.get(`${API_URL}/${id}`);
        setQuestions(result.data.questions);
        setSelectedOptions(new Array(questions.length).fill(null));
      } catch (error) {
        console.error("Error fetching questions", error);
      }
    };

    fetchQuestions();
  }, []);

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const selectOption = (option: string) => {
    if (!selectedOptions) return;
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestionIndex] = option;
    setSelectedOptions(updatedOptions);
  };

  return (
    <View style={styles.container}>
      {questions.length > 0 && (
        <QuizQuestion
          title={title}
          description={description}
          quiz_type={type}
          question={questions[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          questions_length={questions.length}
          selectedOption={selectedOptions?.[currentQuestionIndex] || null}
          goToPreviousQuestion={goToPreviousQuestion}
          goToNextQuestion={goToNextQuestion}
          onSelectOption={selectOption}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    padding: 24,
  },
});

export default ViewQuiz;
