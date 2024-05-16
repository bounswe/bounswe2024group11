import React, { useEffect, useState } from "react";

import { View, Text, ScrollView } from "react-native";

import { NavigationProp } from "@react-navigation/native";

import FeedHeader from "../components/FeedHeader";
import CreatePostButton from "../components/CreatePostButton";
import Post from "../components/Post";
import { RootStackParamList } from "../components/Types";
import { useUser } from "../context/UserContext";

import { get } from "../components/StorageHandler";
import EditPostButton from "../components/EditPostButton";

type FeedNavigationProp = NavigationProp<RootStackParamList, "Feed">;

function Feed({ navigation }: { navigation: FeedNavigationProp }) {
  const { user, setUser } = useUser();

  const [posts, setPosts] = useState<
    Array<{
      id: number;
      user_id: number;
      title: string;
      content: string;
      qtitle: string;
      imgsource: string;
      likes: number;
      bookmarks: number;
      onClickFunction: () => void;
    }>
  >([]);

  useEffect(() => {
    console.log("Fetching feed");
    get({
      endpoint: "posts/",
      token: user?.token,
      data: {},
    })
      .then((data) => {
        setPosts(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user, navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FeedHeader />
      <ScrollView style={{ flex: 1, flexDirection: "column" }}>
        {posts.map((post) => (
          <Post
            key={post.id}
            author_id={post.user_id}
            title={post.title}
            content={post.content}
            qtitle={post.qtitle}
            imgsource={post.imgsource}
            likes={post.likes}
            bookmarks={post.bookmarks}
            onClickFunction={() => {
              navigation.navigate("Post", { post_id: post.id });
            }}
          />
        ))}
      </ScrollView>
      {user && <CreatePostButton />}
    </View>
  );
}

export default Feed;
