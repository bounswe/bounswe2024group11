import React, { useEffect, useState } from "react";

import { View, Text } from "react-native";

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

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    get({
      endpoint: "posts",
      token: user?.token,
      data: {},
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FeedHeader />
      <View style={{ flex: 1, flexDirection: "column", alignItems: "stretch" }}>
        {posts.map((post: any) => (
          <Post
            key={post.id}
            authorNS={post.authorNS}
            authorImg={post.authorImg}
            authorUsername={post.authorUsername}
            title={post.title}
            content={post.content}
            imgsource={post.imgsource}
            likes={post.likes}
            bookmarked={post.bookmarked}
            onClickFunction={() => {
              navigation.navigate("Post", { post_id: post.id });
            }}
          />
        ))}
      </View>
      {user && <CreatePostButton />}
      {user && <EditPostButton />}
    </View>
  );
}

export default Feed;
