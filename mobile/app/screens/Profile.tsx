import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import UserCard from "../components/UserCard";

interface BookmarkedQuestion {
  id: number;
  user: number;
  forum_question: number; // ID of the question
  created_at: string;
}

interface UpvotedQuestion {
  id: number;
  user: number;
  forum_question: number; // ID of the question
  created_at: string;
}

const Profile: React.FC = () => {
  const { authState } = useAuth();
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<
    BookmarkedQuestion[]
  >([]);
  const [upvotedQuestions, setUpvotedQuestions] = useState<UpvotedQuestion[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authState?.user) {
      fetchBookmarkedQuestions();
      fetchUpvotedQuestions();
    }
  }, [authState]);

  const fetchBookmarkedQuestions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://138.68.97.90:8000/api/v1/forum-bookmarks/",
        {
          headers: {
            Authorization: `Bearer ${authState?.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bookmarked questions");
      }

      const data = await response.json();
      setBookmarkedQuestions(data.results); // Extract the results array
    } catch (err) {
      const errorMessage = (err as Error).message || "An error occurred";
      setError(errorMessage);
    }
  };

  const fetchUpvotedQuestions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://138.68.97.90:8000/api/v1/forum-upvote/", // Adjust API endpoint for upvotes
        {
          headers: {
            Authorization: `Bearer ${authState?.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch upvoted questions");
      }

      const data = await response.json();
      setUpvotedQuestions(data.results); // Extract the results array
    } catch (err) {
      const errorMessage = (err as Error).message || "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!authState?.authenticated || !authState?.user) {
    return (
      <View style={styles.container}>
        <Text>You need to log in to see this page</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <UserCard user={authState.user} />

      <View style={styles.bookmarkedContainer}>
        <Text style={styles.title}>Bookmarked Questions</Text>

        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {!loading && !error && (
          <FlatList
            data={bookmarkedQuestions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.questionCard}>
                <Text style={styles.questionTitle}>
                  Bookmarked Question ID: {item.forum_question}
                </Text>
                <Text style={styles.questionBody}>
                  Bookmarked at: {new Date(item.created_at).toLocaleString()}
                </Text>
              </View>
            )}
          />
        )}
      </View>

      <View style={styles.bookmarkedContainer}>
        <Text style={styles.title}>Upvoted Questions</Text>

        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {!loading && !error && (
          <FlatList
            data={upvotedQuestions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.questionCard}>
                <Text style={styles.questionTitle}>
                  Upvoted Question ID: {item.forum_question}
                </Text>
                <Text style={styles.questionBody}>
                  Upvoted at: {new Date(item.created_at).toLocaleString()}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "flex-start",
  },
  bookmarkedContainer: {
    marginTop: 20,
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  questionCard: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  questionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  questionBody: {
    fontSize: 14,
    color: "#555",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default Profile;
