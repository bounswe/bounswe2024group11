import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import API_URL_GLOBAL from "../../config";

interface BookmarkButtonProps {
  initialBookmarkState: number | null;
  questionId: number;
  onBookmarkChange: (isBookmarked: number | null) => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  initialBookmarkState,
  questionId,
  onBookmarkChange,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarkState);

  const handleBookmarkToggle = async () => {
    try {
      if (isBookmarked) {
        await axios.delete(
          //`http://138.68.97.90/api/v1/forum-bookmarks/${isBookmarked}/`
          `${API_URL_GLOBAL}forum-bookmarks/${isBookmarked}/`
        );
        console.log("Bookmark removed");
        setIsBookmarked(null);
        onBookmarkChange(null);
      } else {
        const response = await axios.post(
          //`http://138.68.97.90/api/v1/forum-bookmarks/`,
          `${API_URL_GLOBAL}forum-bookmarks/`,
          {
            forum_question: questionId,
          }
        );
        console.log("Bookmark added:", response.data);
        setIsBookmarked(response.data.id);
        onBookmarkChange(response.data.id);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  return (
    <TouchableOpacity
      style={styles.bookmarkIcon}
      onPress={handleBookmarkToggle}
    >
      <Icon
        name={isBookmarked ? "bookmark" : "bookmark-outline"}
        color={isBookmarked ? "gold" : "grey"}
        size={24}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookmarkIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
});

export default BookmarkButton;
