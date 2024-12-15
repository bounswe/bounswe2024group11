import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LoggedinUser } from "../types/user";
import UserView from "./UserView";
import FollowButton from "./FollowButton";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface UserCardProps {
  user: LoggedinUser;
}

interface Follow {
  created_at: string; // ISO date string
  follower: number; // or a more specific type if needed
  following: number; // corresponds to the user ID being followed
  id: number;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { authState } = useAuth();

  // Fetch follow status when the component mounts or when authState.token or user.id changes
  useEffect(() => {
    const fetchFollowStatus = async () => {
      if (!authState?.token) {
        console.error("Auth token is missing");
        return;
      }
      try {
        const response = await axios.get(
          "http://10.0.2.2:8000/api/v1/follow/",
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );

        const followInstance = response.data.results.find(
          (follow: Follow) => follow.following === user.id
        );
        setIsFollowing(!!followInstance);
      } catch (error) {
        console.error("Error during follow status fetch:", error);
      }
    };

    fetchFollowStatus();
  }, [authState?.token, user.id]); // Only run when the token or user.id changes

  const handleFollowToggle = async () => {
    if (!authState?.token) {
      console.error("Auth token is missing");
      return;
    }

    try {
      if (isFollowing) {
        // Unfollow
        const followInstance = await axios.get(
          `http://10.0.2.2:8000/api/v1/follow/`,
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );

        const instanceToDelete = followInstance.data.results.find(
          (follow: Follow) => follow.following === user.id
        );

        if (instanceToDelete) {
          await axios.delete(
            `http://10.0.2.2:8000/api/v1/follow/${instanceToDelete.id}/`,
            {
              headers: {
                Authorization: `Bearer ${authState.token}`,
              },
            }
          );
          setIsFollowing(false);
          console.log("Unfollowed successfully");
        } else {
          console.log("Follow instance not found for deletion");
        }
      } else {
        // Follow
        await axios.post(
          "http://10.0.2.2:8000/api/v1/follow/",
          { following: user.id },
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );
        setIsFollowing(true);
        console.log("Followed successfully");
      }
    } catch (error) {
      console.error("Error during follow/unfollow operation", error);
    }
  };

  const isLoggedInUser = authState?.user?.username === user.username;

  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <UserView user={user} />
        {!isLoggedInUser && (
          <View style={styles.followButton}>
            <FollowButton
              isFollowing={isFollowing}
              handleFollowToggle={handleFollowToggle}
            />
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 24,
    padding: 24,
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  followButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5BADCE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 0.3,
  },
  buttonText: {
    color: "#ffffff",
    marginRight: 8,
    fontWeight: "bold",
  },
});

export default UserCard;
