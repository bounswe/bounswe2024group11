import React, { useState } from "react";
import { View, Text } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../components/Types";
import { styles } from "../components/Styles";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

import { useTheme } from "../context/ThemeContext";
import { ScrollView } from "react-native-gesture-handler";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { post, get } from "../components/StorageHandler";
import { useUser } from "../context/UserContext";

type CreatePostNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CreatePost"
>;

function CreatePost({ navigation }: { navigation: CreatePostNavigationProp }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [suggestions, setSuggestions] = useState<
    Array<{ qid: string; label: string; description: string }>
  >([]); // Array<{qid: string, label_description: string}>
  const [tag, setTag] = useState("");
  const [qid, setQid] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestLoading, setSuggestLoading] = useState(false);

  const theme = useTheme();
  const { user } = useUser();

  const handleSubmit = () => {
    if (!qid) {
      console.log("Please select a tag using suggestions");
    }
    setLoading(true);
    console.log("Create post");
    post({
      endpoint: "posts/",
      data: {
        title,
        content,
        image_src: image,
        qid,
        qtitle: tag,
      },
      token: user?.token,
    })
      .then((response) => {
        console.log(response);
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleTagSuggestion =
    (item: { qid: string; label: string; description: string }) => () => {
      setQid(item.qid);
      // this should be changed
      setTag(item.label);
      setSuggestions([]);
    };

  const handleTagChange = (tag: string) => {
    setTag(tag);
    setQid("");
    fetchSuggestions(tag);
  };

  const fetchSuggestions = (tag: string) => {
    if (tag.trim().length === 0) {
      setSuggestions([]);
      return;
    }
    setSuggestLoading(true);
    get({
      endpoint: "suggestions/",
      data: { keyword: tag.trim() },
      token: user?.token,
    })
      .then((data) => {
        setSuggestions([...data]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSuggestLoading(false);
      });
  };

  return (
    <ScrollView style={styles.createPostWrapper}>
      <View style={styles.createPostContainer}>
        <CustomInput
          placeholder="Give a title to your post..."
          value={title}
          setValue={setTitle}
          secure={false}
          image="text"
        />
        <View style={{ height: 200 }}>
          <CustomInput
            placeholder="What do you want to say?..."
            value={content}
            setValue={setContent}
            secure={false}
            image="head"
            multiline={true}
          />
        </View>
        <CustomInput
          placeholder="Add an image..."
          value={image}
          setValue={setImage}
          secure={false}
          image="camera"
        />
        <CustomInput
          placeholder="Add a tag..."
          value={tag}
          setValue={handleTagChange}
          secure={false}
          image="tag"
        />
        <FlatList
          data={suggestions}
          renderItem={({ item }) => (
            <View
              style={[
                styles.suggestionItem,
                {
                  backgroundColor: theme.colors.neutral[1],
                },
              ]}
            >
              <Text
                onPress={handleTagSuggestion(item)}
                style={{ color: theme.colors.neutral[7] }}
              >
                {item.label + ": " + item.description}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.qid}
          scrollEnabled={false}
        />

        <ActivityIndicator
          style={{ marginVertical: 8 }}
          animating={suggestLoading}
          color={theme.colors.cyan[3]}
          size="small"
        />
        <CustomButton
          text="Create Post"
          onPress={handleSubmit}
          bgColor={theme.colors.neutral[9]}
          textColor={theme.colors.neutral[0]}
        />
        <ActivityIndicator
          style={{ marginTop: 24 }}
          animating={loading}
          color={theme.colors.cyan[3]}
          size="large"
        />
      </View>
    </ScrollView>
  );
}

export default CreatePost;
