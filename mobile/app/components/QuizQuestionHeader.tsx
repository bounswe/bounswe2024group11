import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface QuizQuestionHeaderProps {
  title: string;
  description: string;
}

const QuizQuestionHeader: React.FC<QuizQuestionHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#64748B",
  },
});

export default QuizQuestionHeader;
