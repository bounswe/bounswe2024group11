import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const API_URL = "http://10.0.2.2:3000/forum-feed"; // URL to your forum-feed

const CreateQuestion: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!title || !body) {
      Alert.alert("Error", "Please fill in both the title and body.");
      return;
    }

    setLoading(true);

    // Mock new question data
    const newQuestion = {
      id: Date.now().toString(),
      title,
      body,
      tags: [
        {
          id: "1",
          name: "English",
          description: "English language",
        },
      ],
      author: {
        full_name: "Current User",
        username: "current_user",
        avatar: "https://example.com/avatar.jpg",
      },
      created_at: new Date().toISOString(),
      answers_count: 0,
      is_bookmarked: false,
      is_upvoted: false,
      upvotes_count: 0,
      is_downvoted: false,
      downvotes_count: 0,
    };

    try {
      await axios.patch(`${API_URL}`, {
        questions: [
          ...(await axios.get(`${API_URL}`)).data.questions,
          newQuestion,
        ],
      });

      Alert.alert("Success", "Your question has been submitted!");
      setTitle("");
      setBody("");
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
        value={body}
        onChangeText={setBody}
        style={{ borderWidth: 1, marginVertical: 10, padding: 10, height: 100 }}
        multiline
      />
      <Button
        title={loading ? "Submitting..." : "Submit"}
        onPress={handleSubmit}
        disabled={loading}
      />
    </View>
  );
};

export default CreateQuestion;
