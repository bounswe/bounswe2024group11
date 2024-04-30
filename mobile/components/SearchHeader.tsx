import React, { useState } from "react";

import { View } from "react-native";
import { Appbar, IconButton, Searchbar } from "react-native-paper";

import { styles } from "./Styles";
import { getSearch } from "./StorageHandler";

const SearchHeader = (props: {
  onChangeText: (query: string) => void;
  value: string;
  onSearch: (setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <Appbar.Header style={styles.appBar}>
      <Appbar.Content
        title={
          <View style={styles.container}>
            <Searchbar
              placeholder="Search for content..."
              onChangeText={props.onChangeText}
              onClearIconPress={() => props.onChangeText("")}
              onIconPress={() => {
                props.onSearch(setLoading);
              }}
              value={props.value}
              style={styles.searchBar}
              loading={loading}
            />
          </View>
        }
      />
    </Appbar.Header>
  );
};

export default SearchHeader;
