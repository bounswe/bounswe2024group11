import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CreateQuiz: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>CreateQuiz</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default CreateQuiz;
