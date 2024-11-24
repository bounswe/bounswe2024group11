import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { CreateQuizQuestionType } from "../types/quiz";

interface Props {
  quiz_type: number;
  question: CreateQuizQuestionType;
  translations: string[];
  onSelect: (translation: string) => void;
}

const TranslationPicker: React.FC<Props> = ({
  quiz_type,
  question,
  translations,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      <Text>
        Correct{" "}
        {quiz_type === 1 || quiz_type === 2 ? "Translation: " : "Sense: "}
      </Text>
      <Picker
        selectedValue={
          question.choices.find((choice) => choice.is_correct)?.choice_text
        }
        onValueChange={(itemValue, itemIndex) => onSelect(itemValue)}
        style={styles.picker}
      >
        {translations.map((translation) => (
          <Picker.Item
            key={translation}
            label={translation.replace(/\b\w/g, (char) => char.toUpperCase())}
            value={translation.replace(/\b\w/g, (char) => char.toUpperCase())}
            style={styles.pickerItem}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  picker: {
    flex: 1,
  },
  pickerItem: {},
});

export default TranslationPicker;
