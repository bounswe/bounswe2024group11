import React from "react";
import { View, Text, TextInput, Button } from "react-native";

export const CreateQuestion: React.FC = () => {
  const handleSubmit = () => {
    // Logic to submit the new question
    console.log("Question submitted");
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24 }}>Create a New Question</Text>
      <TextInput
        placeholder="Question Title"
        style={{ borderWidth: 1, marginVertical: 10 }}
      />
      <TextInput
        placeholder="Question Body"
        style={{ borderWidth: 1, marginVertical: 10, height: 100 }}
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};
