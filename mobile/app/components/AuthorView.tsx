import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Author } from "../types/forum";

interface AuthorViewProps {
  author: Author;
}

const AuthorView: React.FC<AuthorViewProps> = ({ author }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: author.avatar }} style={styles.image} />
      <View>
        <Text style={styles.full_name}>{author.full_name}</Text>
        <Text style={styles.username}>@{author.username}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  full_name: {
    fontWeight: "bold",
  },
  username: {
    color: "grey",
  },
});

export default AuthorView;
