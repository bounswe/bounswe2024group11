import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LoggedinUser } from "../types/user";

interface UserViewProps {
  user: LoggedinUser;
}

const UserView: React.FC<UserViewProps> = ({ user }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.image} />
      <View>
        <Text style={styles.full_name}>{user.full_name}</Text>
        <Text style={styles.username}>@{user.username}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
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

export default UserView;
