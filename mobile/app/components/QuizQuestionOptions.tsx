import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { QuizQuestionOptionType } from "../types/quiz";
import QuizQuestionOption from "./QuizQuestionOption";

interface QuizQuestionOptionsProps {
  options: QuizQuestionOptionType[];
  selectedOption: number | null;
  is_review: boolean;
  checkedOptions: number[];
  onSelectOption: (option: number) => void;
}

const QuizQuestionOptions: React.FC<QuizQuestionOptionsProps> = ({
  options,
  selectedOption,
  is_review,
  checkedOptions,
  onSelectOption,
}) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          onPress={() => onSelectOption(option.id)}
        >
          <QuizQuestionOption
            option={option.choice_text}
            isSelected={selectedOption === option.id}
            is_review={is_review}
            status={
              checkedOptions[1]
                ? checkedOptions[0]
                  ? option.id === checkedOptions[0]
                    ? option.id === checkedOptions[1]
                      ? "correct"
                      : "wrong"
                    : option.id === checkedOptions[1]
                      ? "correct"
                      : "regular"
                  : option.id === checkedOptions[1]
                    ? "empty"
                    : "regular"
                : "regular"
            }
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
