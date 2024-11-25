import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  addQuestionToRight: () => void;
  addQuestionToLeft: () => void;
  deleteQuestion: () => void;
  reviewQuiz: () => void;
}

const CreateQuizQuestionFooter: React.FC<Props> = ({
  goToNextQuestion,
  goToPreviousQuestion,
  addQuestionToRight,
  addQuestionToLeft,
  deleteQuestion,
  reviewQuiz,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.toolboxContainer}>
        <TouchableOpacity style={styles.button} onPress={goToPreviousQuestion}>
          <Icon name="arrow-left" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={addQuestionToLeft}>
          <Icon name="plus" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={deleteQuestion}>
          <Icon name="trash-can-outline" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={addQuestionToRight}>
          <Icon name="plus" size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToNextQuestion}>
          <Icon name="arrow-right" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={reviewQuiz}>
          <View style={styles.reviewContainer}>
            <Text style={styles.reviewText}>Review & Create</Text>
            <Icon
              name="checkbox-marked-circle-outline"
              size={24}
              color="#000000"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 32,
    width: "100%",
    marginHorizontal: 24,
  },
  toolboxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  reviewContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#0f172a",
    backgroundColor: "#bae6fd",
  },
  reviewText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
});

export default CreateQuizQuestionFooter;
