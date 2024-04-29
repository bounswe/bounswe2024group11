import React, { useState } from "react";

import { View, Text } from "react-native";

import Dropdown from "react-native-paper-dropdown";

import SearchHeader from "../components/SearchHeader";
import { styles } from "../components/Styles";
import { getSearch } from "../components/StorageHandler";
import { useTheme } from "../context/ThemeContext";

const searchList = [
  { label: "Birth Place", value: "born in" },
  { label: "Universe", value: "universe" },
  { label: "Country", value: "country" },
  { label: "Language", value: "language" },
  { label: "City", value: "city" },
  { label: "Continent", value: "continent" },
  { label: "Century", value: "century" },
  { label: "Decade", value: "decade" },
  { label: "Character Creator", value: "creator" },
  { label: "Publication Date", value: "publication date" },
  { label: "Art Style", value: "art style" },
  { label: "Genre", value: "genre" },
  { label: "Awards", value: "awards" },
  { label: "Comic Series", value: "comic series" },
  { label: "Publisher", value: "publisher" },
  { label: "Comic Events", value: "comic events" },
  { label: "Influences", value: "influences" },
  { label: "Film Adaptations", value: "film adaptations" },
  {
    label: "Video Game Adaptations",
    value: "video game adaptations",
  },
  { label: "Merchandising", value: "merchandising" },
  { label: "Crossover Events", value: "crossover events" },
  { label: "Character Alignment", value: "alignment" },
  { label: "Character Abilities", value: "abilities" },
  { label: "Team Affiliations", value: "affiliations" },
  { label: "Narrative Technique", value: "narrative technique" },
  { label: "Artistic Influences", value: "artistic influences" },
  { label: "Character", value: "character" },
  { label: "Comic Book Series", value: "comic book series" },
  { label: "Comic Book Character", value: "comic book character" },
  { label: "Comic Book Issue", value: "comic book issue" },
  { label: "Comic Book Publisher", value: "comic book publisher" },
];

function Search() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(searchList[0].value);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const onChangeText = (query: string) => {
    setSearchQuery(query);
  };

  const onSearch = (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);
    const query = dropdownValue
      ? `${dropdownValue} ${searchQuery}`
      : searchQuery;
    getSearch({
      body: {
        keyword: query,
      },
      endpoint: "user/search",
    })
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
          list={searchList}
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
