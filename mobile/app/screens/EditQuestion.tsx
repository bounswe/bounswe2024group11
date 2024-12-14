import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
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
import { RootStackParamList } from "../../App";

const API_URL = "http://138.68.97.90/api/v1/forum-questions/";

const EditQuestion: React.FC = () => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [suggestedTags, setSuggestedTags] = useState<TagSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const route = useRoute<RouteProp<RootStackParamList, "EditQuestion">>();
  const { questionId } = route.params;

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`${API_URL}${questionId}/`);
        const { title, question, tags } = response.data;
        setTitle(title);
        setQuestion(question);
        setTags(tags);
      } catch (error) {
        console.error("Error fetching question:", error);
        Alert.alert("Error", "There was an issue fetching the question data.");
      }
    };

    fetchQuestion();
  }, [questionId]);

  const fetchTagSuggestions = async (input: string) => {
    const API_URL = `http://138.68.97.90/api/v1/tagging/?word=${input}&lang=EN`;
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

  const handleTagSelect = (tag: TagSearchResult) => {
    const convertedTag: Tag = {
      name: tagInput,
      linked_data_id: tag.id,
      description: tag.description,
    };

    if (!tags.find((existingTag) => existingTag.linked_data_id === tag.id)) {
      setTags([...tags, convertedTag]);
    }
    setTagInput("");
    setSuggestedTags([]);
  };

  const handleTagRemove = (tag: Tag) => {
    setTags(tags.filter((t) => t.linked_data_id !== tag.linked_data_id));
  };

  const handleSubmit = async () => {
    if (!title || !question) {
      Alert.alert("Error", "Please fill in both the title and question.");
      return;
    }

    setLoading(true);

    const formattedTags = tags.map((tag) => ({
      name: tag.name,
      linked_data_id: tag.linked_data_id,
      description: tag.description,
    }));

    const updatedQuestion = {
      title,
      question,
      tags: formattedTags,
    };

    try {
      const response = await axios.put(
        `${API_URL}${questionId}/`,
        updatedQuestion
      );
      console.log("Success:", response.data);
      Alert.alert("Success", "Your question has been updated!");
      setTitle("");
      setQuestion("");
      setTags([]);
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      console.error("Error submitting question:", error);
      Alert.alert(
        "Error",
        "There was an issue updating your question. Please try again."
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tagInput.length > 2) {
      fetchTagSuggestions(tagInput);
    } else {
      setSuggestedTags([]);
    }
  }, [tagInput]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Edit Question</Text>

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
        title={loading ? "Updating..." : "Update"}
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
    maxHeight: 150,
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

export default EditQuestion;
