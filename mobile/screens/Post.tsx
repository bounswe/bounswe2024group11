import React, { useEffect, useState } from "react";

import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "../components/Styles";
import { Button, Dialog, Portal } from "react-native-paper";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../components/Types";
import { useTheme } from "../context/ThemeContext";
import { del, get, post } from "../components/StorageHandler";
import { useUser } from "../context/UserContext";
import InfoBox from "../components/InfoBox";
import CustomButton from "../components/CustomButton";

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

  const [authorId, setAuthorId] = useState(""); // [authorId, setAuthorId] = useState(0)
  const [authorUsername, setAuthorUsername] = useState("");
  const [authorFullName, setAuthorFullName] = useState("");
  const [authorImg, setAuthorImg] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [imgsource, setImgsource] = useState("");
  const [qid, setQid] = useState("");
  const [isBookmarked, setBookmarked] = useState(false);
  const [isLiked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [likedBy, setLikedBy] = useState([]);
  const [likesVisible, setLikesVisible] = useState(false);

  useEffect(() => {
    console.log("Fetching post info", post_id);
    get({
      endpoint: `posts/${post_id}`,
      token: user?.token,
      data: {},
    })
      .then((data) => {
        console.log(data);
        setAuthorId(data.author);
        setAuthorUsername(data.username);
        setTitle(data.title);
        setContent(data.content);
        setQid(data.qid);
        setTag(data.qtitle);
        setImgsource(data.image_src);
        setBookmarked(data.is_bookmarked);
        setBookmarkCount(data.bookmark_count);
        setLiked(data.is_liked);
        setLikeCount(data.like_count);
        if (data.liked_by) setLikedBy(data.liked_by);
        setAuthorFullName(data.author_profile.fullname);
        setAuthorImg(data.author_profile.picture);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   if (authorId === -1) return;
  //   get({
  //     endpoint: `profiles/${authorId}`,
  //     token: user?.token,
  //     data: {},
  //   })
  //     .then((data) => {
  //       setAuthorFullName(data.full_name);
  //       setAuthorImg(data.profile_picture);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [authorId]);

  const bookmarkPost = () => {
    if (isBookmarked) {
      // unbookmark
    } else {
      post({
        endpoint: `bookmarks/`,
        token: user?.token,
        data: { post: post_id },
      })
        .then((data) => {
          setBookmarked(true);
          setBookmarkCount(bookmarkCount + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const likepost = () => {
    if (isLiked) {
    } else {
      post({
        endpoint: `likes/`,
        token: user?.token,
        data: { post: post_id },
      })
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
                profileUserId: Number(authorId),
              })
            }
          >
            {authorImg === "" ? null : (
              <Image style={styles.postUserImg} source={{ uri: authorImg }} />
            )}
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
          {imgsource === "" ? null : (
            <Image style={styles.postContentImg} source={{ uri: imgsource }} />
          )}
          <Text style={styles.postContentText}> {content} </Text>
          {tag === "" ? null : (
            <Text style={styles.postContentText}>{" #" + tag}</Text>
          )}
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
                  {likedBy.map((like, index) => (
                    <View key={index}>
                      <Text>{like}</Text>
                    </View>
                  ))}
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
        <View>{!qid || qid === "" ? null : <InfoBox qid={qid} />}</View>
        {user && user.user.username === authorUsername && (
          <View>
            <CustomButton
              text="Edit Post"
              textColor={theme.colors.neutral[2]}
              bgColor={theme.colors.neutral[9]}
              onPress={() =>
                navigation.navigate("EditPost", {
                  postId: post_id,
                })
              }
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default Post;
