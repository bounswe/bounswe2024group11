import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../App";

interface ViewQuizButtonProps {
  item: {
    id: string;
    type: number;
    title: string;
    description: string;
    is_taken: boolean;
  };
}

type TakeQuizNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ViewQuizButton: React.FC<ViewQuizButtonProps> = ({ item }) => {
  const navigation = useNavigation<TakeQuizNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.button}>
        {item.is_taken ? "Review Quiz" : "Take Quiz"}
      </Text>
      {item.is_taken && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ViewQuiz", {
              id: item.id,
              type: item.type,
              title: item.title,
              description: item.description,
            })
          }
        >
          <Text style={styles.secondButton}>Retake Quiz</Text>
        </TouchableOpacity>
      )}
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
