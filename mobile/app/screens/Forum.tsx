import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

interface Tag {
  id: string;
  name: string;
  description: string;
}

interface Author {
  full_name: string;
  username: string;
  avatar: string;
}

interface Question {
  id: string;
  title: string;
  body: string;
  tags: Tag[];
  author: Author;
  created_at: string;
  answers_count: number;
  is_bookmarked: boolean;
  is_upvoted: boolean;
  upvotes_count: number;
  is_downvoted: boolean;
  downvotes_count: number;
}

const API_URL = "http://10.0.2.2:3000/forum-feed";

export const Forum: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const result = await axios.get(`${API_URL}`);
        console.log(result.data.questions);
        setQuestions(result.data.questions);
      } catch (error) {
        console.error("Error fetching questions", error);
      }
    };
    fetchQuestions();
  }, []);

  const handleCreateQuestion = () => {
    (navigation as any).navigate("CreateQuestion"); // not sure about this solution
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ borderRadius: 10, marginBottom: 10, padding: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Image
                source={{ uri: item.author.avatar }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginRight: 10,
                }}
              />
              <View>
                <Text style={{ fontWeight: "bold" }}>
                  {item.author.full_name}
                </Text>
                <Text style={{ color: "grey" }}>@{item.author.username}</Text>
              </View>
            </View>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              {item.title}
            </Text>
            <Text style={{ color: "grey", marginBottom: 10 }}>{item.body}</Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 10,
              }}
            >
              {item.tags.map((tag) => (
                <Text
                  key={tag.id}
                  style={{
                    backgroundColor: "#f0f0f0",
                    padding: 5,
                    borderRadius: 5,
                    marginRight: 5,
                    marginBottom: 5,
                  }}
                >
                  #{tag.name}
                </Text>
              ))}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon
                  name={item.is_upvoted ? "thumb-up" : "thumb-up-outline"}
                  color={item.is_upvoted ? "blue" : "grey"}
                  size={24}
                  onPress={() => {
                    /* Handle upvote logic */
                  }}
                />
                <Text style={{ marginLeft: 5 }}>{item.upvotes_count}</Text>
                <Icon
                  name={item.is_downvoted ? "thumb-down" : "thumb-down-outline"}
                  color={item.is_downvoted ? "red" : "grey"}
                  size={24}
                  style={{ marginLeft: 20 }}
                  onPress={() => {
                    /* Handle downvote logic */
                  }}
                />
                <Text style={{ marginLeft: 5 }}>{item.downvotes_count}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon
                  name={item.is_bookmarked ? "bookmark" : "bookmark-outline"}
                  color={item.is_bookmarked ? "gold" : "grey"}
                  size={24}
                  onPress={() => {
                    /* Handle bookmark logic */
                  }}
                />
                <Text style={{ marginLeft: 10 }}>
                  {item.answers_count} Answers
                </Text>
              </View>
            </View>
            <Button
              mode="outlined"
              onPress={() => {
                /* Handle answer navigation */
              }}
            >
              Answer
            </Button>
          </Card>
        )}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleCreateQuestion}
      >
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
});
