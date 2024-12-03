import React from "react";
import { StyleSheet, View } from "react-native";
import { CreateQuizQuestionType } from "../types/quiz";
import { TagSearchResult } from "../types/tag";
import CreateQuizQuestionSuggestionModal from "./CreateQuizQuestionSuggestionModal";
import CreateQuizQuestionText from "./CreateQuizQuestionText";
import DifficultyView from "./DifficultyView";
import TranslationPicker from "./TranslationPicker";

interface Props {
  quiz_type: number;
  question: CreateQuizQuestionType;
  questionTextInput: string;
  suggestedQuestionTexts: TagSearchResult[];
  translations: string[];
  onChangeQuestionText: (text: string) => void;
  searchQuestionText: () => void;
  selectQuestionText: (text: TagSearchResult) => void;
  selectTranslation: (translation: string) => void;
}

const CreateQuizQuestionCore: React.FC<Props> = ({
  quiz_type,
  question,
  questionTextInput,
  suggestedQuestionTexts,
  translations,
  onChangeQuestionText,
  searchQuestionText,
  selectQuestionText,
  selectTranslation,
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
      {translations.length > 0 && (
        <TranslationPicker
          quiz_type={quiz_type}
          question={question}
          translations={translations}
          onSelect={selectTranslation}
        />
      )}
      {question.point > 0 && <DifficultyView point={question.point} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CreateQuizQuestionCore;
