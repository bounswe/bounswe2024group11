import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Tag, TagSearchResult } from "../types/tag";

// const API_URL = "http://138.68.97.90/api/v1/forum-questions/";
const API_URL = "http://10.0.2.2:8000/api/v1/forum-questions/";

const CreateQuestion: React.FC = () => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [suggestedTags, setSuggestedTags] = useState<TagSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  // Debounce function to delay API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (tagInput.length >= 2) {
        fetchTagSuggestions(tagInput);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [tagInput]);

  const fetchTagSuggestions = async (input: string) => {
    // const API_URL = `http://138.68.97.90/api/v1/tagging/?word=${input}&lang=EN`;
    const API_URL = `http://10.0.2.2:8000/api/v1/tagging/?word=${input}&lang=EN`;
    try {
      const result = await axios.get(`${API_URL}`);
      const combinedTags: TagSearchResult[] = [];
      if (result.data.NOUN) {
        combinedTags.push(...result.data.NOUN);
      }
      if (result.data.VERB) {
        combinedTags.push(...result.data.VERB);
      }
      if (result.data.ADJ) {
        combinedTags.push(...result.data.ADJ);
      }
      if (result.data.ADV) {
        combinedTags.push(...result.data.ADV);
      }
      setSuggestedTags(combinedTags);
    } catch (error) {
      console.error("Error fetching tag suggestions", error);
    }
  };

  // Handle tag selection
  const handleTagSelect = (tag: TagSearchResult) => {
    const convertedTag: Tag = {
      name: tagInput,
      linked_data_id: tag.id,
      description: tag.description,
    };

    if (!tags.includes(convertedTag)) {
      setTags([...tags, convertedTag]);
    }
    setTagInput("");
    setSuggestedTags([]);
  };

  // Handle tag removal
  const handleTagRemove = (tag: Tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async () => {
    if (!title || !question) {
      Alert.alert("Error", "Please fill in both the title and question.");
      return;
    }

    setLoading(true);

    // Mock new question data
    const newQuestion = {
      title,
      question,
      tags,
    };

    try {
      await axios.post(`${API_URL}`, newQuestion);

      Alert.alert("Success", "Your question has been submitted!");
      setTitle("");
      setQuestion("");
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      console.error("Error submitting question:", error);
      Alert.alert(
        "Error",
        "There was an issue submitting your question. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Create a New Question</Text>
      <TextInput
        placeholder="Question Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Question Body"
        value={question}
        onChangeText={setQuestion}
        style={{ borderWidth: 1, marginVertical: 10, padding: 10, height: 100 }}
        multiline
      />

      <Text style={{ fontSize: 18, marginTop: 20 }}>Tags:</Text>

      <View
        style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: 10 }}
      >
        {tags.map((tag, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tag}
            onPress={() => handleTagRemove(tag)}
          >
            <Text>{tag.name} x</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="Type to search for tags..."
        value={tagInput}
        onChangeText={setTagInput}
        style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
      />

      {suggestedTags.length > 0 && (
        <FlatList
          data={suggestedTags}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleTagSelect(item)}
              style={styles.suggestionItem}
            >
              <Text>{item.description}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionList}
        />
      )}

      <Button
        title={loading ? "Submitting..." : "Submit"}
        onPress={handleSubmit}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    backgroundColor: "#ddd",
    borderRadius: 10,
    padding: 8,
    marginRight: 5,
    marginBottom: 5,
  },
  suggestionList: {
    maxHeight: 150, // Adjust as needed
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default CreateQuestion;
