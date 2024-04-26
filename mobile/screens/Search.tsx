import React from "react";

import { View, Text } from "react-native";

import { Appbar, Searchbar } from "react-native-paper";
import { styles } from "../components/Styles";

function Search() {
    return (
        <View>
            <SearchHeader />
            <Text>Search</Text>
        </View>
    )
};

const SearchHeader = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

     const onChangeSearch = (query: string) => {
        setSearchQuery(query);
        // search for content
        console.log("Searching for content...");
        console.log(query);
    };

    return (
    <Appbar.Header style={ styles.appBar }>
        <Appbar.Content title={
            <Searchbar 
                placeholder="Search for content..."
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{
                    width: "90%",
                    height: 40,
                    margin: 10,
                    backgroundColor: "white"
                }} />
        } />
    </Appbar.Header>
)};

export default Search;