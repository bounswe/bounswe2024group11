import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  addQuestionToRight: () => void;
  addQuestionToLeft: () => void;
  deleteQuestion: () => void;
}

const CreateQuizQuestionFooter: React.FC<Props> = ({
  goToNextQuestion,
  goToPreviousQuestion,
  addQuestionToRight,
  addQuestionToLeft,
  deleteQuestion,
}) => {
  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 32,
    width: "100%",
    marginHorizontal: 24,
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#0f172a",
    backgroundColor: "#e2e8f0",
  },
});

export default CreateQuizQuestionFooter;
