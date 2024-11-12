import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

interface ViewQuizButtonProps {
  item: {
    id: string;
    is_taken: boolean;
  };
}

const ViewQuizButton: React.FC<ViewQuizButtonProps> = ({ item }) => {
  return (
    <View>
      <Button>{item.is_taken ? "Review Quiz" : "Take Quiz"}</Button>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ViewQuizButton;
