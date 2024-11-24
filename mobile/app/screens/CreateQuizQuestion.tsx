import { RouteProp } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RootStackParamList } from "../../App";
import NewQuizQuestion from "../components/NewQuizQuestion";
import {
  CreateQuizQuestionChoiceType,
  CreateQuizQuestionHintType,
  CreateQuizQuestionType,
  SuggestedHintsType,
} from "../types/quiz";
import { Tag, TagSearchResult } from "../types/tag";

const NewQuizQuestionInitialState: CreateQuizQuestionType = {
  question_text: "",
  choices: [],
  hints: [],
  point: 0,
};

const NewQuizQuestionChoicesInitialState: CreateQuizQuestionChoiceType[] = [
  { choice_text: "", is_correct: true },
  { choice_text: "", is_correct: false },
  { choice_text: "", is_correct: false },
  { choice_text: "", is_correct: false },
];

const NewQuizQuestionHintInitialState: CreateQuizQuestionHintType = {
  type: "custom",
  text: "",
};

type CreateQuizQuestionScreenRouteProp = RouteProp<
  RootStackParamList,
  "CreateQuizQuestion"
>;

interface Props {
  route: CreateQuizQuestionScreenRouteProp;
}

const CreateQuizQuestion: React.FC<Props> = ({ route }) => {
  const { title, description, tags, type } = route.params;
  const [questionsCount, setQuestionsCount] = useState(1);
  const [questions, setQuestions] = useState<CreateQuizQuestionType[]>([
    NewQuizQuestionInitialState,
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionInput, setQuestionInput] = useState("");
  const [currentQuestionText, setCurrentQuestionText] = useState("");
  const [suggestedLinkedKeywords, setSuggestedLinkedKeywords] = useState<
    TagSearchResult[]
  >([]);
  const [currentQuestionLinkedKeyword, setCurrentQuestionLinkedKeyword] =
    useState<Tag | null>(null);
  const [currentQuestionPoint, setCurrentQuestionPoint] = useState(0);
  const [currentQuestionChoices, setCurrentQuestionChoices] = useState<
    CreateQuizQuestionChoiceType[]
  >(NewQuizQuestionChoicesInitialState);
  const [currentQuestionCorrectAnswer, setCurrentQuestionCorrectAnswer] =
    useState<string>("");
  const [
    currentQuestionSuggestedTranslations,
    setCurrentQuestionSuggestedTranslations,
  ] = useState<string[] | null>(null);
  const [currentQuestionHints, setCurrentQuestionHints] = useState<
    CreateQuizQuestionHintType[]
  >([NewQuizQuestionHintInitialState]);
  const [currentQuestionHintType, setCurrentQuestionHintType] =
    useState<string>("custom");
  const [currentQuestionHintText, setCurrentQuestionHintText] = useState("");
  const [suggestedHints, setSuggestedHints] =
    useState<SuggestedHintsType | null>(null);

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex].question_text =
        currentQuestionText;
      updatedQuestions[currentQuestionIndex].choices = currentQuestionChoices;
      updatedQuestions[currentQuestionIndex].point = currentQuestionPoint;
      updatedQuestions[currentQuestionIndex].hints = currentQuestionHints;

      setQuestions(updatedQuestions);

      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionInput("");
      setCurrentQuestionText("");
      setSuggestedLinkedKeywords([]);
      console.log(questions);
      console.log(currentQuestionIndex);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex].question_text =
        currentQuestionText;
      updatedQuestions[currentQuestionIndex].choices = currentQuestionChoices;
      updatedQuestions[currentQuestionIndex].point = currentQuestionPoint;
      updatedQuestions[currentQuestionIndex].hints = currentQuestionHints;

      setQuestions(updatedQuestions);

      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionInput("");
      setCurrentQuestionText("");
      setSuggestedLinkedKeywords([]);
      console.log(questions);
      console.log(currentQuestionIndex);
    }
  };

  const addQuestionToRight = () => {
    setQuestionsCount(questionsCount + 1);

    const newQuestions = [...questions];
    newQuestions.splice(
      currentQuestionIndex + 1,
      0,
      NewQuizQuestionInitialState
    );
    setQuestions(newQuestions);

    goToNextQuestion();
  };

  const addQuestionToLeft = () => {
    setQuestionsCount(questionsCount + 1);

    const newQuestions = [...questions];
    newQuestions.splice(currentQuestionIndex, 0, NewQuizQuestionInitialState);
    setQuestions(newQuestions);

    goToPreviousQuestion();
  };

  const deleteQuestion = () => {
    const newQuestions = [...questions];
    newQuestions.splice(currentQuestionIndex, 1);
    setQuestions(newQuestions);

    if (currentQuestionIndex === questions.length - 1) {
      goToPreviousQuestion();
    }
  };

  return (
    <View style={styles.container}>
      <NewQuizQuestion
        quiz_type={type}
        questionInput={questionInput}
        setQuestionInput={setQuestionInput}
        questionText={currentQuestionText}
        setQuestionText={setCurrentQuestionText}
        suggestedLinkedKeywords={suggestedLinkedKeywords}
        setSuggestedLinkedKeywords={setSuggestedLinkedKeywords}
        questionLinkedKeyword={currentQuestionLinkedKeyword}
        setQuestionLinkedKeyword={setCurrentQuestionLinkedKeyword}
        questionPoint={currentQuestionPoint}
        setQuestionPoint={setCurrentQuestionPoint}
        questionChoices={currentQuestionChoices}
        setQuestionChoices={setCurrentQuestionChoices}
        questionCorrectAnswer={currentQuestionCorrectAnswer}
        setQuestionCorrectAnswer={setCurrentQuestionCorrectAnswer}
        questionSuggestedTranslations={currentQuestionSuggestedTranslations}
        setQuestionSuggestedTranslations={
          setCurrentQuestionSuggestedTranslations
        }
        questionHints={currentQuestionHints}
        setQuestionHints={setCurrentQuestionHints}
        questionHintType={currentQuestionHintType}
        setQuestionHintType={setCurrentQuestionHintType}
        questionHintText={currentQuestionHintText}
        setQuestionHintText={setCurrentQuestionHintText}
        suggestedHints={suggestedHints}
        setSuggestedHints={setSuggestedHints}
      />

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={[styles.navigationButton, styles.goToPreviousButton]}
          onPress={goToPreviousQuestion}
        >
          <Icon name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navigationButton, styles.addButton]}
          onPress={addQuestionToLeft}
        >
          <Icon name="plus" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navigationButton, styles.deleteButton]}
          onPress={deleteQuestion}
        >
          <Icon name="trash-can-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navigationButton, styles.addButton]}
          onPress={addQuestionToRight}
        >
          <Icon name="plus" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navigationButton, styles.goToNextButton]}
          onPress={goToNextQuestion}
        >
          <Icon name="arrow-right" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "flex-start",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 32,
    width: "100%",
    marginHorizontal: 24,
  },
  navigationButton: {
    // padding: 8,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    // width: 48,
    // height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  deleteButton: {
    backgroundColor: "#FFE5E5",
  },
  addButton: {
    backgroundColor: "#E5FFE5",
  },
  goToNextButton: {
    backgroundColor: "#E5E5FF",
  },
  goToPreviousButton: {
    backgroundColor: "#E5E5FF",
  },
});

export default CreateQuizQuestion;
