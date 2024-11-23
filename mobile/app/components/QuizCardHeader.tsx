import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { QuizCardHeaderType } from "../types/quiz";

interface QuizCardHeaderProps {
  item: QuizCardHeaderType;
}

const QuizCardHeader: React.FC<QuizCardHeaderProps> = ({ item }) => {
  const casted_score = Math.floor(item.rating.score) as 0 | 1 | 2 | 3 | 4 | 5;

  return (
    <View style={styles.container}>
      <View style={styles.difficulty_card}>
        <Text style={styles.difficulty_text}>
          {item.difficulty == 1
            ? "EASY"
            : item.difficulty == 2
              ? "MEDIUM"
              : item.difficulty == 3
                ? "HARD"
                : ""}
        </Text>
      </View>
      <View
        style={[
          styles.rating_score_card,
          casted_score == 0
            ? styles.rating_score_card_0
            : casted_score == 1
              ? styles.rating_score_card_1
              : casted_score == 2
                ? styles.rating_score_card_2
                : casted_score == 3
                  ? styles.rating_score_card_3
                  : casted_score == 4 || casted_score == 5
                    ? styles.rating_score_card_4
                    : {},
        ]}
      >
        <Text
          style={[
            styles.rating_score_text,
            casted_score == 0
              ? styles.rating_score_text_0
              : casted_score == 1
                ? styles.rating_score_text_1
                : casted_score == 2
                  ? styles.rating_score_text_2
                  : casted_score == 3
                    ? styles.rating_score_text_3
                    : casted_score == 4 || casted_score == 5
                      ? styles.rating_score_text_4
                      : {},
          ]}
        >
          {item.rating.score?.toFixed(1) ?? "–"}
        </Text>
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
    backgroundColor: "#f1f5f9",
    elevation: 4,
  },
  difficulty_text: {
    color: "#1e293b",
    fontSize: 16,
  },
  rating_score_card: {
    borderRadius: 4,
    padding: 4,
    elevation: 4,
  },
  rating_score_card_0: {
    backgroundColor: "#fef2f2",
  },
  rating_score_card_1: {
    backgroundColor: "#fef2f2",
  },
  rating_score_card_2: {
    backgroundColor: "#fffbeb",
  },
  rating_score_card_3: {
    backgroundColor: "#f0f9ff",
  },
  rating_score_card_4: {
    backgroundColor: "#ecfdf5",
  },
  rating_score_text: {
    fontSize: 20,
  },
  rating_score_text_0: {
    color: "#991b1b",
  },
  rating_score_text_1: {
    color: "#991b1b",
  },
  rating_score_text_2: {
    color: "#92400e",
  },
  rating_score_text_3: {
    color: "#075985",
  },
  rating_score_text_4: {
    color: "#065f46",
  },
});

export default QuizCardHeader;
