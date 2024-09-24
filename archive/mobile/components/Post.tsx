import React, { useEffect, useState } from "react";

import { View, Text, Image } from "react-native";
import { styles } from "./Styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-paper";
import { get } from "./StorageHandler";
import { useUser } from "../context/UserContext";

type PostProps = {
  author_id: number;
  title: string;
  content: string;
  imgsource: string;
  qtitle: string;
  likes: number;
  bookmarks: number;
  onClickFunction: () => void;
};

function Post(props: PostProps) {
  const {
    author_id,
    title,
    content,
    imgsource,
    qtitle,
    likes,
    bookmarks,
    onClickFunction,
  } = props;

  const { user } = useUser();

  const [authorNS, setAuthorNS] = useState();
  const [authorImg, setAuthorImg] = useState();
  const [authorUsername, setAuthorUsername] = useState();

  useEffect(() => {
    console.log(imgsource);
    console.log("Fetching author info", author_id);
    get({
      endpoint: `profiles/${author_id}`,
      token: user?.token,
      data: {},
    })
      .then((data) => {
        console.log(data);
        setAuthorImg(data.picture);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log("Fetching author user info", author_id);
    get({
      endpoint: `users/${author_id}`,
      token: user?.token,
      data: {},
    })
      .then((data) => {
        console.log(data);
        setAuthorNS(data.fullname);
        setAuthorUsername(data.username);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [authorImg]);

  return (
    <TouchableOpacity onPress={onClickFunction} style={styles.border}>
      <View style={styles.postUserDiv}>
        <Image style={styles.postUserImg} source={{ uri: authorImg }} />
        <View style={styles.postUserContent}>
          <Text> {` ${authorNS}`} </Text>
          <Text style={{ color: "grey" }}> {` @${authorUsername}`} </Text>
        </View>
      </View>

      <View style={styles.postTitle}>
        <Text style={styles.textTitle}> {title} </Text>
      </View>

      <View style={styles.postContent}>
        {imgsource === "" ? null : (
          <Image style={styles.postContentImg} source={{ uri: imgsource }} />
        )}
        <Text style={styles.postContentText}> {content.substring(0, 20)} </Text>
        <Text style={styles.postContentText}> {" #" + qtitle} </Text>
      </View>

      <View style={styles.postBottom}>
        <View>
          <Text>
            <Icon source="heart" size={16}></Icon>
            {`  ${likes} `}
          </Text>
        </View>
        <View>
          <Text>
            <Icon source="bookmark" size={16}></Icon>
            {`  ${bookmarks} `}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Post;
