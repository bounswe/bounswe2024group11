import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  CreateQuizQuestionChoiceType,
  CreateQuizQuestionHintType,
  SuggestedHintsType,
} from "../types/quiz";
import { Tag, TagSearchResult } from "../types/tag";

interface NewQuizQuestionProps {
  quiz_type: number;
  questionInput: string;
  setQuestionInput: (input: string) => void;
  questionText: string;
  setQuestionText: (text: string) => void;
  suggestedLinkedKeywords: TagSearchResult[];
  setSuggestedLinkedKeywords: (keywords: TagSearchResult[]) => void;
  questionLinkedKeyword: Tag | null;
  setQuestionLinkedKeyword: (keyword: Tag | null) => void;
  questionPoint: number;
  setQuestionPoint: (point: number) => void;
  questionChoices: CreateQuizQuestionChoiceType[];
  setQuestionChoices: (choices: CreateQuizQuestionChoiceType[]) => void;
  questionCorrectAnswer: string;
  setQuestionCorrectAnswer: (answer: string) => void;
  questionSuggestedTranslations: string[] | null;
  setQuestionSuggestedTranslations: (translations: string[] | null) => void;
  questionHints: CreateQuizQuestionHintType[];
  setQuestionHints: (hints: CreateQuizQuestionHintType[]) => void;
  questionHintType: string;
  setQuestionHintType: (type: string) => void;
  questionHintText: string;
  setQuestionHintText: (text: string) => void;
  suggestedHints: SuggestedHintsType | null;
  setSuggestedHints: (hints: SuggestedHintsType | null) => void;
}

// const API_URL = "http://54.247.125.93/api/v1"
const API_URL = "http://10.0.2.2:8000/api/v1";

