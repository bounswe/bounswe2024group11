import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

const API_URL = "http://54.247.125.93/api/v1/forum-questions/"; // URL to your forum-feed

const CreateQuestion: React.FC = () => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

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
      tags: [
        {
          linked_data_id: "bn:00049910n",
          name: "language",
          description:
            "A systematic means of communicating by the use of sounds or conventional symbols",
        },
      ],
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
      <Button
        title={loading ? "Submitting..." : "Submit"}
        onPress={handleSubmit}
        disabled={loading}
      />
    </View>
  );
};

export default CreateQuestion;
