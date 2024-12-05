import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useAuth } from "../context/AuthContext"; // Import the context
import UserCard from "../components/UserCard";

const Profile: React.FC = () => {
  const { authState } = useAuth();

  if (!authState || !authState.authenticated || !authState.user) {
    return (
      <View style={styles.container}>
        <Text>You need to log in to see this page</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <UserCard user={authState.user} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "flex-start",
  },
  profileInfo: {
    marginTop: 20,
  },
  title: {
    fontWeight: "bold",
  },
});

export default Profile;
