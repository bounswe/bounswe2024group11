import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from 'react'
import { Card, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Question } from "../types/forum";
import VoteButtonsView from "./VoteButtonsView";
import AuthorView from "./AuthorView";
import BookmarkButton from "./BookmarkButton";

interface ForumQuestionCardProps {
    item: Question;
};

const ForumQuestionCard: React.FC<ForumQuestionCardProps> = ({ item }) => {
    return (
        <View>
            <Card style={{ borderRadius: 10, marginBottom: 10, padding: 10 }}>
                <View style={styles.container}>
                    <AuthorView author={item.author} />
                    <BookmarkButton is_bookmarked={item.is_bookmarked} />
                </View>
                <Text
                    style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
                >
                    {item.title}
                </Text>
                <Text style={{ color: "grey", marginBottom: 10 }}>{item.body}</Text>
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginBottom: 10,
                    }}
                >
                    {item.tags.map((tag) => (
                        <Text
                            key={tag.id}
                            style={{
                                backgroundColor: "#f0f0f0",
                                padding: 5,
                                borderRadius: 5,
                                marginRight: 5,
                                marginBottom: 5,
                            }}
                        >
                            #{tag.name}
                        </Text>
                    ))}
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 10,
                    }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Icon name="comment-text-outline" size={24} color="grey" />
                        <Text style={{ marginLeft: 10 }}>
                            {item.answers_count} Answers
                        </Text>
                    </View>
                    <VoteButtonsView is_upvoted={item.is_upvoted} upvotes_count={item.upvotes_count} is_downvoted={item.is_downvoted} downvotes_count={item.downvotes_count} />
                </View>
                <Button
                    mode="outlined"
                    onPress={() => {
                        /* Handle answer navigation */
                    }}
                >
                    Answer
                </Button>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});

export default ForumQuestionCard