import React from "react";

import { View, Text } from "react-native";

import SearchHeader from "../components/SearchHeader";
import { styles } from "../components/Styles";

function Search() {
  return (
    <View style={{ flex: 1 }}>
      <SearchHeader />
      <View style={styles.center}>
        <Text>Search</Text>
      </View>
    </View>
  );
}

export default Search;
