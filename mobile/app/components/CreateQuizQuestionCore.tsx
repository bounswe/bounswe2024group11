import React from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CreateQuizQuestionType } from "../types/quiz";
import { TagSearchResult } from "../types/tag";

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
        <View>
          <FlatList
            style={styles.suggestionList}
            data={suggestedQuestionTexts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => selectQuestionText(item)}
              >
                <Text style={styles.suggestionItemTitle}>
                  {questionTextInput.replace(/\b\w/g, (char) =>
                    char.toUpperCase()
                  )}
                </Text>
                <Text>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
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
  suggestionList: {
    maxHeight: 300,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#0f172a",
    backgroundColor: "#f1f5f9",
    marginVertical: 10,
  },
  suggestionItemTitle: {
    // fontSize: 16,
    fontWeight: "bold",
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderRadius: 8,
    borderBottomColor: "#0f172a",
  },
});

export default CreateQuizQuestionCore;
