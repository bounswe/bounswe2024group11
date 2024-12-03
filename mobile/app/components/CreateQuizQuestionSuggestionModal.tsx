import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TagSearchResult } from "../types/tag";

interface Props {
  title: string;
  data: TagSearchResult[];
  onSelect: (text: TagSearchResult) => void;
}

const CreateQuizQuestionSuggestionModal: React.FC<Props> = ({
  title,
  data,
  onSelect,
}) => {
  return (
    <View>
      <FlatList
        style={styles.suggestionList}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => onSelect(item)}
          >
            <Text style={styles.suggestionItemTitle}>{title}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default CreateQuizQuestionSuggestionModal;
