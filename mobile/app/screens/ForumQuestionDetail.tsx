import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../App'
import { Question, Answer } from '../types/forum'
import axios from 'axios'
import ForumQuestionCard from '../components/ForumQuestionCard'
import ForumAnswerCard from '../components/ForumAnswerCard'
import { FlatList } from 'react-native-gesture-handler'

const API_URL = "http://10.0.2.2:3000/forum-questions/";

type ForumQuestionDetailScreenRouteProp = RouteProp<RootStackParamList, 'ForumQuestionDetail'>;

type Props = {
  route: ForumQuestionDetailScreenRouteProp;
};

const ForumQuestionDetail: React.FC<Props> = ({ route }) => {
  const [answers, setAnswers] = React.useState<Answer[]>([]);

  const { question } = route.params;

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const result = await axios.get(`${API_URL}${question.id}`);
        setAnswers(result.data.answers);
      } catch (error) {
        console.error("Error fetching answers", error);
      }
    }

    fetchAnswers();
  }, [])

  return (
    <View>
      <ForumQuestionCard item={question} />
      <FlatList
        data={answers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ForumAnswerCard item={item} />
        )}
      />
    </View>
  )
}

export default ForumQuestionDetail