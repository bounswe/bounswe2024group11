import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  questions_count: number;
  current_question_index: number;
}

const CreateQuizQuestionHeader: React.FC<Props> = ({
  questions_count,
  current_question_index,
}) => {
  return (
    <View>
      <Text>
        {current_question_index + 1}/{questions_count}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CreateQuizQuestionHeader;
