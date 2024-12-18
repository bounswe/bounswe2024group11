import { RouteProp } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../App";
import QuizDetailText from "../components/QuizDetailText";
import ViewQuizButton from "../components/ViewQuizButton";

type QuizDetailScreenRouteProp = RouteProp<RootStackParamList, "QuizDetail">;

type Props = {
  route: QuizDetailScreenRouteProp;
};

const QuizDetail: React.FC<Props> = ({ route }) => {
  const { quiz } = route.params;

  return (
    <View style={styles.container}>
      <QuizDetailText item={quiz} />
      <ViewQuizButton
        item={{
          id: quiz.id,
          type: quiz.type,
          title: quiz.title,
          description: quiz.description,
          is_taken: quiz.is_taken,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default QuizDetail;
