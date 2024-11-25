import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  input: string;
  onChange: (text: string) => void;
  search: () => void;
}

const CreateQuizQuestionText: React.FC<Props> = ({
  input,
  onChange,
  search,
}) => {
  return (
    <View style={styles.questionTextContainer}>
      <Text>Question Text:</Text>
      <TextInput
        value={input}
        onChangeText={(text) => onChange(text)}
        style={styles.textInput}
      />
      <TouchableOpacity onPress={search}>
        <Text style={styles.searchButton}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: "#bae6fd",
    borderColor: "#0f172a",
  },
});

export default CreateQuizQuestionText;
