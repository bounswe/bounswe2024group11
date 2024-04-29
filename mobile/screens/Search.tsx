import React, { useState } from "react";

import { View, Text } from "react-native";

import Dropdown from "react-native-paper-dropdown";

import SearchHeader from "../components/SearchHeader";
import { styles } from "../components/Styles";
import { getSearch } from "../components/StorageHandler";
import { useTheme } from "../context/ThemeContext";

function Search() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const onChangeText = (query: string) => {
    setSearchQuery(query);
  };

  const onSearch = (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);
    getSearch({ query: searchQuery, endpoint: "user/search" })
      .then((results) => {
        setSearchResults(results);
      })
      .catch((error) => {
        console.error(error);
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
          list={[
            { label: "Category 1", value: "category1" },
            { label: "Category 2", value: "category2" },
            { label: "Category 3", value: "category3" },
          ]}
          dropDownContainerMaxHeight={240}
          dropDownItemSelectedTextStyle={{ color: theme.colors.cyan[3] }}
        />
      </View>
      <View style={styles.searchResultsContainer}>
        <Text>{searchResults}</Text>
      </View>
    </View>
  );
}

export default Search;
