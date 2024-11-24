import React from "react";
import { StyleSheet, View } from "react-native";
import { CreateQuizQuestionType } from "../types/quiz";
import { TagSearchResult } from "../types/tag";
import CreateQuizQuestionSuggestionModal from "./CreateQuizQuestionSuggestionModal";
import CreateQuizQuestionText from "./CreateQuizQuestionText";

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
      <CreateQuizQuestionText
        input={questionTextInput}
        onChange={onChangeQuestionText}
        search={searchQuestionText}
      />
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
});

export default CreateQuizQuestionCore;
