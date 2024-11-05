import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const ForumLeaderboard = () => {
  const forumData = [
    { id: "1", name: "Alice", score: 150 },
    { id: "2", name: "Bob", score: 140 },
    { id: "3", name: "Charlie", score: 135 },
    { id: "4", name: "Diana", score: 130 },
    { id: "5", name: "Edward", score: 125 },
    { id: "6", name: "Fiona", score: 120 },
    { id: "7", name: "George", score: 115 },
    { id: "8", name: "Helen", score: 110 },
    { id: "9", name: "Ian", score: 105 },
    { id: "10", name: "Jane", score: 100 },
  ];

  const renderItem = ({
    item,
    index,
  }: {
    item: { id: string; name: string; score: number };
    index: number;
  }) => (
    <View style={styles.row}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Text style={styles.name}>
        {item.name}
        {index === 0 && " 🥇"}
        {index === 1 && " 🥈"}
        {index === 2 && " 🥉"}
      </Text>
      <Text style={styles.score}>{item.score}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Rank</Text>
        <Text style={styles.headerText}>User</Text>
        <Text style={styles.headerText}>Points</Text>
      </View>
      <FlatList
        data={forumData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const QuizLeaderboard = () => {
  const quizData = [
    { id: "1", name: "Kevin", score: 210 },
    { id: "2", name: "Lily", score: 200 },
    { id: "3", name: "Mike", score: 190 },
    { id: "4", name: "Nina", score: 180 },
    { id: "5", name: "Oscar", score: 170 },
    { id: "6", name: "Paula", score: 160 },
    { id: "7", name: "Quinn", score: 150 },
    { id: "8", name: "Rose", score: 140 },
    { id: "9", name: "Sam", score: 130 },
    { id: "10", name: "Tina", score: 120 },
  ];

  const renderItem = ({
    item,
    index,
  }: {
    item: { id: string; name: string; score: number };
    index: number;
  }) => (
    <View style={styles.row}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Text style={styles.name}>
        {item.name}
        {index === 0 && " 🥇"}
        {index === 1 && " 🥈"}
        {index === 2 && " 🥉"}
      </Text>
      <Text style={styles.score}>{item.score}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Rank</Text>
        <Text style={styles.headerText}>User</Text>
        <Text style={styles.headerText}>Points</Text>
      </View>
      <FlatList
        data={quizData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default function Leaderboard() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "forum", title: "Forum" },
    { key: "quiz", title: "Quiz" },
  ]);

  const renderScene = SceneMap({
    forum: ForumLeaderboard,
    quiz: QuizLeaderboard,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get("window").width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
          labelStyle={styles.tabLabel}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rank: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
  },
  name: {
    flex: 2,
    textAlign: "center",
    fontSize: 16,
  },
  score: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  tabBar: {
    backgroundColor: "#2196f3",
  },
  tabLabel: {
    fontWeight: "bold",
  },
  indicator: {
    backgroundColor: "#fff",
  },
});
