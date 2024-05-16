import React, { useEffect, useState } from "react";

import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../components/Styles";
import { Button, Dialog, Portal } from "react-native-paper";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../components/Types";
import { useTheme } from "../context/ThemeContext";
import { del, get, post } from "../components/StorageHandler";
import { useUser } from "../context/UserContext";

/*
type PostProps = {
    authorNS: string;
    authorImg: string;
    authorUsername: string;
    title: string;
    content: string;
    imgsource: string;
    likes: number;
    bookmarked: boolean;
    isLiked: boolean
};
*/

type PostScreenRouteProp = RouteProp<RootStackParamList, "Post">;
type PostScreenNavigationProp = NavigationProp<RootStackParamList, "Post">;

type Props = {
  route: PostScreenRouteProp;
  navigation: PostScreenNavigationProp;
};

function Post({ route, navigation }: Props) {
  const { post_id } = route.params;
  const theme = useTheme();
  const { user } = useUser();

  const [authorId, setAuthorId] = useState(-1); // [authorId, setAuthorId] = useState(0)
  const [authorUsername, setAuthorUsername] = useState("");
  const [authorFullName, setAuthorFullName] = useState("");
  const [authorImg, setAuthorImg] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [imgsource, setImgsource] = useState("");

  const [isBookmarked, setBookmarked] = useState(false);
  const [isLiked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [likedBy, setLikedBy] = useState([]);
  const [likesVisible, setLikesVisible] = useState(false);

  useEffect(() => {
    get({
      endpoint: `posts/${post_id}`,
      token: user?.token,
      data: {},
    })
      .then((response) => response.json())
      .then((data) => {
        setAuthorId(data.user_id);
        setAuthorUsername(data.username);
        setTitle(data.title);
        setContent(data.content);
        setTag(data.qtitle);
        setImgsource(data.image_src);
        setBookmarked(data.is_bookmarked);
        setBookmarkCount(data.bookmark_count);
        setLiked(data.is_liked);
        setLikeCount(data.like_count);
        setLikedBy(data.liked_by);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (authorId === -1) return;
    get({
      endpoint: `profiles/${authorId}`,
      token: user?.token,
      data: {},
    })
      .then((response) => response.json())
      .then((data) => {
        setAuthorFullName(data.full_name);
        setAuthorImg(data.profile_picture);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [authorId]);

  const bookmarkPost = () => {
    if (isBookmarked) {
      // unbookmark
    } else {
      // bookmark
    }
  };
  const likepost = () => {
    if (isLiked) {
      del({
        endpoint: `likes`,
        token: user?.token,
        data: {},
      })
        .then((response) => response.json())
        .then((data) => {
          setLiked(false);
          setLikeCount(likeCount - 1);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      post({
        endpoint: `likes`,
        token: user?.token,
        data: { post: `${post_id}` },
      })
        .then((response) => response.json())
        .then((data) => {
          setLiked(true);
          setLikeCount(likeCount + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const onSeeLikes = () => {
    setLikesVisible(!likesVisible);
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.border2}>
        <View style={styles.postUserDiv}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Profiles", {
                profileUserId: authorId,
              })
            }
          >
            <Image style={styles.postUserImg} source={{ uri: authorImg }} />
          </TouchableOpacity>
          <View style={styles.postUserContent}>
            <Text> {authorFullName} </Text>
            <Text style={{ color: "grey" }}> {authorUsername} </Text>
          </View>
        </View>

        <View style={styles.postTitle}>
          <Text style={styles.textTitle}> {title} </Text>
        </View>

        <View style={styles.postContent}>
          <Image style={styles.postContentImg2} source={{ uri: imgsource }} />
          <Text style={styles.postContentText}> {content} </Text>
          <Text style={styles.postContentText}>
            {" #"}
            {tag}{" "}
          </Text>
        </View>

        <View style={styles.postBottom}>
          <View>
            <Button
              onPress={likepost}
              icon="heart"
              textColor={
                isLiked ? theme.colors.red[2] : theme.colors.neutral[7]
              }
            >
              {" "}
              {likeCount}{" "}
            </Button>
          </View>
          <View>
            <Button onPress={onSeeLikes} textColor={theme.colors.neutral[7]}>
              See Likes
            </Button>
            <Portal>
              <Dialog visible={likesVisible} onDismiss={onSeeLikes}>
                <Dialog.Title>Likes</Dialog.Title>
                <Dialog.Content>
                  <Text>This is simple dialog</Text>
                </Dialog.Content>
              </Dialog>
            </Portal>
          </View>
          <View>
            <Button
              onPress={bookmarkPost}
              icon="bookmark"
              textColor={
                isBookmarked ? theme.colors.orange[2] : theme.colors.neutral[7]
              }
            >
              {" "}
              {bookmarkCount}{" "}
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Post;
