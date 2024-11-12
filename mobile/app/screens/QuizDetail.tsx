import { RouteProp } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../App";

type QuizDetailScreenRouteProp = RouteProp<RootStackParamList, "QuizDetail">;

type Props = {
  route: QuizDetailScreenRouteProp;
};

const QuizDetail: React.FC<Props> = ({ route }) => {
  const { quiz } = route.params;

  return (
    <View>
      <Text>{quiz.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default QuizDetail;
