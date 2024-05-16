import React, { useState } from "react";
import { View, Text } from "react-native";

import { NavigationProp, RouteProp } from "@react-navigation/native";

import { RootStackParamList } from "../components/Types";
import { styles } from "../components/Styles";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

import { useTheme } from "../context/ThemeContext";
import { ScrollView } from "react-native-gesture-handler";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { post, get } from "../components/StorageHandler";

type EditPostScreenRouteProp = RouteProp<RootStackParamList, "EditPost">;
type EditPostNavigationProp = NavigationProp<RootStackParamList, "EditPost">;

type Props = {
  route: EditPostScreenRouteProp;
  navigation: EditPostNavigationProp;
};

// type EditPostNavigationProp = NavigationProp<
//   RootStackParamList,
//   "EditPost"
// >;

function EditPost({ route, navigation }: Props) {
  
  const {
    postId, 
  } = route.params;
  const [postIdCurrent, setPostId] = useState(postId);
  const [titleNew, setTitle] = useState("");
  const [contentNew, setContent] = useState("");
  const [imageNew, setImage] = useState("");
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
    post({
      endpoint: `posts/${postId}`,
      data: {
        titleNew,
        contentNew,
        imageNew,
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
    (item: { qid: string; label_description: string }) => () => {
      setQid(item.qid);
      // this should be changed
      setTag(item.label_description.split(":")[0]);
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
      endpoint: "users/wikidata-suggestions",
      data: { keyword: tag.trim() },
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
          placeholder="Update the title..."
          value={titleNew}
          setValue={setTitle}
          secure={false}
          image="text"
        />
        <View style={{ height: 200 }}>
          <CustomInput
            placeholder="Update the description..."
            value={contentNew}
            setValue={setContent}
            secure={false}
            image="head"
            multiline={true}
          />
        </View>
        <CustomInput
          placeholder="Update the image..."
          value={imageNew}
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
                {item.label_description}
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
          text="Edit Post"
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

export default EditPost;
