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
      likes: number;
      bookmarks: number;
      image_src: string;
    }>
  >([]);
  const [panic, setPanic] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [hatakodu, setHatakodu] = useState("");
  const [suggestions, setSuggestions] = useState<
    Array<{ qid: string; label_description: string }>
  >([]);
  const [loading, setLoading] = useState(false);

  const onChangeText = (query: string) => {
    setSearchQuery(query);
    fetchSuggestions(query);
  };

  const handleTagSuggestion =
    (item: { qid: string; label_description: string }) => () => {
      // this should be changed
      setSearchQuery(item.label_description.split(":")[0]);
      setSuggestions([]);
      onSearch(item.qid);
    };

  const fetchSuggestions = (query: string) => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
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
        console.error(error);
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
    post({
      data: {
        keyword: qid,
        category: dropdownValue,
      },
      endpoint: "search/",
    })
      .then((response) => {
        setSearchResults(response.results);
      })
      .catch((error) => {
        console.error(error);
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
                {item.label_description}
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
                navigation.navigate("Profiles", {
                  profileUserId: result.user_id,
                });
              }}
              likes={result.likes}
              bookmarks={result.bookmarks}
            />
          ))}
      </ScrollView>
    </View>
  );
}

export default Search;
