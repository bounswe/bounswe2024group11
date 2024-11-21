import { RouteProp } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../App";

type QuizResultScreenRouteProp = RouteProp<RootStackParamList, "QuizResult">;

type Props = {
  route: QuizResultScreenRouteProp;
};

const QuizResult: React.FC<Props> = ({ route }) => {
  return (
    <View>
      <Text>QuizResult</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default QuizResult;
