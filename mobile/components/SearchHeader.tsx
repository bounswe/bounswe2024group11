import React, { useState } from "react";

import { View } from "react-native";
import { Appbar, IconButton, Searchbar } from "react-native-paper";

import { styles } from "./Styles";

const SearchHeader = (props: {
  onChangeText: (query: string) => void;
  value: string;
  loading: boolean;
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
              value={props.value}
              style={styles.searchBar}
              loading={props.loading}
            />
          </View>
        }
      />
    </Appbar.Header>
  );
};

export default SearchHeader;
