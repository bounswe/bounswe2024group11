import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Tag } from "../types/tag";

interface TagCardProps {
  item: Tag;
}

const TagCard: React.FC<TagCardProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    margin: 4,
    elevation: 4,
    width: "auto",
    height: "auto",
  },
  text: {
    fontSize: 14,
    textTransform: "uppercase",
  },
});

export default TagCard;
