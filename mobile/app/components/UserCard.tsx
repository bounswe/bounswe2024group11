import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LoggedinUser } from "../types/user";
import UserView from "./UserView";

interface UserCardProps {
  user: LoggedinUser;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <UserView user={user} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  followButton: {
    flex: 1,
    alignItems: "flex-end",
  },
});

export default UserCard;
