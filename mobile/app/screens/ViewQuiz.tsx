import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../App";
import API_URL_GLOBAL from "../../config";
import QuizQuestion from "../components/QuizQuestion";
import { QuizAnswerType, QuizQuestionType } from "../types/quiz";
type ViewQuizScreenRouteProp = RouteProp<RootStackParamList, "ViewQuiz">;

type Props = {
  route: ViewQuizScreenRouteProp;
};

type QuizResultNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const API_URL = `${API_URL_GLOBAL}`;
// const API_URL = "http://10.0.2.2:8000/api/v1";

const ViewQuiz: React.FC<Props> = ({ route }) => {
  const { id, type, title, description, is_review } = route.params;
  const [questions, setQuestions] = useState<QuizQuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>();
  const [checkedOptions, setCheckedOptions] = useState<number[]>([null, null]);
  const [isHintUsed, setIsHintUsed] = useState(false);
  const [hintUsages, setHintUsages] = useState<boolean[]>([]);

  const navigation = useNavigation<QuizResultNavigationProp>();

  //   const isFocused = useIsFocused();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const result = await axios.get(`${API_URL}quizzes/${id}`);
        setQuestions(result.data.questions);
        setSelectedOptions(new Array(questions.length).fill(null));
        setHintUsages(new Array(questions.length).fill(false));
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

  const selectOption = (option: number) => {
    if (checkedOptions[1]) return;
    if (!selectedOptions) return;
    const updatedOptions = [...selectedOptions];
    const prevOption = updatedOptions[currentQuestionIndex];
    if (prevOption === option) {
      updatedOptions[currentQuestionIndex] = null;
    } else {
      updatedOptions[currentQuestionIndex] = option;
    }
    setSelectedOptions(updatedOptions);
  };

  const checkQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = selectedOptions?.[currentQuestionIndex];
    const correctOption = currentQuestion.choices.find(
      (option) => option.is_correct
    )?.id;
    setCheckedOptions([selectedOption, correctOption]);
    const updatedHintUsages = [...hintUsages];
    updatedHintUsages[currentQuestionIndex] = isHintUsed;
    setHintUsages(updatedHintUsages);
  };

  const continueQuiz = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCheckedOptions([null, null]);
      setIsHintUsed(false);
    }
  };

  const submitQuiz = async () => {
    const answers: QuizAnswerType[] = questions.map((question, index) => ({
      question: question.id,
      answer: selectedOptions?.[index] ?? null,
      is_hint_used: hintUsages[index],
    }));

    const result = await axios.post(`${API_URL}take-quiz/`, {
      quiz: id,
      answers,
    });
    console.log(result.data);
    navigation.navigate("QuizResult");
  };

  return (
    <View style={styles.container}>
      {questions.length > 0 && (
        <QuizQuestion
          title={title}
          description={description}
          is_review={is_review}
          quiz_type={type}
          question={questions[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          questions_length={questions.length}
          selectedOption={selectedOptions?.[currentQuestionIndex] || null}
          checkedOptions={checkedOptions}
          setIsHintUsed={setIsHintUsed}
          goToPreviousQuestion={goToPreviousQuestion}
          goToNextQuestion={goToNextQuestion}
          onSelectOption={selectOption}
          onSubmit={submitQuiz}
          onCheckQuestion={checkQuestion}
          onContinue={continueQuiz}
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
