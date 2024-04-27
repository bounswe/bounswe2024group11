import React, { useState } from "react";

import { Appbar, Searchbar } from "react-native-paper";

import { styles } from "./Styles";

const SearchHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    // search for content
    console.log("Searching for content...");
    console.log(query);
  };

  return (
    <Appbar.Header style={styles.appBar}>
      <Appbar.Content
        title={
          <Searchbar
            placeholder="Search for content..."
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBar}
          />
        }
      />
    </Appbar.Header>
  );
};

export default SearchHeader;
