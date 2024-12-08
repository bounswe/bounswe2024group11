import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { RootStackParamList } from "../../App";
import ForumQuestionCard from "../components/ForumQuestionCard";
import UserCard from "../components/UserCard";
import { Question } from "../types/forum";
import { useAuth } from "../context/AuthContext";

// API Endpoints
const API_URL_BOOKMARKS = "http://138.68.97.90/api/v1/forum-bookmarks/";
const API_URL_UPVOTES = "http://138.68.97.90/api/v1/forum-upvote/";
const FORUM_QUESTION_URL = "http://138.68.97.90/api/v1/forum-questions/";

type ProfileScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Profile: React.FC = () => {
  const { authState } = useAuth();
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Question[]>(
    []
  );
  const [upvotedQuestions, setUpvotedQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      if (!authState?.token) {
        setError("You need to be logged in to fetch questions.");
        setLoading(false);
        return;
      }

      try {
        // Fetch bookmarked questions
        const bookmarksResult = await axios.get(`${API_URL_BOOKMARKS}`, {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });

        // Fetch upvoted questions
        const upvotesResult = await axios.get(`${API_URL_UPVOTES}`, {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });

        // Fetch the full details of each forum question using the forum_question ID
        const bookmarkedQuestionsPromises = bookmarksResult.data.results.map(
          async (item: any) => {
            const questionResponse = await axios.get(
              `${FORUM_QUESTION_URL}${item.forum_question}/`,
              {
                headers: {
                  Authorization: `Bearer ${authState.token}`,
                },
              }
            );
            return questionResponse.data; // Return the question data
          }
        );

        const upvotedQuestionsPromises = upvotesResult.data.results.map(
          async (item: any) => {
            const questionResponse = await axios.get(
              `${FORUM_QUESTION_URL}${item.forum_question}/`,
              {
                headers: {
                  Authorization: `Bearer ${authState.token}`,
                },
              }
            );
            return questionResponse.data; // Return the question data
          }
        );

        const bookmarkedQuestionsData = await Promise.all(
          bookmarkedQuestionsPromises
        );
        const upvotedQuestionsData = await Promise.all(
          upvotedQuestionsPromises
        );

        setBookmarkedQuestions(bookmarkedQuestionsData); // Set the bookmarked questions
        setUpvotedQuestions(upvotedQuestionsData); // Set the upvoted questions
      } catch (error) {
        setError("Error fetching questions");
        console.error("Error fetching questions", error);
      } finally {
        setLoading(false);
      }
    };

    if (isFocused) {
      fetchQuestions();
    }
  }, [isFocused, authState?.token]);

  if (!authState?.authenticated || !authState?.user) {
    return (
      <View style={styles.container}>
        <Text>You need to log in to see this page</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <UserCard user={authState.user} />

      <View style={styles.questionsContainer}>
        <Text style={styles.title}>Bookmarked Questions</Text>

        {loading && <ActivityIndicator size="large" color="#2196F3" />}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {!loading && !error && (
          <>
            {/* Render Bookmarked Questions */}
            {bookmarkedQuestions.length > 0 ? (
              bookmarkedQuestions.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() =>
                    navigation.navigate("ForumQuestionDetail", {
                      question: item,
                    })
                  }
                >
                  <ForumQuestionCard item={item} />
                </TouchableOpacity>
              ))
            ) : (
              <Text>No bookmarked questions.</Text>
            )}

            {/* Render Upvoted Questions */}
            <Text style={styles.title}>Upvoted Questions</Text>
            {upvotedQuestions.length > 0 ? (
              upvotedQuestions.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() =>
                    navigation.navigate("ForumQuestionDetail", {
                      question: item,
                    })
                  }
                >
                  <ForumQuestionCard item={item} />
                </TouchableOpacity>
              ))
            ) : (
              <Text>No upvoted questions.</Text>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  questionsContainer: {
    marginTop: 20,
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default Profile;
