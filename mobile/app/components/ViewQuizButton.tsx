import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ViewQuizButtonProps {
  item: {
    id: string;
    is_taken: boolean;
  };
}

const ViewQuizButton: React.FC<ViewQuizButtonProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.button}>
        {item.is_taken ? "Review Quiz" : "Take Quiz"}
      </Text>
      {item.is_taken && <Text style={styles.secondButton}>Retake Quiz</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  button: {
    backgroundColor: "#22D3EE",
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
    elevation: 4,
  },
  secondButton: {
    backgroundColor: "#000000",
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
    elevation: 4,
  },
});

export default ViewQuizButton;
