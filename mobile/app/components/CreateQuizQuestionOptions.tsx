import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CreateQuizQuestionChoiceType } from "../types/quiz";

interface Props {
  choices: CreateQuizQuestionChoiceType[];
  onChangeOptionText: (index: number, text: string) => void;
  onMoveOption: (index: number, direction: number) => void;
}

const CreateQuizQuestionOptions: React.FC<Props> = ({
  choices,
  onChangeOptionText,
  onMoveOption,
}) => {
  return (
    <View style={styles.container}>
      {choices.map((choice, index) => (
        <View
          key={index}
          style={[
            styles.option,
            choice.is_correct ? styles.correctOption : styles.wrongOption,
          ]}
        >
          {choice.is_correct ? (
            <Text style={styles.optionText}>{choice.choice_text}</Text>
          ) : (
            <TextInput
              style={styles.optionText}
              value={choice.choice_text}
              placeholder="Enter a wrong option..."
              onChangeText={(text) => onChangeOptionText(index, text)}
            />
          )}
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => onMoveOption(index, -1)}
              disabled={index === 0}
            >
              <Icon name="arrow-up" size={20} color="#0f172a" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => onMoveOption(index, 1)}
              disabled={index === choices.length - 1}
            >
              <Icon name="arrow-down" size={20} color="#0f172a" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 12,
    backgroundColor: "#e2e8f0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0f172a",
  },
  correctOption: {
    backgroundColor: "#22c55e",
  },
  wrongOption: {},
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    gap: 6,
  },
  button: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#0f172a",
    backgroundColor: "#bae6fd",
    elevation: 4,
    marginVertical: 4,
    padding: 8,
  },
});

export default CreateQuizQuestionOptions;
