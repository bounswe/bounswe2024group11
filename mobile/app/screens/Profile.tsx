import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { RootStackParamList } from "../../App";
import ForumQuestionCard from "../components/ForumQuestionCard";
import UserCard from "../components/UserCard";
import QuizCard from "../components/QuizCard";
import { Question } from "../types/forum";
import { QuizOverview } from "../types/quiz";
import { useAuth } from "../context/AuthContext";

// API Endpoints
const API_URL_BOOKMARKS = "http://138.68.97.90/api/v1/forum-bookmarks/";
const API_URL_UPVOTES = "http://138.68.97.90/api/v1/forum-upvote/";
const API_URL_FORUM_QUESTIONS = "http://138.68.97.90/api/v1/forum-questions/";
const API_URL_QUIZZES = "http://138.68.97.90/api/v1/quizzes/";

type ProfileScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Profile: React.FC = () => {
  const { authState } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [myQuizzes, setMyQuizzes] = useState<QuizOverview[]>([]);
  const [myTakenQuizzes, setMyTakenQuizzes] = useState<QuizOverview[]>([]);
  const [myQuestions, setMyQuestions] = useState<Question[]>([]);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Question[]>(
    []
  );
  const [upvotedQuestions, setUpvotedQuestions] = useState<Question[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [index, setIndex] = useState(0); // Tracks the selected tab index

  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const isFocused = useIsFocused();
  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    if (!authState?.token) {
      setError("You need to be logged in to fetch questions.");
      setLoading(false);
      return;
    }

    try {
      const myQuizzesResult = await axios.get(`${API_URL_QUIZZES}`, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

      const myQuestionsResult = await axios.get(`${API_URL_FORUM_QUESTIONS}`, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

      const bookmarksResult = await axios.get(`${API_URL_BOOKMARKS}`, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

      const upvotesResult = await axios.get(`${API_URL_UPVOTES}`, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

      const myQuizzesPromises = myQuizzesResult.data.results
        .filter((item: any) => item.is_my_quiz)
        .map(async (item: any) => {
          const quizResponse = await axios.get(
            `${API_URL_QUIZZES}${item.id}/`,
            {
              headers: {
                Authorization: `Bearer ${authState.token}`,
              },
            }
          );
          return quizResponse.data;
        });

      const myTakenQuizzesPromises = myQuizzesResult.data.results
        .filter((item: any) => item.is_taken)
        .map(async (item: any) => {
          const quizResponse = await axios.get(
            `${API_URL_QUIZZES}${item.id}/`,
            {
              headers: {
                Authorization: `Bearer ${authState.token}`,
              },
            }
          );
          return quizResponse.data;
        });

      const myQuestionsPromises = myQuestionsResult.data.results
        .filter((item: any) => item.is_my_forum_question)
        .map(async (item: any) => {
          const questionResponse = await axios.get(
            `${API_URL_FORUM_QUESTIONS}${item.id}/`,
            {
              headers: {
                Authorization: `Bearer ${authState.token}`,
              },
            }
          );
          return questionResponse.data;
        });

      const bookmarkedQuestionsPromises = bookmarksResult.data.results.map(
        async (item: any) => {
          const questionResponse = await axios.get(
            `${API_URL_FORUM_QUESTIONS}${item.forum_question}/`,
            {
              headers: {
                Authorization: `Bearer ${authState.token}`,
              },
            }
          );
          return questionResponse.data;
        }
      );

      const upvotedQuestionsPromises = upvotesResult.data.results.map(
        async (item: any) => {
          const questionResponse = await axios.get(
            `${API_URL_FORUM_QUESTIONS}${item.forum_question}/`,
            {
              headers: {
                Authorization: `Bearer ${authState.token}`,
              },
            }
          );
          return questionResponse.data;
        }
      );

      const myQuizzesData = await Promise.all(myQuizzesPromises);
      const myTakenQuizzesData = await Promise.all(myTakenQuizzesPromises);
      const myQuestionsData = await Promise.all(myQuestionsPromises);

      const bookmarkedQuestionsData = await Promise.all(
        bookmarkedQuestionsPromises
      );
      const upvotedQuestionsData = await Promise.all(upvotedQuestionsPromises);

      setMyQuizzes(myQuizzesData);
      setMyTakenQuizzes(myTakenQuizzesData);
      setMyQuestions(myQuestionsData);
      setBookmarkedQuestions(bookmarkedQuestionsData);
      setUpvotedQuestions(upvotedQuestionsData);
    } catch (error) {
      setError("Error fetching questions");
      console.error("Error fetching questions", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isFocused) {
      fetchQuestions();
    }
  }, [isFocused, authState?.token]);

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

    await fetchQuestions();
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

    await fetchQuestions();
  };

  if (!authState?.authenticated || !authState?.user) {
    return (
      <View style={styles.container}>
        <Text>You need to log in to see this page</Text>
      </View>
    );
  }

  // TabView scenes
  const MyQuizzesRoute = () => (
    <ScrollView style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#5BADCE" />}
      {!loading && !error && (
        <>
          {myQuizzes.length > 0 ? (
            myQuizzes.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate("QuizDetail", {
                    quiz: item,
                  })
                }
              >
                <QuizCard item={item} />
              </TouchableOpacity>
            ))
          ) : (
            <Text>No quizzes created by you.</Text>
          )}
        </>
      )}
    </ScrollView>
  );

  const MyTakenQuizzesRoute = () => (
    <ScrollView style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#5BADCE" />}
      {!loading && !error && (
        <>
          {myTakenQuizzes.length > 0 ? (
            myTakenQuizzes.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate("QuizDetail", {
                    quiz: item,
                  })
                }
              >
                <QuizCard item={item} />
              </TouchableOpacity>
            ))
          ) : (
            <Text>No quizzes taken by you.</Text>
          )}
        </>
      )}
    </ScrollView>
  );

  const MyQuestionsRoute = () => (
    <ScrollView style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#5BADCE" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {!loading && !error && (
        <>
          {myQuestions.length > 0 ? (
            myQuestions.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate("ForumQuestionDetail", {
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
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text>No questions posted by you.</Text>
          )}
        </>
      )}
    </ScrollView>
  );

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
                  navigation.navigate("ForumQuestionDetail", {
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

  const UpvotedQuestionsRoute = () => (
    <ScrollView style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#5BADCE" />}
      {!loading && !error && (
        <>
          {upvotedQuestions.length > 0 ? (
            upvotedQuestions.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate("ForumQuestionDetail", {
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
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text>No upvoted questions.</Text>
          )}
        </>
      )}
    </ScrollView>
  );

  // TabView configuration
  const routes = [
    { key: "myQuizzes", title: `My Quizzes (${myQuizzes.length})` },
    {
      key: "myTakenQuizzes",
      title: `Taken Quizzes (${myTakenQuizzes.length})`,
    },
    { key: "myQuestions", title: `My Questions (${myQuestions.length})` },
    {
      key: "bookmarkedQuestions",
      title: `Bookmarked Questions (${bookmarkedQuestions.length})`,
    },
    {
      key: "upvotedQuestions",
      title: `Upvoted Questions (${upvotedQuestions.length})`,
    },
  ];

  const renderScene = SceneMap({
    myQuizzes: MyQuizzesRoute,
    myTakenQuizzes: MyTakenQuizzesRoute,
    myQuestions: MyQuestionsRoute,
    bookmarkedQuestions: BookmarkedQuestionsRoute,
    upvotedQuestions: UpvotedQuestionsRoute,
  });

  return (
    <View style={{ flex: 1 }}>
      <UserCard user={authState.user} />
      <TabView
        navigationState={{
          index: 0,
          routes: [
            { key: "myQuizzes", title: "My Quizzes" },
            { key: "myTakenQuizzes", title: "My Taken Quizzes" },
            { key: "myQuestions", title: "My Questions" },
            { key: "bookmarkedQuestions", title: "Bookmarked Questions" },
            { key: "upvotedQuestions", title: "Upvoted Questions" },
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

export default Profile;
