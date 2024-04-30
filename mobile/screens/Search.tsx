import React, { useEffect, useState } from "react";

import { View, Text, ScrollView } from "react-native";

import Dropdown from "react-native-paper-dropdown";

import SearchHeader from "../components/SearchHeader";
import InfoBox from "../components/InfoBox";
import { styles } from "../components/Styles";
import { NotFoundError, getSearch } from "../components/StorageHandler";
import { useTheme } from "../context/ThemeContext";

const searchList = [
  { label: "born in", value: "born in" },
  { label: "from universe", value: "from universe" },
  { label: "from the comics", value: "from the comics" },
  { label: "has superpower", value: "has superpower" },
];

function Search() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(searchList[0].value);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [panic, setPanic] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const onChangeText = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    setPanic(false);
    setNoResults(false);
  }, [searchQuery]);

  const onSearch = (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);
    const query = dropdownValue
      ? `${dropdownValue} ${searchQuery}`
      : searchQuery;
    setSearchResults([]);
    getSearch({
      body: {
        keyword: query,
      },
      endpoint: "user/search/",
    })
      .then((response) => {
        setSearchResults(response.results);
      })
      .catch((error) => {
        if (error instanceof NotFoundError) {
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
      />
      <View style={styles.dropDownMenu}>
        <Dropdown
          label="Category"
          mode="outlined"
          value={dropdownValue}
          setValue={setDropdownValue}
          visible={dropdownVisible}
          showDropDown={() => setDropdownVisible(true)}
          onDismiss={() => setDropdownVisible(false)}
          list={searchList}
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
            <InfoBox key={index} info={result} />
          ))}
      </ScrollView>
    </View>
  );
}

export default Search;
