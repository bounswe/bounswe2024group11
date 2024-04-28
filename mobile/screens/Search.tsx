import React, { useState } from "react";

import { View, Text } from "react-native";

import SearchHeader from "../components/SearchHeader";
import { styles } from "../components/Styles";
import { getSearch } from "../components/StorageHandler";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const onChangeText = (query: string) => {
    setSearchQuery(query);
  };

  const onSearch = () => {
    getSearch({ query: searchQuery, endpoint: "user/search" })
      .then((results) => {
        setSearchResults(results);
      })
  }


  return (
    <View style={{ flex: 1 }}>
      <SearchHeader onChangeText={onChangeText} value={searchQuery} onSearch={onSearch} />
      <View style={styles.center}>
        <Text>{searchResults}</Text>
      </View>
    </View>
  );
}

export default Search;
