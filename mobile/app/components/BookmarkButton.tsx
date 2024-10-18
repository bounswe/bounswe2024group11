import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface BookmarkButtonProps {
    is_bookmarked: boolean;
};

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ is_bookmarked }) => {
    return (
        <TouchableOpacity style={styles.bookmark_icon}>
            <Icon
                name={is_bookmarked ? "bookmark" : "bookmark-outline"}
                color={is_bookmarked ? "gold" : "grey"} size={24} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bookmark_icon: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
});

export default BookmarkButton