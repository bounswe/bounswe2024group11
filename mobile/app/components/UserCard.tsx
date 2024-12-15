import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { LoggedinUser } from "../types/user";
import UserView from "./UserView";
import FollowButton from "./FollowButton";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import API_URL_GLOBAL from "../../config";

interface UserCardProps {
  user: LoggedinUser;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingsCount, setFollowingsCount] = useState(0);
  const { authState } = useAuth();

  // Fetch follow status and follower/following count
  useEffect(() => {
    const fetchFollowStatus = async () => {
      if (!authState?.token) {
        console.error("Auth token is missing");
        return;
      }
      try {
        // Fetch user profile data
        const profileResponse = await axios.get(
          `${API_URL_GLOBAL}profile/${user.username}`,
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );

        // Set followers and followings count from the response
        setFollowersCount(profileResponse.data.followers.length);
        setFollowingsCount(profileResponse.data.followings.length);

        // Check if the logged-in user is following the current user
        const followResponse = await axios.get(`${API_URL_GLOBAL}follow/`, {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });

        const followInstance = followResponse.data.results.find(
          (follow: any) => follow.following === user.id
        );
        setIsFollowing(!!followInstance);
      } catch (error) {
        console.error("Error during fetch operation:", error);
      }
    };

    fetchFollowStatus();
  }, [authState?.token, user.id, user.username]);

  const handleFollowToggle = async () => {
    if (!authState?.token) {
      console.error("Auth token is missing");
      return;
    }

    try {
      if (isFollowing) {
        // Unfollow
        const followInstance = await axios.get(`${API_URL_GLOBAL}follow/`, {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });

        const instanceToDelete = followInstance.data.results.find(
          (follow: any) => follow.following === user.id
        );

        if (instanceToDelete) {
          await axios.delete(
            `${API_URL_GLOBAL}follow/${instanceToDelete.id}/`,
            {
              headers: {
                Authorization: `Bearer ${authState.token}`,
              },
            }
          );
          setIsFollowing(false);
          setFollowersCount((prevCount) => prevCount - 1); // Decrement followers count
          console.log("Unfollowed successfully");
        } else {
          console.log("Follow instance not found for deletion");
        }
      } else {
        // Follow
        await axios.post(
          `${API_URL_GLOBAL}follow/`,
          { following: user.id },
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );
        setIsFollowing(true);
        setFollowersCount((prevCount) => prevCount + 1); // Increment followers count
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
        {/* Left Side: UserView and Follower Counts */}
        <View style={styles.leftContainer}>
          <UserView user={user} />
          <View style={styles.followCounts}>
            <Text style={styles.countText}>
              Followers: <Text style={styles.bold}>{followersCount}</Text>
            </Text>
            <Text style={styles.countText}>
              Following: <Text style={styles.bold}>{followingsCount}</Text>
            </Text>
          </View>
        </View>
        {/* Right Side: Follow Button */}
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
    margin: 16,
    padding: 16,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftContainer: {
    flexDirection: "row",
    //alignItems: "center",
  },
  followCounts: {
    marginLeft: 16,
  },
  countText: {
    fontSize: 14,
    color: "#555",
  },
  bold: {
    fontWeight: "bold",
  },
  followButton: {
    flexDirection: "row",
    //alignItems: "center",
    //justifyContent: "center",
  },
});

export default UserCard;
