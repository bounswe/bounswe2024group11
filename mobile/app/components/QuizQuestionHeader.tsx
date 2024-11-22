import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { QuizQuestionHintType } from "../types/quiz";

interface QuizQuestionHeaderProps {
  hints: QuizQuestionHintType[];
  openDrawer: () => void;
}

const QuizQuestionHeader: React.FC<QuizQuestionHeaderProps> = ({
  hints,
  openDrawer,
}) => {
  return (
    hints.length > 0 && (
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.container} onPress={openDrawer}>
          <View>
            <Icon name="lightbulb-outline" size={36} color="#0f172a" />
          </View>
        </TouchableOpacity>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    width: "100%",
    height: 0,
  },
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
    width: "auto",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#0f172a",
    backgroundColor: "#fef08a",
    padding: 4,
    margin: 4,
  },
});

export default QuizQuestionHeader;
