import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";

type CustomButtonTypes = {
  text: string;
  onPress: () => void;
  bgColor: string;
  textColor: string;
};

const CustomButton = (props: CustomButtonTypes) => {
  const { text, onPress, bgColor, textColor } = props;

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, { backgroundColor: bgColor }]}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
  },
});

export default CustomButton;
