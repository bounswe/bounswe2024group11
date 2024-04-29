import React, { useState } from "react";

import { View, Text, ScrollView } from "react-native";

import Dropdown from "react-native-paper-dropdown";

import SearchHeader from "../components/SearchHeader";
import InfoBox from "../components/InfoBox";
import { styles } from "../components/Styles";
import { NotFoundError, getSearch } from "../components/StorageHandler";
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
  const [panic, setPanic] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const onChangeText = (query: string) => {
    setSearchQuery(query);
  };

  const onSearch = (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);
    setPanic(false);
    setNoResults(false);
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
        {/* <InfoBox
          info={{
            type: "character",
            label: "Spider-Man",
            description: "fictional character in the Marvel Comics universe.",
            place: "Queens",
            siteLinks: "120",
          }}
        />
        <InfoBox
          info={{
            type: "character",
            label: "Batman",
            description:
              "fictional superhero appearing in American comic books published by DC Comics.",
            place: "Gotham City",
            siteLinks: "72",
          }}
        />
        <InfoBox
          info={{
            type: "character",
            label: "Superman",
            description:
              "fictional superhero appearing in American comic books published by DC Comics.",
            place: "Metropolis",
            siteLinks: "73",
          }}
        />
        <InfoBox
          info={{
            type: "character",
            label: "Wonder Woman",
            description:
              "fictional superhero appearing in American comic books published by DC Comics.",
            place: "Themyscira",
            siteLinks: "50",
          }}
        /> */}
        {searchResults.length != 0 &&
          searchResults.map((result, index) => (
            <InfoBox key={index} info={result} />
          ))}
      </ScrollView>
    </View>
  );
}

export default Search;
