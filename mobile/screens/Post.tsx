import React, { useState } from "react";

import { View, Text, Image, ScrollView } from "react-native";
import { styles } from "../components/Styles";
import { Button } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../components/Types";
import { useTheme } from "../context/ThemeContext";

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
type PostScreenNavigationProp = StackNavigationProp<RootStackParamList, "Post">;

type Props = {
  route: PostScreenRouteProp;
  navigation: PostScreenNavigationProp;
};

function Post({ route, navigation }: Props) {
  const {
    title,
    content,
    imgsource,
    likes,
    authorNS,
    authorImg,
    authorUsername,
    bookmarked,
    isLiked,
  } = route.params.props;
  const theme = useTheme();
  const [isBookmarked, setBookmarked] = useState(bookmarked);
  const [isLikedPost, setLiked] = useState(isLiked);
  const [postLikes, setLikes] = useState(likes);
  const toggleBookmark = () => {
    setBookmarked(!isBookmarked);
  };
  //                    <TouchableOpacity onPress={likepost}> <View> <Text> {postLikes} <Icon source="heart" size={16}></Icon> </Text> </View> </TouchableOpacity>
  //                    <TouchableOpacity  onPress={toggleBookmark}> {isBookmarked ? <View> <Text> <Icon source="bookmark" size={16}></Icon>  </Text> </View> : <View> <Text> <Icon source="bookmark" size={16}></Icon> </Text> </View> } </TouchableOpacity>

  const likepost = () => {
    if (isLikedPost) {
      setLiked(false);
      setLikes(likes);
    } else {
      setLiked(true);
      setLikes(likes + 1);
    }
  };
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.border2}>
        <View style={styles.postUserDiv}>
          <Image style={styles.postUserImg} source={{ uri: authorImg }} />
          <View style={styles.postUserContent}>
            <Text> {authorNS} </Text>
            <Text style={{ color: "grey" }}> {authorUsername} </Text>
          </View>
        </View>

        <View style={styles.postTitle}>
          <Text style={styles.textTitle}> {title} </Text>
        </View>

        <View style={styles.postContent}>
          <Image style={styles.postContentImg2} source={{ uri: imgsource }} />
          <Text style={styles.postContentText}> {content} </Text>
        </View>

        <View style={styles.postBottom}>
          <View>
            <Button
              onPress={likepost}
              icon="heart"
              textColor={
                isLikedPost ? theme.colors.red[2] : theme.colors.neutral[7]
              }
            >
              {" "}
              {postLikes}{" "}
            </Button>
            {/* <Text>
              {" "}
              {likes} <Icon source="heart" size={16}></Icon>{" "}
            </Text> */}
          </View>
          <View>
            <Button
              onPress={toggleBookmark}
              icon="bookmark"
              textColor={
                isBookmarked ? theme.colors.orange[2] : theme.colors.neutral[7]
              }
            >
              {" "}
            </Button>

            {/* {bookmarked ? (
                <Icon source="bookmark" size={16}></Icon>
              ) : (
                <Icon source="bookmark" size={16}></Icon>
              )}*/}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Post;
