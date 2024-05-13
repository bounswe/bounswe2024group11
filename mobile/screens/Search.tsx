import React, { useEffect, useState } from "react";

import { View, Text, ScrollView, FlatList } from "react-native";

import Dropdown from "react-native-paper-dropdown";

import SearchHeader from "../components/SearchHeader";
import InfoBox from "../components/InfoBox";
import { styles } from "../components/Styles";
import { BadRequestError, post, get } from "../components/StorageHandler";
import { useTheme } from "../context/ThemeContext";

const categoryList = [
  { label: "born in", value: "born in" },
  { label: "from universe", value: "from universe" },
  { label: "from the comics", value: "from the comics" },
  { label: "has superpower", value: "has superpower" },
];

function Search() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(categoryList[0].value);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [panic, setPanic] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [hatakodu, setHatakodu] = useState("");
  const [suggestions, setSuggestions] = useState<
    Array<{ qid: string; label_description: string }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [qid, setQid] = useState("");

  const onChangeText = (query: string) => {
    setSearchQuery(query);
    setQid("");
    fetchSuggestions();
  };

  const handleTagSuggestion =
    (item: { qid: string; label_description: string }) => () => {
      setSearchQuery(item.label_description);
      setQid(item.qid);
    };

  const fetchSuggestions = () => {
    if (searchQuery.trim().length === 0) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    get({
      endpoint: "api/v1/users/wikidata-suggestions",
      data: {
        keyword: searchQuery.trim(),
      },
    })
      .then((response) => {
        setSuggestions(response.results);
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

  const onSearch = () => {
    setLoading(true);
    setSearchResults([]);
    post({
      data: {
        keyword: searchQuery.trim(),
        category: qid,
      },
      endpoint: "user/search/",
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
        onSearch={onSearch}
        loading={loading}
      />
      {suggestions.length > 0 && (
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
      )}
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
          Something went wrong {hatakodu}
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
            <InfoBox key={index} info={result} />
          ))}
      </ScrollView>
    </View>
  );
}

export default Search;
