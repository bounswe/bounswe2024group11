import { RouteProp } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../App";
import CreateQuizQuestionCore from "../components/CreateQuizQuestionCore";
import CreateQuizQuestionFooter from "../components/CreateQuizQuestionFooter";
import CreateQuizQuestionHeader from "../components/CreateQuizQuestionHeader";
import CreateQuizQuestionHints from "../components/CreateQuizQuestionHints";
import CreateQuizQuestionOptions from "../components/CreateQuizQuestionOptions";
import { CreateQuizQuestionType } from "../types/quiz";
import { Tag, TagSearchResult } from "../types/tag";

type CreateQuizQuestionScreenRouteProp = RouteProp<
  RootStackParamList,
  "CreateQuizQuestion"
>;

interface Props {
  route: CreateQuizQuestionScreenRouteProp;
}

const CreateQuizQuestion: React.FC<Props> = ({ route }) => {
  const { title, description, tags, type } = route.params;

  const [questions, setQuestions] = useState<CreateQuizQuestionType[]>([
    {
      question_text: "",
      choices: [],
      hints: [],
      point: 0,
    },
  ]);
  const [questionsCount, setQuestionsCount] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionTextInput, setQuestionTextInput] = useState("");
  const [suggestedQuestionTexts, setSuggestedQuestionTexts] = useState<
    TagSearchResult[]
  >([]);
  const [questionTags, setQuestionTags] = useState<Tag[]>([
    {
      name: "",
      linked_data_id: "",
      description: "",
    },
  ]);

  // const API_URL = "http://54.247.125.93/api/v1";
  const API_URL = "http://10.0.2.2:8000/api/v1";
  const source_lang = type === 2 ? "TR" : "EN";

  const fetchTagging = async (
    input: string,
    callback: (tags: TagSearchResult[]) => void
  ) => {
    const ENDPOINT = `${API_URL}/tagging/?word=${input}&lang=${source_lang}`;
    try {
      const result = await axios.get(`${ENDPOINT}`);
      const combinedTags: TagSearchResult[] = [];
      if (result.data.NOUN) {
        combinedTags.push(...result.data.NOUN);
      }
      if (result.data.VERB) {
        combinedTags.push(...result.data.VERB);
      }
      if (result.data.ADJ) {
        combinedTags.push(...result.data.ADJ);
      }
      if (result.data.ADV) {
        combinedTags.push(...result.data.ADV);
      }
      callback(combinedTags);
    } catch (error) {
      console.error("Error fetching tag suggestions", error);
    }
  };

  const changeQuestionText = (text: string) => {
    setQuestionTextInput(text);
  };

  const searchQuestionText = () => {
    if (questionTextInput.length <= 2) return;
    fetchTagging(questionTextInput, setSuggestedQuestionTexts);
  };

  const selectQuestionText = (text: TagSearchResult) => {
    if (questionTextInput.length <= 2) return;

    const updatedQuestionTags = [...questionTags];
    updatedQuestionTags[currentQuestionIndex] = {
      name: questionTextInput.replace(/\b\w/g, (char) => char.toUpperCase()),
      linked_data_id: text.id,
      description: text.description,
    };
    setQuestionTags(updatedQuestionTags);

    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].question_text =
      questionTextInput.replace(/\b\w/g, (char) => char.toUpperCase());
    setQuestions(updatedQuestions);

    setQuestionTextInput("");
    setSuggestedQuestionTexts([]);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questionsCount - 1) {
      console.log(questions);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionTextInput("");
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      console.log(questions);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setQuestionTextInput("");
    }
  };

  const addQuestionToRight = () => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(currentQuestionIndex + 1, 0, {
      question_text: "",
      choices: [],
      hints: [],
      point: 0,
    });
    setQuestions(updatedQuestions);

    const updatedQuestionTags = [...questionTags];
    updatedQuestionTags.splice(currentQuestionIndex + 1, 0, {
      name: "",
      linked_data_id: "",
      description: "",
    });
    setQuestionTags(updatedQuestionTags);

    setQuestionsCount(questionsCount + 1);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setQuestionTextInput("");
  };

  const addQuestionToLeft = () => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(currentQuestionIndex, 0, {
      question_text: "",
      choices: [],
      hints: [],
      point: 0,
    });
    setQuestions(updatedQuestions);

    const updatedQuestionTags = [...questionTags];
    updatedQuestionTags.splice(currentQuestionIndex, 0, {
      name: "",
      linked_data_id: "",
      description: "",
    });
    setQuestionTags(updatedQuestionTags);

    setQuestionsCount(questionsCount + 1);
    setQuestionTextInput("");
  };

  const deleteQuestion = () => {
    if (questionsCount <= 1) return;

    const updatedQuestions = [...questions];
    updatedQuestions.splice(currentQuestionIndex, 1);
    setQuestions(updatedQuestions);

    const updatedQuestionTags = [...questionTags];
    updatedQuestionTags.splice(currentQuestionIndex, 1);
    setQuestionTags(updatedQuestionTags);

    if (currentQuestionIndex == questionsCount - 1) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
    setQuestionsCount(questionsCount - 1);
    setQuestionTextInput("");
  };

  return (
    <View style={styles.container}>
      <CreateQuizQuestionHeader
        questions_count={questionsCount}
        current_question_index={currentQuestionIndex}
      />
      <CreateQuizQuestionCore
        question={questions[currentQuestionIndex]}
        questionTextInput={questionTextInput}
        suggestedQuestionTexts={suggestedQuestionTexts}
        onChangeQuestionText={changeQuestionText}
        searchQuestionText={searchQuestionText}
        selectQuestionText={selectQuestionText}
      />
      <CreateQuizQuestionOptions />
      <CreateQuizQuestionHints />
      <CreateQuizQuestionFooter
        goToNextQuestion={goToNextQuestion}
        goToPreviousQuestion={goToPreviousQuestion}
        addQuestionToRight={addQuestionToRight}
        addQuestionToLeft={addQuestionToLeft}
        deleteQuestion={deleteQuestion}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
});

export default CreateQuizQuestion;
