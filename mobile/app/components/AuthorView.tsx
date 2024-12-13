import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Author } from "../types/forum";

interface AuthorViewProps {
  author: Author | undefined; // Allowing author to be possibly undefined
}

const AuthorView: React.FC<AuthorViewProps> = ({ author }) => {
  // Ensure 'author' is defined and has the expected properties
  if (!author) {
    return null; // You can render a placeholder or return nothing if 'author' is missing
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: author.avatar || "default-avatar-url" }} // Provide default URL in case avatar is missing
        style={styles.image}
      />
      <View>
        <Text style={styles.full_name}>
          {author.full_name || "Unknown Author"}
        </Text>
        <Text
          style={styles.username}
        >{`@${author.username || "Unknown"}`}</Text>
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
