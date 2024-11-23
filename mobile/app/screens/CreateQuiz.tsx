import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CreateQuiz: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quizType, setQuizType] = useState(1);

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
      {title && (
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
      {description && (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>What type of quiz is it?</Text>
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
      {description && (
        <TouchableOpacity style={styles.button}>
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
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CreateQuiz;
