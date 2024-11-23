import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface QuizCardBodyProps {
  item: {
    title: string;
    description: string;
  };
}

const QuizCardBody: React.FC<QuizCardBodyProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
  },
});

export default QuizCardBody;
