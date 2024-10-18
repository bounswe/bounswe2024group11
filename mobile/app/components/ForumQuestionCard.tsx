import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import React from 'react'
import { Card, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Question } from "../types/forum";
import VoteButtonsView from "./VoteButtonsView";
import AuthorView from "./AuthorView";

interface ForumQuestionCardProps {
    item: Question;
}

const ForumQuestionCard: React.FC<ForumQuestionCardProps> = ({ item }) => {
    return (
        <View>
            <Card style={{ borderRadius: 10, marginBottom: 10, padding: 10 }}>
                <AuthorView author={item.author} />
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
                        <Icon
                            name={item.is_bookmarked ? "bookmark" : "bookmark-outline"}
                            color={item.is_bookmarked ? "gold" : "grey"}
                            size={24}
                            onPress={() => {
                                /* Handle bookmark logic */
                            }}
                        />
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

export default ForumQuestionCard