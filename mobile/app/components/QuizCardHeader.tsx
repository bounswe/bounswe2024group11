import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { QuizCardHeaderType } from "../types/quiz";

interface QuizCardHeaderProps {
  item: QuizCardHeaderType;
}

const QuizCardHeader: React.FC<QuizCardHeaderProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.difficulty_card}>
        <Text style={styles.difficulty_text}>{item.difficulty}</Text>
      </View>
      <View style={styles.rating_score_card}>
        <Text style={styles.rating_score_text}>{item.rating_score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  difficulty_card: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    margin: 4,
    backgroundColor: "#E5E7EB",
    elevation: 4,
  },
  difficulty_text: {
    fontSize: 16,
  },
  rating_score_card: {
    borderRadius: 4,
    padding: 4,
    backgroundColor: "#ECFDF5",
    elevation: 4,
  },
  rating_score_text: {
    fontSize: 20,
  },
});

export default QuizCardHeader;
