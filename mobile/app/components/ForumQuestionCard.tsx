import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import React from 'react'
import { Card, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Question } from "../types/forum";

interface ForumQuestionCardProps {
    item: Question;
}

const ForumQuestionCard: React.FC<ForumQuestionCardProps> = ({ item }) => {
    return (
        <View>
            <Card style={{ borderRadius: 10, marginBottom: 10, padding: 10 }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                    }}
                >
                    <Image
                        source={{ uri: item.author.avatar }}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            marginRight: 10,
                        }}
                    />
                    <View>
                        <Text style={{ fontWeight: "bold" }}>
                            {item.author.full_name}
                        </Text>
                        <Text style={{ color: "grey" }}>@{item.author.username}</Text>
                    </View>
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
                        <Icon
                            name={item.is_upvoted ? "thumb-up" : "thumb-up-outline"}
                            color={item.is_upvoted ? "blue" : "grey"}
                            size={24}
                            onPress={() => {
                                /* Handle upvote logic */
                            }}
                        />
                        <Text style={{ marginLeft: 5 }}>{item.upvotes_count}</Text>
                        <Icon
                            name={item.is_downvoted ? "thumb-down" : "thumb-down-outline"}
                            color={item.is_downvoted ? "red" : "grey"}
                            size={24}
                            style={{ marginLeft: 20 }}
                            onPress={() => {
                                /* Handle downvote logic */
                            }}
                        />
                        <Text style={{ marginLeft: 5 }}>{item.downvotes_count}</Text>
                    </View>
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