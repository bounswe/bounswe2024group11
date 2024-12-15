import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, Button, Alert, View } from "react-native";
import axios from "axios";

const EditAnswer: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { questionId, answerId } = route.params;
  const [answerText, setAnswerText] = useState<string>("");

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const response = await axios.get(
          `http://138.68.97.90/api/v1/forum-questions/${questionId}/answers/${answerId}`
        );
        setAnswerText(response.data.answer);
      } catch (error) {
        console.error("Error fetching answer:", error);
      }
    };

    fetchAnswer();
  }, [questionId, answerId]);

  const handleSave = async () => {
    if (!answerText.trim()) {
      Alert.alert("Error", "Answer cannot be empty.");
      return;
    }

    try {
      await axios.put(
        `http://138.68.97.90/api/v1/forum-questions/${questionId}/answers/${answerId}/`,
        {
          answer: answerText,
        }
      );
      navigation.goBack();
    } catch (error) {
      console.error("Error saving answer:", error);
      Alert.alert("Error", "Failed to update the answer.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={answerText}
        onChangeText={setAnswerText}
        placeholder="Edit your answer"
        multiline
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    height: 150,
  },
});

export default EditAnswer;
