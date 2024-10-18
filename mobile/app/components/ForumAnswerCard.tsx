import { View, Text, Image } from 'react-native'
import React from 'react'
import { Card, Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Answer } from '../types/forum'
import VoteButtonsView from './VoteButtonsView'
import AuthorView from './AuthorView'

interface ForumAnswerCardProps {
    item: Answer;
};

const ForumAnswerCard: React.FC<ForumAnswerCardProps> = ({ item }) => {
    return (
        <View>
            <Card style={{ borderRadius: 10, marginBottom: 10, padding: 10 }}>
                <View>
                    <AuthorView author={item.author} />
                </View>
                <Text>{item.body}</Text>
                <VoteButtonsView is_upvoted={item.is_upvoted} upvotes_count={item.upvotes_count} is_downvoted={item.is_downvoted} downvotes_count={item.downvotes_count} />
            </Card>
        </View>
    )
}

export default ForumAnswerCard