import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CreateQuizQuestionType } from "../types/quiz";
import { TagSearchResult } from "../types/tag";
import CreateQuizQuestionSuggestionModal from "./CreateQuizQuestionSuggestionModal";

interface Props {
  question: CreateQuizQuestionType;
  questionTextInput: string;
  suggestedQuestionTexts: TagSearchResult[];
  onChangeQuestionText: (text: string) => void;
  searchQuestionText: () => void;
  selectQuestionText: (text: TagSearchResult) => void;
}

const CreateQuizQuestionCore: React.FC<Props> = ({
  question,
  questionTextInput,
  suggestedQuestionTexts,
  onChangeQuestionText,
  searchQuestionText,
  selectQuestionText,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.questionTextContainer}>
        <Text>Question Text:</Text>
        <TextInput
          value={questionTextInput}
          onChangeText={(text) => onChangeQuestionText(text)}
          style={styles.textInput}
        />
        <TouchableOpacity onPress={searchQuestionText}>
          <Text style={styles.searchButton}>Search</Text>
        </TouchableOpacity>
      </View>
      {suggestedQuestionTexts.length > 0 && (
        <CreateQuizQuestionSuggestionModal
          title={questionTextInput}
          data={suggestedQuestionTexts}
          onSelect={selectQuestionText}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  questionTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    gap: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#0f172a",
    borderRadius: 8,
    padding: 4,
    flex: 1,
  },
  searchButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: "#0f172a",
    backgroundColor: "#e2e8f0",
    borderColor: "#0f172a",
  },
});

export default CreateQuizQuestionCore;
