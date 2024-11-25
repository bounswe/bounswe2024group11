import { RouteProp } from "@react-navigation/native";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../App";

type CreateQuizQuestionScreenRouteProp = RouteProp<
  RootStackParamList,
  "ReviewCreateQuiz"
>;

interface Props {
  route: CreateQuizQuestionScreenRouteProp;
}

const ReviewCreateQuiz: React.FC<Props> = ({ route }) => {
  const { title, description, tags, quiz_type, questions, questionsCount } =
    route.params;

  return (
    <View>
      <Text>ReviewCreateQuiz</Text>
      <Text>{title}</Text>
      <Text>{description}</Text>
      <Text>{tags.map((tag) => tag.name).join(", ")}</Text>
      <Text>{quiz_type}</Text>
      <FlatList
        data={questions}
        renderItem={({ item }) => <Text>{item.question_text}</Text>}
      />
      <Text>{questionsCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ReviewCreateQuiz;
