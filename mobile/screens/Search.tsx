import React, { useEffect, useState } from "react";

import { View, Text, ScrollView, FlatList } from "react-native";

import Dropdown from "react-native-paper-dropdown";

import SearchHeader from "../components/SearchHeader";
import InfoBox from "../components/InfoBox";
import { styles } from "../components/Styles";
import { BadRequestError, post, get } from "../components/StorageHandler";
import { useTheme } from "../context/ThemeContext";
import Post from "../components/Post";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../components/Types";

const categoryList = [
  { label: "born in", value: "born in" },
  { label: "enemy of", value: "enemy of" },
  { label: "occupation", value: "occupation" },
  { label: "present in", value: "present in" },
  { label: "educated at", value: "educated at" },
  { label: "member of", value: "member of" },
];

function Search({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList, "Search">;
}) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(categoryList[0].value);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    Array<{
      id: number;
      username: string;
      user_id: number;
      title: string;
      content: string;
      qid: string;
      qtitle: string;
      like_count: number;
      bookmark_count: number;
      image_src: string;
    }>
  >([]);
  const [panic, setPanic] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [hatakodu, setHatakodu] = useState("");
  const [suggestions, setSuggestions] = useState<
    Array<{ qid: string; label: string; description: string }>
  >([]);
  const [loading, setLoading] = useState(false);

  const onChangeText = (query: string) => {
    setSearchQuery(query);
    fetchSuggestions(query);
  };

  const handleTagSuggestion =
    (item: { qid: string; label: string; description: string }) => () => {
      // this should be changed
      setSearchQuery(item.label);
      setSuggestions([]);
      onSearch(item.qid);
    };

  const fetchSuggestions = (query: string) => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    console.log("fetching suggestions");
    get({
      endpoint: "suggestions",
      data: {
        keyword: query.trim(),
      },
    })
      .then((data) => {
        setSuggestions([...data]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setPanic(false);
    setNoResults(false);
  }, [searchQuery]);

  const onSearch = (qid: string) => {
    setLoading(true);
    setSearchResults([]);
    console.log("searching");
    get({
      data: {
        qid,
        category: dropdownValue,
      },
      endpoint: "search/",
    })
      .then((response) => {
        console.log(response);
        setSearchResults(response);
      })
      .catch((error) => {
        console.log(error);
        setHatakodu(error);
        if (error instanceof BadRequestError) {
          setNoResults(true);
        } else {
          setPanic(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <SearchHeader
        onChangeText={onChangeText}
        value={searchQuery}
        loading={loading}
      />

      <View style={styles.searchSuggestionsContainer}>
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
                {item.label + " : " + item.description}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.qid}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.dropDownMenu}>
        <Dropdown
          label="Category"
          mode="outlined"
          value={dropdownValue}
          setValue={setDropdownValue}
          visible={dropdownVisible}
          showDropDown={() => setDropdownVisible(true)}
          onDismiss={() => setDropdownVisible(false)}
          list={categoryList}
          dropDownContainerMaxHeight={240}
          dropDownItemSelectedTextStyle={{ color: theme.colors.cyan[3] }}
        />
      </View>
      {panic && (
        <Text
          style={[
            styles.error,
            {
              color: theme.colors.red[4],
            },
          ]}
        >
          Something went wrong
        </Text>
      )}
      {noResults && (
        <Text
          style={[
            styles.error,
            {
              color: theme.colors.red[4],
            },
          ]}
        >
          No results found
        </Text>
      )}
      <ScrollView style={styles.searchResultsContainer}>
        {searchResults.length != 0 &&
          searchResults.map((result, index) => (
            <Post
              key={index}
              title={result.title}
              content={result.content}
              author_id={result.user_id}
              imgsource={result.image_src}
              qtitle={result.qtitle}
              onClickFunction={() => {
                navigation.navigate("Post", {
                  post_id: result.id,
                });
              }}
              likes={result.like_count}
              bookmarks={result.bookmark_count}
            />
          ))}
      </ScrollView>
    </View>
  );
}

export default Search;
