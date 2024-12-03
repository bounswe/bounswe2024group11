import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../App";
import CreateQuizQuestionCore from "../components/CreateQuizQuestionCore";
import CreateQuizQuestionFooter from "../components/CreateQuizQuestionFooter";
import CreateQuizQuestionHeader from "../components/CreateQuizQuestionHeader";
import CreateQuizQuestionHints from "../components/CreateQuizQuestionHints";
import CreateQuizQuestionOptions from "../components/CreateQuizQuestionOptions";
import { CreateQuizQuestionType, SuggestedHintsType } from "../types/quiz";
import { Tag, TagSearchResult } from "../types/tag";
import { combineHints } from "../utils/quiz";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type CreateQuizQuestionScreenRouteProp = RouteProp<
  RootStackParamList,
  "CreateQuizQuestion"
>;

interface Props {
  route: CreateQuizQuestionScreenRouteProp;
}

const CreateQuizQuestion: React.FC<Props> = ({ route }) => {
  const { title, description, tags, quiz_type } = route.params;

  const [questions, setQuestions] = useState<CreateQuizQuestionType[]>([
    {
      question_text: "",
      choices: [
        { choice_text: "", is_correct: true },
        { choice_text: "", is_correct: false },
        { choice_text: "", is_correct: false },
        { choice_text: "", is_correct: false },
      ],
      hints: [{ type: "", text: "" }],
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
  const [allTranslations, setAllTranslations] = useState<string[][]>([[]]);
  const [allHints, setAllHints] = useState<SuggestedHintsType[]>([]);

  const API_URL = "http://138.68.97.90/api/v1";
  // const API_URL = "http://10.0.2.2:8000/api/v1";
  const source_lang = quiz_type === 2 ? "TR" : "EN";
  const navigation = useNavigation<NavigationProp>();

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

  const fetchTranslations = async (linked_data_id: string) => {
    const ENDPOINT = `${API_URL}/get-translation/?type=type${quiz_type}&id=${linked_data_id.substring(3)}`;
    try {
      const result = await axios.get(`${ENDPOINT}`);
      const updatedAllTranslations = [...allTranslations];
      updatedAllTranslations[currentQuestionIndex] = result.data.translations;
      setAllTranslations(updatedAllTranslations);
    } catch (error) {
      console.error("Error fetching translations", error);
    }
  };

  const selectQuestionText = (text: TagSearchResult) => {
    if (questionTextInput.length <= 2) return;

    const updatedQuestionTags = [...questionTags];
    updatedQuestionTags[currentQuestionIndex] = {
      name: questionTextInput,
      linked_data_id: text.id,
      description: text.description,
    };
    setQuestionTags(updatedQuestionTags);

    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].question_text = questionTextInput;
    setQuestions(updatedQuestions);

    fetchTranslations(text.id);

    setQuestionTextInput("");
    setSuggestedQuestionTexts([]);
  };

  const fetchDifficulty = async (keyword: string) => {
    const ENDPOINT = `${API_URL}/get-difficulty/?keyword=${keyword}`;
    try {
      const result = await axios.get(`${ENDPOINT}`);
      const point = result.data.question_point;

      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex].point = point;
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error("Error fetching difficulty", error);
    }
  };

  const fetchHints = async () => {
    const linked_data_id = questionTags[currentQuestionIndex].linked_data_id;
    const word = questionTags[currentQuestionIndex].name;
    const ENDPOINT = `${API_URL}/hint/?synset_id=${linked_data_id.substring(3)}&target_lang=${source_lang}&word=${word}`;

    try {
      const result = await axios.get(`${ENDPOINT}`);

      const updatedAllHints = [...allHints];
      updatedAllHints[currentQuestionIndex] = {
        synonyms: result.data.synonyms,
        definitions: result.data.definitions,
        examples: result.data.examples,
        images: result.data.images,
      };
      setAllHints(updatedAllHints);
    } catch (error) {
      console.error("Error fetching hints", error);
    }
  };

  const selectTranslation = (translation: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].choices.find(
      (choice) => choice.is_correct
    )!.choice_text = translation;
    setQuestions(updatedQuestions);

    const keyword =
      quiz_type === 2
        ? translation
        : questions[currentQuestionIndex].question_text;
    fetchDifficulty(keyword);
    fetchHints();
  };

  const changeOptionText = (index: number, text: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].choices[index].choice_text = text;
    setQuestions(updatedQuestions);
  };

  const moveOption = (index: number, direction: number) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= 4) return;

    const updatedQuestions = [...questions];
    [
      updatedQuestions[currentQuestionIndex].choices[index],
      updatedQuestions[currentQuestionIndex].choices[targetIndex],
    ] = [
      updatedQuestions[currentQuestionIndex].choices[targetIndex],
      updatedQuestions[currentQuestionIndex].choices[index],
    ];
    setQuestions(updatedQuestions);
  };

  const selectHintType = (type: string) => {
    const old_type = questions[currentQuestionIndex].hints[0].type;
    if (old_type === type) return;
    if (type === "no") type = "";

    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].hints[0].type = type;
    updatedQuestions[currentQuestionIndex].hints[0].text = "";
    setQuestions(updatedQuestions);
  };

  const selectHintText = (text: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].hints[0].text = text;
    setQuestions(updatedQuestions);
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
      choices: [
        { choice_text: "", is_correct: true },
        { choice_text: "", is_correct: false },
        { choice_text: "", is_correct: false },
        { choice_text: "", is_correct: false },
      ],
      hints: [{ type: "", text: "" }],
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

    const updatedAllTranslations = [...allTranslations];
    updatedAllTranslations.splice(currentQuestionIndex + 1, 0, []);
    setAllTranslations(updatedAllTranslations);

    setQuestionsCount(questionsCount + 1);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setQuestionTextInput("");
  };

  const addQuestionToLeft = () => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(currentQuestionIndex, 0, {
      question_text: "",
      choices: [
        { choice_text: "", is_correct: true },
        { choice_text: "", is_correct: false },
        { choice_text: "", is_correct: false },
        { choice_text: "", is_correct: false },
      ],
      hints: [{ type: "", text: "" }],
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

    const updatedAllTranslations = [...allTranslations];
    updatedAllTranslations.splice(currentQuestionIndex, 0, []);
    setAllTranslations(updatedAllTranslations);

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

    const updatedAllTranslations = [...allTranslations];
    updatedAllTranslations.splice(currentQuestionIndex, 1);
    setAllTranslations(updatedAllTranslations);

    if (currentQuestionIndex == questionsCount - 1) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
    setQuestionsCount(questionsCount - 1);
    setQuestionTextInput("");
  };

  const reviewQuiz = () => {
    if (questions.find((question) => question.question_text === "")) return;
    if (
      questions.find((question) =>
        question.choices.find((choice) => choice.choice_text === "")
      )
    )
      return;
    if (questions.find((question) => question.point === 0)) return;

    navigation.navigate("ReviewCreateQuiz", {
      title,
      description,
      tags,
      quiz_type,
      questions,
      questionsCount,
    });
  };

  return (
    <View style={styles.container}>
      <CreateQuizQuestionHeader
        questions_count={questionsCount}
        current_question_index={currentQuestionIndex}
      />
      <CreateQuizQuestionCore
        quiz_type={quiz_type}
        question={questions[currentQuestionIndex]}
        questionTextInput={questionTextInput}
        suggestedQuestionTexts={suggestedQuestionTexts}
        translations={allTranslations[currentQuestionIndex]}
        onChangeQuestionText={changeQuestionText}
        searchQuestionText={searchQuestionText}
        selectQuestionText={selectQuestionText}
        selectTranslation={selectTranslation}
      />
      {questions[currentQuestionIndex].point > 0 && (
        <>
          <View style={styles.separator} />
          <CreateQuizQuestionOptions
            choices={questions[currentQuestionIndex].choices}
            onChangeOptionText={changeOptionText}
            onMoveOption={moveOption}
          />
        </>
      )}
      {questions[currentQuestionIndex].point > 0 &&
        combineHints(allHints[currentQuestionIndex]).length > 0 && (
          <CreateQuizQuestionHints
            selected_hint={questions[currentQuestionIndex].hints[0]}
            hints={allHints[currentQuestionIndex]}
            onSelectHintType={selectHintType}
            onSelectHintText={selectHintText}
          />
        )}
      <CreateQuizQuestionFooter
        goToNextQuestion={goToNextQuestion}
        goToPreviousQuestion={goToPreviousQuestion}
        addQuestionToRight={addQuestionToRight}
        addQuestionToLeft={addQuestionToLeft}
        deleteQuestion={deleteQuestion}
        reviewQuiz={reviewQuiz}
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
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 12,
  },
});

export default CreateQuizQuestion;
