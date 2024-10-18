import { View, Text } from 'react-native'
import React from 'react'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../App'

type ForumQuestionDetailScreenRouteProp = RouteProp<RootStackParamList, 'ForumQuestionDetail'>;

type Props = {
  route: ForumQuestionDetailScreenRouteProp;
};

const ForumQuestionDetail: React.FC<Props> = ({ route }) => {
  return (
    <View>
      <Text>ForumQuestionDetail</Text>
    </View>
  )
}

export default ForumQuestionDetail