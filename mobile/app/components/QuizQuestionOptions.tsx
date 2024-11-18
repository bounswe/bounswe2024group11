import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { QuizQuestionOptionsType } from "../types/quiz";
import QuizQuestionOption from "./QuizQuestionOption";

interface QuizQuestionOptionsProps {
  options: QuizQuestionOptionsType;
  selectedOption: string | null;
  onSelectOption: (option: string) => void;
}

const QuizQuestionOptions: React.FC<QuizQuestionOptionsProps> = ({
  options,
  selectedOption,
  onSelectOption,
}) => {
  return (
    <View style={styles.container}>
      {Object.entries(options).map(([key, value]) => (
        <TouchableOpacity key={key} onPress={() => onSelectOption(key)}>
          <QuizQuestionOption
            key={key}
            option={value}
            isSelected={selectedOption === key}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    marginVertical: 48,
  },
});

export default QuizQuestionOptions;
