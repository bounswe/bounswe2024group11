import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

const forumLeaderboardData = [
  {
    id: "1",
    rank: 1,
    fullName: "Selin Demir",
    username: "demir_sel2021",
    avatar: "https://randomuser.me/api/portraits/women/16.jpg",
    points: 523,
  },
  {
    id: "2",
    rank: 2,
    fullName: "Cahit Ünlü",
    username: "unlu_cahit15",
    avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    points: 487,
  },
  {
    id: "3",
    rank: 3,
    fullName: "Ayşe Kılıç",
    username: "kilic_ayse",
    avatar: "https://randomuser.me/api/portraits/women/24.jpg",
    points: 452,
  },
  {
    id: "4",
    rank: 4,
    fullName: "Mehmet Yılmaz",
    username: "yilmaz_mehmet",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    points: 431,
  },
  {
    id: "5",
    rank: 5,
    fullName: "Ebru Şahin",
    username: "sahin_ebru",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    points: 418,
  },
  {
    id: "6",
    rank: 6,
    fullName: "Okan Aksoy",
    username: "aksoy_okan",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
    points: 397,
  },
  {
    id: "7",
    rank: 7,
    fullName: "Buse Çetin",
    username: "cetin_buse",
    avatar: "https://randomuser.me/api/portraits/women/61.jpg",
    points: 389,
  },
  {
    id: "8",
    rank: 8,
    fullName: "Mert Demirtaş",
    username: "mert_demir",
    avatar: "https://randomuser.me/api/portraits/men/28.jpg",
    points: 376,
  },
  {
    id: "9",
    rank: 9,
    fullName: "Gizem Akçay",
    username: "akcay_gizem",
    avatar: "https://randomuser.me/api/portraits/women/72.jpg",
    points: 365,
  },
  {
    id: "10",
    rank: 10,
    fullName: "Kerem Yıldız",
    username: "keremyildiz",
    avatar: "https://randomuser.me/api/portraits/men/81.jpg",
    points: 350,
  },
];

const quizLeaderboardData = [
  {
    id: "1",
    rank: 1,
    fullName: "Salih Karakurt",
    username: "cute_mittens",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    points: 1052,
  },
  {
    id: "2",
    rank: 2,
    fullName: "Aykut Taşaltın",
    username: "kut_ay",
    avatar: "https://randomuser.me/api/portraits/men/57.jpg",
    points: 987,
  },
  {
    id: "3",
    rank: 3,
    fullName: "Seda Güçlü",
    username: "gcl_seda",
    avatar: "https://randomuser.me/api/portraits/women/25.jpg",
    points: 943,
  },
  {
    id: "4",
    rank: 4,
    fullName: "Emine Uysal",
    username: "emine_uysal",
    avatar: "https://randomuser.me/api/portraits/women/37.jpg",
    points: 919,
  },
  {
    id: "5",
    rank: 5,
    fullName: "Burak Koca",
    username: "koca_burak",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    points: 902,
  },
  {
    id: "6",
    rank: 6,
    fullName: "Gül Yılmaz",
    username: "yilmazgul",
    avatar: "https://randomuser.me/api/portraits/women/53.jpg",
    points: 873,
  },
  {
    id: "7",
    rank: 7,
    fullName: "Erhan Kaya",
    username: "erhan_k",
    avatar: "https://randomuser.me/api/portraits/men/63.jpg",
    points: 864,
  },
  {
    id: "8",
    rank: 8,
    fullName: "Selma Altın",
    username: "altinsel",
    avatar: "https://randomuser.me/api/portraits/women/85.jpg",
    points: 852,
  },
  {
    id: "9",
    rank: 9,
    fullName: "Can Bayraktar",
    username: "bayrakcan",
    avatar: "https://randomuser.me/api/portraits/men/91.jpg",
    points: 831,
  },
  {
    id: "10",
    rank: 10,
    fullName: "Ayşe Demir",
    username: "demirayse",
    avatar: "https://randomuser.me/api/portraits/women/95.jpg",
    points: 819,
  },
];

const LeaderboardItem = ({ item }: { item: any }) => (
  <View style={styles.row}>
    <Text style={styles.rank}>{item.rank}</Text>
    <Image source={{ uri: item.avatar }} style={styles.avatar} />
    <View style={styles.userInfo}>
      <Text style={styles.fullName}>
        {item.fullName}{" "}
        {item.rank === 1 && <Text style={styles.medal}>🥇</Text>}
        {item.rank === 2 && <Text style={styles.medal}>🥈</Text>}
        {item.rank === 3 && <Text style={styles.medal}>🥉</Text>}
      </Text>
      <Text style={styles.username}>@{item.username}</Text>
    </View>
    <Text style={styles.points}>{item.points}</Text>
  </View>
);

const ForumLeaderboard = () => (
  <FlatList
    data={forumLeaderboardData}
    renderItem={LeaderboardItem}
    keyExtractor={(item) => item.id}
    ListHeaderComponent={
      <View style={styles.headerRow}>
        <Text style={styles.headerRank}>Rank</Text>
        <Text style={styles.headerUser}>User</Text>
        <Text style={styles.headerPoints}>Turq Points</Text>
      </View>
    }
  />
);

const QuizLeaderboard = () => (
  <FlatList
    data={quizLeaderboardData}
    renderItem={LeaderboardItem}
    keyExtractor={(item) => item.id}
    ListHeaderComponent={
      <View style={styles.headerRow}>
        <Text style={styles.headerRank}>Rank</Text>
        <Text style={styles.headerUser}>User</Text>
        <Text style={styles.headerPoints}>Turq Points</Text>
      </View>
    }
  />
);

const renderScene = SceneMap({
  forum: ForumLeaderboard,
  quiz: QuizLeaderboard,
});

const Leaderboard = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "forum", title: "Forum" },
    { key: "quiz", title: "Quiz" },
  ]);

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
          style={[styles.tabBar]}
          renderLabel={({ route, focused }) => (
            <View
              style={[
                styles.tabLabelContainer,
                { backgroundColor: focused ? "#21697c" : "#e8e8e8" },
              ]}
            >
              <Text
                style={[
                  styles.tabLabel,
                  { color: focused ? "#fff" : "#000" }, // Text color based on focus
                ]}
              >
                {route.title}
              </Text>
            </View>
          )}
        />
      )}
    />
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#e6e9ef",
  },
  headerRank: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 0.4,
    textAlign: "center",
    color: "#333",
  },
  headerUser: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    textAlign: "left",
    color: "#333",
    marginLeft: 4,
  },
  headerPoints: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    textAlign: "right",
    color: "#333",
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  rank: {
    width: 60, // Adjust width to give some space
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    fontWeight: "bold",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  userInfo: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 5,
  },
  fullName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left", // Align text to the left
  },
  username: {
    fontSize: 12,
    color: "#888",
    textAlign: "left", // Align text to the left
  },
  points: {
    width: 80,
    textAlign: "right", // Align text to the right
    fontSize: 16,
    fontWeight: "bold",
    color: "#4d4d4d",
    marginRight: 10,
  },
  medal: {
    fontSize: 18,
    paddingHorizontal: 8,
  },
  tabBar: {
    backgroundColor: "#f9f9f9",
  },
  tabLabelContainer: {
    width: 200,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center", // Center the text
    borderRadius: 20, // Optional: rounded corners for the background
  },
  tabLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  indicator: {
    backgroundColor: "#ffffff",
    height: 3,
  },
});
