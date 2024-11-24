import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  point: number;
};

const DifficultyView: React.FC<Props> = ({ point }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculated Difficulty Score: </Text>
      <Text style={styles.point}>{point}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 12,
  },
  title: {},
  point: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 4,
  },
});

export default DifficultyView;