const NewQuizQuestion: React.FC<NewQuizQuestionProps> = ({
  quiz_type,
  questionInput,
  setQuestionInput,
  questionText,
  setQuestionText,
  suggestedLinkedKeywords,
  setSuggestedLinkedKeywords,
  questionLinkedKeyword,
  setQuestionLinkedKeyword,
  questionPoint,
  setQuestionPoint,
  questionChoices,
  setQuestionChoices,
  questionCorrectAnswer,
  setQuestionCorrectAnswer,
  questionSuggestedTranslations,
  setQuestionSuggestedTranslations,
  questionHints,
  setQuestionHints,
  questionHintType,
  setQuestionHintType,
  questionHintText,
  setQuestionHintText,
  suggestedHints,
  setSuggestedHints,
}) => {
  const source_lang = quiz_type == 2 ? "TR" : "EN";

  const fetchTagSuggestions = async (input: string) => {
    if (input.length < 2) {
      return;
    }

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
      setSuggestedLinkedKeywords(combinedTags);
    } catch (error) {
      console.error("Error fetching tag suggestions", error);
    }
  };

  const handleTextSelect = (tag: TagSearchResult) => {
    const convertedTag: Tag = {
      name: questionInput,
      linked_data_id: tag.id,
      description: tag.description,
    };

    setQuestionText(questionInput);
    setQuestionLinkedKeyword(convertedTag);
    setSuggestedLinkedKeywords([]);
  };

  useEffect(() => {
    const getTranslations = async (word: string) => {
      if (word.length < 2) {
        return;
      }

      const ENDPOINT = `${API_URL}/get-translation/?type=type${quiz_type}&id=${questionLinkedKeyword?.linked_data_id.substring(3)}`;

      try {
        const result = await axios.get(`${ENDPOINT}`);
        setQuestionSuggestedTranslations(result.data.translations);
        setQuestionCorrectAnswer(result.data.translations[0]);
      } catch (error) {
        console.error("Error fetching translation suggestions", error);
      }
    };

    getTranslations(questionText);
  }, [questionText]);

  const handleTranslationSelect = (translation: string) => {
    setQuestionCorrectAnswer(translation);

    const updatedQuestionChoices = [...questionChoices];
    updatedQuestionChoices.find((choice) => choice.is_correct)!.choice_text =
      translation;
    setQuestionChoices(updatedQuestionChoices);
  };

  useEffect(() => {
    if (questionText.length === 0) {
      const updatedQuestionChoices = [...questionChoices];
      updatedQuestionChoices.find((choice) => choice.is_correct)!.choice_text =
        "";
      setQuestionChoices(updatedQuestionChoices);
    }
  }, [questionText]);

  const moveOption = (index: number, direction: number) => {
    const newOptions = [...questionChoices];
    const targetIndex = index + direction;

    // Check bounds
    if (targetIndex < 0 || targetIndex >= questionChoices.length) return;

    // Swap items
    [newOptions[index], newOptions[targetIndex]] = [
      newOptions[targetIndex],
      newOptions[index],
    ];

    setQuestionChoices(newOptions);
  };

  const handleWrongAnswerChange = (index: number, text: string) => {
    const newOptions = [...questionChoices];
    newOptions[index].choice_text = text;
    setQuestionChoices(newOptions);
  };

  useEffect(() => {
    const getDifficulty = async (keyword: string) => {
      if (keyword.length <= 0) return;
      const ENDPOINT = `${API_URL}/get-difficulty/?keyword=${keyword}`;

      try {
        const result = await axios.get(`${ENDPOINT}`);
        setQuestionPoint(result.data.question_point);
      } catch (error) {
        console.error("Error fetching difficulty", error);
      }
    };

    getDifficulty(quiz_type == 2 ? questionCorrectAnswer : questionText);
  }, [quiz_type == 2 ? questionCorrectAnswer : questionText]);

  //   useEffect(() => {
  //     const fetchSuggestedHints = async () => {
  //       if (questionText.length <= 0) return;
  //       const ENDPOINT = `${API_URL}/hint/?synset_id=${questionLinkedKeyword?.linked_data_id.substring(3)}&target_lang=${source_lang}&word=${questionText}`;

  //       try {
  //         const result = await axios.get(`${ENDPOINT}`);
  //         setSuggestedHints(result.data);
  //         setQuestionHintType(
  //           Object.entries(result.data).filter(
  //             ([_, value]) => value.length > 0
  //           )[0][0]
  //         );
  //       } catch (error) {
  //         console.error("Error fetching suggested hints", error);
  //       }
  //     };

  //     fetchSuggestedHints();
  //   }, [questionText]);

  return (
    <View style={styles.container}>
      <Text>New Quiz Question:</Text>
      <Text>
        Quiz Type:{" "}
        {quiz_type == 1
          ? "Given an English word, choose Turkish word"
          : quiz_type == 2
            ? "Given a Turkish word, choose English word"
            : quiz_type == 3
              ? "Given an English word, choose sense"
              : "This type of quiz is not handled :("}
      </Text>
      <View>
        <View style={[styles.promptContainer, styles.questionWordContainer]}>
          <Text style={[styles.promptText, styles.questionWordText]}>
            Question Word:
          </Text>
          <TextInput
            style={[styles.input, styles.questionWordInput]}
            placeholder="Enter Question Word"
            value={questionInput}
            onChangeText={setQuestionInput}
          />
          <TouchableOpacity
            style={[styles.button, styles.searchButton]}
            onPress={() => fetchTagSuggestions(questionInput)}
          >
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
        {questionInput.length > 0 && suggestedLinkedKeywords.length > 0 && (
          <FlatList
            data={suggestedLinkedKeywords}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleTextSelect(item)}
                style={styles.suggestionItem}
              >
                <View>
                  <Text style={styles.suggestionText}>
                    {questionInput.replace(/\b\w/g, (char) =>
                      char.toUpperCase()
                    )}
                  </Text>
                  <Text style={styles.suggestionDescription}>
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            style={styles.suggestionList}
          />
        )}
      </View>

      {questionSuggestedTranslations && (
        <View style={[styles.promptContainer, styles.translationContainer]}>
          <Text style={styles.promptText}>
            Choose Translation for {questionLinkedKeyword?.name}:
          </Text>
          <Picker
            selectedValue={questionCorrectAnswer}
            onValueChange={(itemValue, itemIndex) =>
              handleTranslationSelect(itemValue)
            }
          >
            {questionSuggestedTranslations.map((translation) => (
              <Picker.Item
                label={translation}
                value={translation}
                key={translation}
              />
            ))}
          </Picker>
        </View>
      )}
      {questionCorrectAnswer && (
        <View style={[styles.promptContainer, styles.difficultyContainer]}>
          <Text style={[styles.promptText, styles.difficultyPromptText]}>
            Difficulty Score for this question:
          </Text>
          <Text style={styles.promptText}>{questionPoint}</Text>
        </View>
      )}
      {questionCorrectAnswer.length > 0 && (
        <View>
          {questionChoices.map((option, index) => (
            <View
              key={index}
              style={[styles.option, option.is_correct && styles.correctOption]}
            >
              {option.is_correct ? (
                <Text style={styles.optionText}>{option.choice_text}</Text>
              ) : (
                <TextInput
                  style={[styles.input, styles.wrongAnswerInput]}
                  placeholder="Enter a Wrong Option"
                  value={option.choice_text}
                  onChangeText={(text) => handleWrongAnswerChange(index, text)}
                />
              )}
              <View style={styles.buttons}>
                <TouchableOpacity
                  onPress={() => moveOption(index, -1)}
                  disabled={index === 0}
                  style={[styles.button, styles.buttonIcon]}
                >
                  <Icon name="arrow-up" size={18} color="#1e293b" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => moveOption(index, 1)}
                  disabled={index === questionChoices.length - 1}
                  style={[styles.button, styles.buttonIcon]}
                >
                  <Icon name="arrow-down" size={18} color="#1e293b" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* {questionCorrectAnswer.length > 0 && suggestedHints && (
        <View style={[styles.promptContainer, styles.difficultyContainer]}>
          <Text style={[styles.promptText]}>
            Do you mind adding a hint for this question?
          </Text>
          <Picker
            selectedValue={questionHintType}
            onValueChange={(itemValue, itemIndex) =>
              setQuestionHintType(itemValue)
            }
          >
            {Object.entries(suggestedHints)
              .filter(([_, value]) => value.length > 0)
              .flatMap(([key, _]) => key)
              .map((hint_type) => (
                <Picker.Item
                  label={hint_type}
                  value={hint_type}
                  key={hint_type}
                />
              ))}
          </Picker>
          <Picker
            selectedValue={questionHintText}
            onValueChange={(itemValue, itemIndex) =>
              setQuestionHintText(itemValue)
            }
          >
            {Object.entries(suggestedHints)
              .filter(([key, value]) => key === questionHintType)
              .flatMap(([_, value]) => value)
              .map((hint_text) => (
                <Picker.Item
                  label={hint_text}
                  value={hint_text}
                  key={hint_text}
                />
              ))}
          </Picker>
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#FFFFFF",
    // padding: 24,
  },
  promptContainer: {
    paddingVertical: 16,
    // marginVertical: 8,
  },
  promptText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  input: {
    borderWidth: 1,
    // borderColor: "#0ea5e9",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  wrongAnswerInput: {
    flex: 1,
    marginRight: 8,
  },
  button: {
    width: "auto",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#0f172a",
  },
  buttonIcon: {
    backgroundColor: "#e2e8f0",
    borderColor: "#1e293b",
    paddingVertical: 8,
  },
  questionWordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  questionWordText: {},
  questionWordInput: {
    flex: 1,
    marginRight: 8,
  },
  searchButton: {},
  suggestionList: {
    maxHeight: 300,
    borderWidth: 1,
    borderColor: "#64748b",
    borderRadius: 8,
    marginVertical: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#cbd5e1",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  suggestionText: {
    fontWeight: "bold",
  },
  suggestionDescription: {},
  rowItem: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  translationContainer: {},
  choiceContainer: {
    borderWidth: 1,
    borderColor: "#84cc16",
    backgroundColor: "#84cc16",
    borderRadius: 8,
    padding: 10,
  },
  difficultyPromptText: {
    fontWeight: "normal",
  },
  difficultyContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  correctOption: {
    backgroundColor: "#22c55e",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#0f172a",
  },
  buttons: {
    flexDirection: "row",
    gap: 5,
  },
});

export default NewQuizQuestion;
