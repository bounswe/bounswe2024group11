import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../../App";
import { Tag, TagSearchResult } from "../types/tag";

const API_URL = "http://138.68.97.90/api/v1";
// const API_URL = "http://10.0.2.2:8000/api/v1";

type CreateQuizScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const CreateQuiz: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [suggestedTags, setSuggestedTags] = useState<TagSearchResult[]>([]);
  const [quizType, setQuizType] = useState(1);

  const navigation = useNavigation<CreateQuizScreenNavigationProp>();

  const fetchTagSuggestions = async (input: string) => {
    if (input.length < 2) {
      return;
    }

    const ENDPOINT = `${API_URL}/tagging/?word=${input}&lang=EN`;

    try {
      const result = await axios.get(`${ENDPOINT}`);
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

    if (!tags.includes(convertedTag)) {
      setTags([...tags, convertedTag]);
    }
    setTagInput("");
    setSuggestedTags([]);
  };

  const handleTagRemove = (tag: Tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>How do you call your quiz?</Text>
        <TextInput
          style={styles.input}
          placeholder="Quiz Title"
          value={title}
          onChangeText={setTitle}
        />
      </View>
      {title.length > 2 && (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            How do you describe your {title} quiz?
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Quiz Description"
            value={description}
            onChangeText={setDescription}
          />
        </View>
      )}
      {description.length > 2 && (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Tags:</Text>

          <View style={styles.selectedTagsContainer}>
            {tags.length > 0 ? (
              tags.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.tag}
                  onPress={() => handleTagRemove(tag)}
                >
                  <Text>{tag.name} x</Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noTagsContainer}>
                <Text>No tags selected 🧐</Text>
              </View>
            )}
          </View>

          <View style={styles.tagSearchContainer}>
            <TextInput
              placeholder="Search for tags..."
              value={tagInput}
              onChangeText={setTagInput}
              style={[styles.input, styles.searchInput]}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => fetchTagSuggestions(tagInput)}
            >
              <Text>Search</Text>
            </TouchableOpacity>
          </View>

          {tagInput.length > 0 && suggestedTags.length > 0 && (
            <FlatList
              data={suggestedTags}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleTagSelect(item)}
                  style={styles.suggestionItem}
                >
                  <View>
                    <Text style={styles.suggestionText}>{tagInput}</Text>
                    <Text style={styles.suggestionDescription}>
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              style={styles.suggestionList}
            />
          )}
        </View>
      )}

      {tags.length > 0 && (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>What type of quiz is this?</Text>
          <Picker
            selectedValue={quizType}
            onValueChange={(itemValue, itemIndex) => setQuizType(itemValue)}
          >
            <Picker.Item
              label="Given an English word, match translation"
              value="1"
            />
            <Picker.Item
              label="Given a Turkish word, match translation"
              value="2"
            />
            <Picker.Item label="Given an English word, match sense" value="3" />
          </Picker>
        </View>
      )}

      {tags.length > 0 && (
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("CreateQuizQuestion", {
              title: title,
              description: description,
              tags: tags,
              quiz_type: quizType,
            })
          }
        >
          <Text style={styles.buttonText}>Create Questions</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  questionContainer: {
    padding: 16,
    marginVertical: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    // borderColor: "#0ea5e9",
    borderRadius: 8,
    padding: 4,
  },
  button: {
    width: "auto",
    marginTop: 32,
    marginHorizontal: 120,
    backgroundColor: "#0ea5e9",
    padding: 16,
    borderRadius: 8,
    position: "absolute",
    bottom: 32,
    left: 0,
    right: 0,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  tag: {
    backgroundColor: "#e2e8f0",
    borderRadius: 10,
    padding: 8,
    marginRight: 5,
    marginBottom: 5,
    elevation: 4,
  },
  noTagsContainer: {
    padding: 8,
    marginBottom: 8,
  },
  tagSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
  },
  searchButton: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0f172a",
    elevation: 8,
  },
  selectedTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  suggestionList: {
    maxHeight: 300,
    borderWidth: 1,
    borderColor: "#64748b",
    borderRadius: 8,
    marginVertical: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#cbd5e1",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  suggestionText: {
    fontWeight: "bold",
  },
  suggestionDescription: {},
});

export default CreateQuiz;
