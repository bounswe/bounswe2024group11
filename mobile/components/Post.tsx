import React from "react";

import { View, Text, Image } from "react-native";
import { styles } from "./Styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-paper";

type PostProps = {
  authorNS: string;
  authorImg: string;
  authorUsername: string;
  title: string;
  content: string;
  imgsource: string;
  likes: number;
  bookmarked: boolean;
  onClickFunction: () => void;
};

function Post(props: PostProps) {
  const {
    title,
    content,
    imgsource,
    likes,
    authorNS,
    authorImg,
    authorUsername,
    bookmarked,
    onClickFunction,
  } = props;

  return (
    <TouchableOpacity onPress={onClickFunction} style={styles.border}>
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
        <Image style={styles.postContentImg} source={{ uri: imgsource }} />
        <Text style={styles.postContentText}> {content.substring(0, 20)} </Text>
      </View>

      <View style={styles.postBottom}>
        <View>
          <Text>
            {" "}
            {likes} <Icon source="heart" size={16}></Icon>{" "}
          </Text>
        </View>
        <View>
          <Text>
            {" "}
            <Icon source="bookmark" size={16}></Icon>{" "}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Post;
