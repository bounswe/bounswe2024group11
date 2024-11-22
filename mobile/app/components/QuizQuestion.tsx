import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { QuizQuestionType } from "../types/quiz";
import QuizQuestionBody from "./QuizQuestionBody";
import QuizQuestionButtons from "./QuizQuestionButtons";
import QuizQuestionHeader from "./QuizQuestionHeader";

interface QuizQuestionProps {
  title: string;
  description: string;
  is_review: boolean;
  quiz_type: number;
  question: QuizQuestionType;
  currentQuestionIndex: number;
  questions_length: number;
  selectedOption: number | null;
  checkedOptions: number[];
  setIsHintUsed: (value: boolean) => void;
  onSelectOption: (option: number) => void;
  goToPreviousQuestion: () => void;
  goToNextQuestion: () => void;
  onSubmit: () => void;
  onCheckQuestion: () => void;
  onContinue: () => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  title,
  description,
  is_review,
  quiz_type,
  selectedOption,
  checkedOptions,
  onSelectOption,
  currentQuestionIndex,
  questions_length,
  setIsHintUsed,
  goToPreviousQuestion,
  goToNextQuestion,
  onSubmit,
  onCheckQuestion,
  onContinue,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const windowHeight = Dimensions.get("window").height;

  const openDrawer = () => {
    setIsHintUsed(true);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <View style={styles.container}>
      <QuizQuestionHeader hints={question.hints} openDrawer={openDrawer} />
      <QuizQuestionBody
        question={question}
        quiz_type={quiz_type}
        is_review={is_review}
        selectedOption={selectedOption}
        checkedOptions={checkedOptions}
        onSelectOption={onSelectOption}
      />
      <QuizQuestionButtons
        currentQuestionIndex={currentQuestionIndex}
        questions_length={questions_length}
        is_review={is_review}
        checkedOptions={checkedOptions}
        goToPreviousQuestion={goToPreviousQuestion}
        goToNextQuestion={goToNextQuestion}
        onSubmit={onSubmit}
        onCheckQuestion={onCheckQuestion}
        onContinue={onContinue}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDrawerOpen}
        onRequestClose={closeDrawer}
      >
        <View style={[styles.drawer, { height: windowHeight * 0.35 }]}>
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerHeaderText}>A Hint for You!</Text>
            <TouchableOpacity
              style={styles.drawerHeaderIcon}
              onPress={closeDrawer}
            >
              <Icon name="close" size={32} color="#a16207" />
            </TouchableOpacity>
          </View>

          <View style={styles.drawerBody} />
          <Text style={styles.drawerBodyText}>
            The{" "}
            {question.hints?.[0]?.type == "synonym"
              ? "synonym"
              : question.hints?.[0]?.type == "sense"
                ? "sense"
                : question.hints?.[0]?.type == "image"
                  ? "image"
                  : "hint"}{" "}
            for the word '{question.question_text}' is:
          </Text>
          <Text style={styles.drawerBodyHint}>{question.hints?.[0]?.text}</Text>

          <View style={styles.drawerFooter}>
            <Text style={styles.drawerFooterText}>
              Using hints reduces the score you get for a question by 30%.
            </Text>
          </View>

          {/* <View
            style={{
              opacity: 0.2,
              height: 1,
              borderWidth: 1,
              borderColor: "#86827e",
              marginVertical: 16,
            }}
          /> */}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    height: "100%",
  },
  drawer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 24,
    backgroundColor: "#fefce8",
    borderColor: "#a16207",
  },
  drawerHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  drawerHeaderText: {
    fontSize: 18,
    // fontWeight: "bold",
    color: "#713f12",
  },
  drawerHeaderIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  drawerBody: {
    paddingVertical: 16,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  drawerBodyText: {
    color: "#713f12",
    fontSize: 20,
  },
  drawerBodyHint: {
    marginVertical: 16,
    color: "#713f12",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerFooter: {
    marginTop: 16,
  },
  drawerFooterText: {
    fontSize: 12,
    color: "#713f12",
  },
});

export default QuizQuestion;
