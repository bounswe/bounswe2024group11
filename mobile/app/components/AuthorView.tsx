import { View, Text, Image } from 'react-native'
import React from 'react'
import { Author } from '../types/forum'

interface AuthorViewProps {
    author: Author;
};

const AuthorView: React.FC<AuthorViewProps> = ({ author }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Image source={{ uri: author.avatar }} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} />
            <View>
                <Text style={{ fontWeight: 'bold' }}>{author.full_name}</Text>
                <Text style={{ color: 'grey' }}>@{author.username}</Text>
            </View>
        </View>
    )
}

export default AuthorView