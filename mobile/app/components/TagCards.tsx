import React from "react";
import { StyleSheet, View } from "react-native";
import { Tag } from "../types/tag";
import TagCard from "./TagCard";

interface TagCardsProps {
  items: Tag[];
}

const TagCards: React.FC<TagCardsProps> = ({ items }) => {
  return (
    <View style={styles.container}>
      {/* <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TagCard item={item} />}
        horizontal={true}
      /> */}
      {items.map((item) => (
        <TagCard key={item.linked_data_id} item={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingVertical: 12,
  },
});

export default TagCards;
