import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { Author } from "../types/forum";
import AuthorView from "./AuthorView";

interface QuizCardFooterProps {
  item: {
    author: Author;
    num_taken: number;
    created_at: string;
  };
}

const QuizCardFooter: React.FC<QuizCardFooterProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.container_row_1}>
        <AuthorView author={item.author} />
        <Text style={styles.created_at}>{item.created_at}</Text>
      </View>
      <View style={styles.container_row_2}>
        <Text style={styles.num_taken}>{item.num_taken}</Text>
        <Button style={styles.take_quiz_button}>Take Quiz</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  container_row_1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container_row_2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  created_at: {},
  num_taken: {},
  take_quiz_button: {
    backgroundColor: "#22D3EE",
    padding: 4,
    borderRadius: 8,
    elevation: 8,
    width: "auto",
    height: "auto",
  },
});

export default QuizCardFooter;
