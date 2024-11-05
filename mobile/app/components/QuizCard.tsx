import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { QuizOverview } from "../types/quiz";
import QuizCardBody from "./QuizCardBody";
import QuizCardHeader from "./QuizCardHeader";

import QuizCardFooter from "./QuizCardFooter";
import TagCards from "./TagCards";

interface QuizCardProps {
  item: QuizOverview;
}

const QuizCard: React.FC<QuizCardProps> = ({ item }) => {
  return (
    <View>
      <Card style={styles.card}>
        <QuizCardHeader
          item={{
            difficulty: item.difficulty,
            rating_score: item.rating.score,
          }}
        />
        <QuizCardBody
          item={{ title: item.title, description: item.description }}
        />
        <TagCards items={item.tags} />
        <View style={styles.line} />
        <QuizCardFooter
          item={{
            author: item.author,
            num_taken: item.num_taken,
            created_at: item.created_at,
          }}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  card: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 24,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 12,
  },
});

export default QuizCard;
