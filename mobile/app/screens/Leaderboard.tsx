import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Leaderboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You are the Leader!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
