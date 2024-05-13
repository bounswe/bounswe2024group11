import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../components/Types";
import { styles } from "../components/Styles";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

import { useTheme } from "../context/ThemeContext";
import { ScrollView } from "react-native-gesture-handler";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { request } from "../components/StorageHandler";

type CreatePostNavigationProp = StackNavigationProp<RootStackParamList, "Post">;

const DEFAULT_SUGGESTIONS = [
  { qid: "1", label_description: "tag1" },
  { qid: "2", label_description: "tag2" },
  { qid: "3", label_description: "tag3" },
  { qid: "4", label_description: "tag4" },
  { qid: "5", label_description: "tag5" },
];

function CreatePost({ navigation }: { navigation: CreatePostNavigationProp }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [suggestions, setSuggestions] = useState<
    Array<{ qid: string; label_description: string }>
  >([]); // Array<{qid: string, label_description: string}>
  const [tag, setTag] = useState("");
  const [qid, setQid] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestLoading, setSuggestLoading] = useState(false);

  const theme = useTheme();

  const handleSubmit = () => {
    if (!qid) {
      console.log("Please select a tag using suggestions");
    }
    setLoading(true);
    request({
      method: "POST",
      endpoint: "api/v1/posts/create",
      body: {
        title,
        content,
        image,
        tag: qid,
      },
    })
      .then((response) => {
        console.log(response);
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleTagSuggestion =
    (tag: { qid: string; label_description: string }) => () => {
      setQid(tag.qid);
      setTag(tag.label_description);
    };

  const handleTagChange = (tag: string) => {
    setTag(tag);
    setQid("");
    setSuggestLoading(true);
    fetchSuggestions();
  };

  const fetchSuggestions = () => {
    if (tag.length > 0) {
      request({
        method: "GET",
        endpoint: "api/v1/users/fetch-suggestions",
        body: { keyword: tag },
      })
        .then((response) => {
          setSuggestions(response.results);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setSuggestLoading(false);
        });
    }
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
        {suggestions.length > 0 && (
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
                  {item.label_description}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item.qid}
            scrollEnabled={false}
          />
        )}
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
