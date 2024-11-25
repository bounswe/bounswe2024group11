import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface NewQuizQuestionProps {}

const API_URL = "http://138.68.97.90/api/v1";
// const API_URL = "http://10.0.2.2:8000/api/v1";

const NewQuizQuestion: React.FC<NewQuizQuestionProps> = ({}) => {
  return (
    <View style={styles.container}>
      <Text>New Quiz Question</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default NewQuizQuestion;
