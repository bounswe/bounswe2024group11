import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { RootStackParamList } from "../../App";
import { LoggedinUser } from "../types/user";
import { Question } from "../types/forum";
import UserCard from "../components/UserCard";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ForumQuestionCard from "../components/ForumQuestionCard";
import API_URL_GLOBAL from "../../config";

const API_URL = `${API_URL_GLOBAL}profile/`;
//const API_URL = "http://138.68.97.90/api/v1/profile/";
const API_URL_FORUM_QUESTIONS = `${API_URL_GLOBAL}forum-questions/`;
//const API_URL_FORUM_QUESTIONS = "http://138.68.97.90/api/v1/forum-questions/";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "ProfileScreen">;

interface ProfileScreenProps {
  route: ProfileScreenRouteProp;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ route }) => {
  const { username } = route.params;
  const [user, setUser] = useState<LoggedinUser | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [upvotedQuestions, setUpvotedQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Question[]>(
    []
  );
  const navigation = useNavigation<ProfileScreenRouteProp>();

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}${username}`);
      setUser(response.data);
      //console.log(response.data);
      const bookmarked_forums = response.data.bookmarked_forums;
      //console.log(bookmarked_forums);
      const forumBookmarkedQuestions = bookmarked_forums.map(
        (item: { forum_question: number }) => item.forum_question
      );
      //console.log(forumBookmarkedQuestions);
      const questionsPromises = forumBookmarkedQuestions.map(
        async (questionId: number) => {
          const questionResponse = await axios.get(
            `${API_URL_FORUM_QUESTIONS}${questionId}`
          );
          return questionResponse.data;
        }
      );

      const questions = await Promise.all(questionsPromises);

      setBookmarkedQuestions(questions);

      //console.log(bookmarksResult.data.results);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user:", err);
      setError("Failed to load user data");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [username]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  const handleDeleteQuestion = async (deletedQuestionId: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter(
        (question) => Number(question.id) !== deletedQuestionId
      )
    );
    await fetchUser();
  };

  const handleBookmarkChange = async (
    questionId: number,
    newBookmarkState: number | null
  ) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        Number(question.id) === questionId
          ? { ...question, is_bookmarked: newBookmarkState }
          : question
      )
    );

    setBookmarkedQuestions((prevBookmarkedQuestions) =>
      newBookmarkState === null || newBookmarkState === 0
        ? prevBookmarkedQuestions.filter(
            (question) => Number(question.id) !== questionId
          )
        : prevBookmarkedQuestions
    );

    await fetchUser();
  };
  const handleVoteChange = async (
    questionId: number,
    isUpvoteId: number | null,
    isDownvoteId: number | null
  ) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        Number(question.id) === questionId
          ? {
              ...question,
              is_upvoted: isUpvoteId,
              is_downvoted: isDownvoteId,
              upvotes_count: isUpvoteId
                ? question.is_upvoted
                  ? question.upvotes_count
                  : question.upvotes_count + 1
                : question.is_upvoted
                  ? question.upvotes_count - 1
                  : question.upvotes_count,
              downvotes_count: isDownvoteId
                ? question.is_downvoted
                  ? question.downvotes_count
                  : question.downvotes_count + 1
                : question.is_downvoted
                  ? question.downvotes_count - 1
                  : question.downvotes_count,
            }
          : question
      )
    );

    setUpvotedQuestions((prevUpvotedQuestions) =>
      isUpvoteId === null || isUpvoteId === 0
        ? prevUpvotedQuestions.filter(
            (question) => Number(question.id) !== questionId
          )
        : prevUpvotedQuestions
    );

    await fetchUser();
  };

  const BookmarkedQuestionsRoute = () => (
    <ScrollView style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#5BADCE" />}
      {!loading && !error && (
        <>
          {bookmarkedQuestions.length > 0 ? (
            bookmarkedQuestions.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  (navigation as any).navigate("ForumQuestionDetail", {
                    question: item,
                    onBookmarkChange: handleBookmarkChange,
                    onVoteChange: handleVoteChange,
                  })
                }
              >
                <ForumQuestionCard
                  item={item}
                  onBookmarkChange={handleBookmarkChange}
                  onVoteChange={handleVoteChange}
                  onDelete={handleDeleteQuestion}
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text>No bookmarked questions.</Text>
          )}
        </>
      )}
    </ScrollView>
  );

  const userForUserCard = {
    id: user?.id || -1,
    full_name: user?.full_name || "",
    username: username || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  };

  const renderScene = SceneMap({
    bookmarkedQuestions: BookmarkedQuestionsRoute,
  });

  return (
    <View style={{ flex: 1 }}>
      <UserCard user={userForUserCard} />
      <TabView
        navigationState={{
          index: 0,
          routes: [
            { key: "bookmarkedQuestions", title: "Bookmarked Questions" },
          ],
        }}
        renderScene={renderScene}
        onIndexChange={() => {}}
        initialLayout={{ width: 360 }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={styles.tabBar}
            scrollEnabled={true}
            indicatorStyle={styles.tabIndicator}
            tabStyle={styles.tab}
            labelStyle={styles.tabLabel}
            renderLabel={({ route, focused }) => (
              <Text
                style={{
                  color: focused ? "#ffffff" : "#d1d1d1",
                  fontWeight: "bold",
                }}
              >
                {route.title}
              </Text>
            )}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  tabBar: {
    backgroundColor: "#5BADCE",
  },
  tab: {
    padding: 10,
  },
  tabLabel: {
    fontWeight: "bold",
    color: "#fff",
  },
  tabIndicator: {
    backgroundColor: "#333",
  },
});

export default ProfileScreen;
